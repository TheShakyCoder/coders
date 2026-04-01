<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\ClubSilverService;
use App\Services\OrderStatusService;
use App\Services\StripeCheckoutService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

class StripeWebhookController extends Controller
{
    public function __invoke(
        Request $request,
        StripeCheckoutService $stripe,
        OrderStatusService $orderStatus,
        ClubSilverService $clubSilver
    ): Response
    {
        try {
            $event = $stripe->constructWebhookEvent(
                $request->getContent(),
                $request->header('Stripe-Signature'),
            );
        } catch (Throwable $exception) {
            Log::warning('Rejected Stripe webhook.', [
                'message' => $exception->getMessage(),
            ]);

            return response('Invalid webhook.', 400);
        }

        $session = $event->data->object ?? null;

        if (! is_object($session)) {
            return response('Webhook ignored.', 200);
        }

        return match ($event->type) {
            'checkout.session.completed' => $this->handleCompletedCheckout($session, $orderStatus, $clubSilver),
            'checkout.session.expired' => $this->handleOrderCheckout($session, $orderStatus, Order::STATUS_EXPIRED, $event->type),
            'checkout.session.async_payment_failed' => $this->handleOrderCheckout($session, $orderStatus, Order::STATUS_PAYMENT_FAILED, $event->type),
            'customer.subscription.created', 'customer.subscription.updated' => $this->handleClubSilverSubscription($session, $clubSilver, $event->type),
            'customer.subscription.deleted' => $this->handleClubSilverCancellation($session, $clubSilver, $event->type),
            default => response('Webhook ignored.', 200),
        };
    }

    protected function handleCompletedCheckout(object $session, OrderStatusService $orderStatus, ClubSilverService $clubSilver): Response
    {
        if ($this->isClubSilverCheckout($session)) {
            $member = $clubSilver->syncFromCheckoutSession($session);

            if ($member === null) {
                Log::warning('Club Silver member not found for checkout session.', [
                    'session_id' => $session->id ?? null,
                ]);

                return response('Membership not found.', 404);
            }

            return response('Membership updated.', 200);
        }

        return $this->handleOrderCheckout($session, $orderStatus, Order::STATUS_PAID, 'checkout.session.completed');
    }

    protected function handleOrderCheckout(object $session, OrderStatusService $orderStatus, string $status, string $eventType): Response
    {
        $order = $this->resolveOrder($session);

        if ($order === null) {
            Log::warning('Stripe webhook order not found.', [
                'event_type' => $eventType,
                'session_id' => $session->id ?? null,
            ]);

            return response('Order not found.', 404);
        }

        $orderStatus->syncFromCheckoutSession($order, $session, $status);

        return response('Webhook handled.', 200);
    }

    protected function handleClubSilverSubscription(object $subscription, ClubSilverService $clubSilver, string $eventType): Response
    {
        $member = $clubSilver->syncFromSubscription($subscription);

        if ($member === null) {
            Log::warning('Club Silver member not found for subscription event.', [
                'event_type' => $eventType,
                'subscription_id' => $subscription->id ?? null,
            ]);

            return response('Membership not found.', 404);
        }

        return response('Membership synced.', 200);
    }

    protected function handleClubSilverCancellation(object $subscription, ClubSilverService $clubSilver, string $eventType): Response
    {
        $member = $clubSilver->cancelFromSubscription($subscription);

        if ($member === null) {
            Log::warning('Club Silver member not found for cancellation event.', [
                'event_type' => $eventType,
                'subscription_id' => $subscription->id ?? null,
            ]);

            return response('Membership not found.', 404);
        }

        return response('Membership canceled.', 200);
    }

    protected function resolveOrder(object $session): ?Order
    {
        $sessionId = is_string($session->id ?? null) ? $session->id : null;
        $publicId = is_string($session->client_reference_id ?? null)
            ? $session->client_reference_id
            : (is_string($session->metadata->order_public_id ?? null) ? $session->metadata->order_public_id : null);

        if ($sessionId !== null) {
            $order = Order::query()->where('stripe_checkout_session_id', $sessionId)->first();

            if ($order !== null) {
                return $order;
            }
        }

        if ($publicId !== null) {
            return Order::query()->where('public_id', $publicId)->first();
        }

        return null;
    }

    protected function isClubSilverCheckout(object $session): bool
    {
        return ($session->mode ?? null) === 'subscription'
            || (($session->metadata->membership ?? null) === 'club_silver');
    }
}
