<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderStatusService;
use App\Services\StripeCheckoutService;
use App\Support\ProductCatalog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class CheckoutController extends Controller
{
    public function store(Request $request, StripeCheckoutService $stripe): JsonResponse
    {
        $validated = $request->validate([
            'items' => ['required', 'array', 'min:1', 'max:3'],
            'items.*.product' => ['required', 'string'],
            'items.*.quantity' => ['required', 'integer', 'min:1', 'max:3'],
        ]);

        $boxItems = ProductCatalog::resolveBoxItemsOrFail($validated['items']);
        $totalQuantity = collect($boxItems)->sum('quantity');
        $subtotalAmount = collect($boxItems)->sum('line_total_amount');

        $order = DB::transaction(function () use ($request, $boxItems, $totalQuantity): Order {
            $isFullBox = $totalQuantity === ProductCatalog::boxLimit();

            $order = Order::create([
                'user_id' => $request->user()?->id,
                'status' => Order::STATUS_INITIATED,
                'product_slug' => $isFullBox ? 'coders-hot-sauce-box' : 'partial-box',
                'product_name' => ProductCatalog::boxName(),
                'stripe_price_id' => $isFullBox ? ProductCatalog::stripeBoxPriceId() : 'box-builder',
                'quantity' => 1,
                'unit_amount' => $isFullBox ? ProductCatalog::boxUnitAmount() : collect($boxItems)->sum('line_total_amount'),
                'subtotal_amount' => $isFullBox ? ProductCatalog::boxUnitAmount() : collect($boxItems)->sum('line_total_amount'),
                'total_amount' => $isFullBox ? ProductCatalog::boxUnitAmount() : collect($boxItems)->sum('line_total_amount'),
                'currency' => config('services.stripe.currency', 'gbp'),
                'customer_email' => $request->user()?->email,
            ]);

            $order->items()->createMany(array_map(static fn (array $item): array => [
                'product_slug' => $item['slug'],
                'product_name' => $item['name'],
                'stripe_price_id' => $item['stripe_product_id'],
                'quantity' => $item['quantity'],
                'unit_amount' => $item['unit_amount'],
                'line_total_amount' => $item['line_total_amount'],
            ], $boxItems));

            return $order->load('items');
        });

        $stripeItems = [];

        if ($totalQuantity === ProductCatalog::boxLimit()) {
            $stripeItems[] = [
                'stripe_product_id' => ProductCatalog::stripeBoxPriceId(),
                'unit_amount' => ProductCatalog::boxUnitAmount(),
                'quantity' => 1,
                'currency' => $order->currency,
            ];
        } else {
            $stripeItems = $boxItems;
        }

        try {
            $session = $stripe->createCheckoutSession($order, $stripeItems);
        } catch (Throwable $exception) {
            $order->update(['status' => Order::STATUS_CHECKOUT_FAILED]);

            Log::error('Stripe checkout session creation failed.', [
                'order_id' => $order->id,
                'items' => array_map(fn (array $item): string => $item['slug'], $boxItems),
                'message' => $exception->getMessage(),
            ]);

            return response()->json([
                'message' => 'Checkout is unavailable right now. Confirm your Stripe keys and shipping rates, then try again.',
            ], 500);
        }

        $order->update([
            'status' => Order::STATUS_CHECKOUT_CREATED,
            'stripe_checkout_session_id' => $session->id,
            'stripe_payment_intent_id' => is_string($session->payment_intent) ? $session->payment_intent : null,
            'stripe_customer_id' => is_string($session->customer) ? $session->customer : null,
            'checkout_created_at' => now(),
        ]);

        return response()->json([
            'checkout_url' => $session->url,
        ]);
    }

    public function success(Request $request, StripeCheckoutService $stripe, OrderStatusService $orderStatus): Response
    {
        $order = $this->resolveOrder($request);

        if ($sessionId = $request->string('session_id')->toString()) {
            try {
                $session = $stripe->retrieveCheckoutSession($sessionId);
                $order = $orderStatus->syncFromCheckoutSession($order, $session);
            } catch (Throwable $exception) {
                Log::warning('Unable to refresh checkout session on success page.', [
                    'order_id' => $order->id,
                    'session_id' => $sessionId,
                    'message' => $exception->getMessage(),
                ]);
            }
        }

        return Inertia::render('CheckoutSuccess', [
            'order' => $order,
        ]);
    }

    public function cancel(Request $request, OrderStatusService $orderStatus): Response
    {
        $order = $orderStatus->markCanceled($this->resolveOrder($request));

        return Inertia::render('CheckoutCancel', [
            'order' => $order,
        ]);
    }

    protected function resolveOrder(Request $request): Order
    {
        $orderId = $request->string('order')->toString();
        $sessionId = $request->string('session_id')->toString();

        $order = null;

        if ($orderId !== '') {
            $order = Order::query()->where('public_id', $orderId)->first();
        }

        if ($order === null && $sessionId !== '') {
            $order = Order::query()->where('stripe_checkout_session_id', $sessionId)->first();
        }

        abort_if($order === null, 404);

        return $order->load('items');
    }
}
