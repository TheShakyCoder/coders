<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use RuntimeException;
use Stripe\Exception\SignatureVerificationException;
use Stripe\StripeClient;
use Stripe\Webhook;
use UnexpectedValueException;

class StripeCheckoutService
{
    /**
     * @param  array<int, array<string, mixed>>  $items
     */
    public function createCheckoutSession(Order $order, array $items): object
    {
        $user = $order->relationLoaded('user') ? $order->user : $order->user()->first();

        return $this->client()->checkout->sessions->create([
            'mode' => 'payment',
            'client_reference_id' => $order->public_id,
            'billing_address_collection' => 'required',
            'phone_number_collection' => ['enabled' => true],
            'shipping_address_collection' => [
                'allowed_countries' => $this->allowedCountries(),
            ],
            'shipping_options' => $this->shippingOptionsFor($user),
            'allow_promotion_codes' => true,
            'success_url' => route('checkout.success', ['order' => $order->public_id]).'&session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.cancel', ['order' => $order->public_id]),
            ...$this->paymentCustomerPayload($user, $order->customer_email),
            'line_items' => array_map(function (array $item): array {
                return [
                    'price_data' => [
                        'currency' => strtolower((string) ($item['currency'] ?? config('services.stripe.currency', 'gbp'))),
                        'product' => $item['stripe_product_id'],
                        'unit_amount' => $item['unit_amount'],
                    ],
                    'quantity' => $item['quantity'],
                ];
            }, $items),
            'metadata' => [
                'order_id' => (string) $order->id,
                'order_public_id' => $order->public_id,
                'box_quantity' => (string) $order->quantity,
            ],
            'payment_intent_data' => [
                'metadata' => [
                    'order_id' => (string) $order->id,
                    'order_public_id' => $order->public_id,
                ],
            ],
        ]);
    }

    public function createClubSilverCheckoutSession(User $user): object
    {
        $clubSilverPrice = config('services.stripe.club_silver_price');

        if (blank($clubSilverPrice)) {
            throw new RuntimeException('Club Silver Stripe price is not configured.');
        }

        return $this->client()->checkout->sessions->create([
            'mode' => 'subscription',
            'client_reference_id' => (string) $user->id,
            'allow_promotion_codes' => true,
            'success_url' => route('club-silver.success'),
            'cancel_url' => route('club-silver.cancel'),
            ...$this->subscriptionCustomerPayload($user, $user->email),
            'line_items' => [[
                'price' => $clubSilverPrice,
                'quantity' => 1,
            ]],
            'metadata' => [
                'membership' => 'club_silver',
                'user_id' => (string) $user->id,
            ],
            'subscription_data' => [
                'metadata' => [
                    'membership' => 'club_silver',
                    'user_id' => (string) $user->id,
                ],
            ],
        ]);
    }

    public function retrieveCheckoutSession(string $sessionId): object
    {
        return $this->client()->checkout->sessions->retrieve($sessionId);
    }

    /**
     * @throws SignatureVerificationException
     * @throws UnexpectedValueException
     */
    public function constructWebhookEvent(string $payload, ?string $signature): object
    {
        $secret = config('services.stripe.webhook_secret');

        if (blank($secret)) {
            throw new RuntimeException('Stripe webhook secret is not configured.');
        }

        if (blank($signature)) {
            throw new RuntimeException('Stripe signature header is missing.');
        }

        return Webhook::constructEvent($payload, $signature, $secret);
    }

    protected function client(): StripeClient
    {
        $secret = config('services.stripe.secret');

        if (blank($secret)) {
            throw new RuntimeException('Stripe secret key is not configured.');
        }

        return new StripeClient($secret);
    }

    /**
     * @return array<int, string>
     */
    protected function allowedCountries(): array
    {
        $countries = config('services.stripe.allowed_countries', ['US']);

        if (! is_array($countries) || $countries === []) {
            throw new RuntimeException('Stripe allowed countries are not configured.');
        }

        return $countries;
    }

    /**
     * @return array<int, array<string, string>>
     */
    protected function shippingOptionsFor(?User $user): array
    {
        if ($user?->hasActiveClubSilver()) {
            return [[
                'shipping_rate_data' => [
                    'display_name' => 'Club Silver UK delivery',
                    'type' => 'fixed_amount',
                    'fixed_amount' => [
                        'amount' => 0,
                        'currency' => config('services.stripe.currency', 'gbp'),
                    ],
                    'delivery_estimate' => [
                        'minimum' => ['unit' => 'business_day', 'value' => 2],
                        'maximum' => ['unit' => 'business_day', 'value' => 4],
                    ],
                ],
            ]];
        }

        $rate = config('services.stripe.postage_rate');

        if (blank($rate)) {
            throw new RuntimeException('Stripe postage rate is not configured.');
        }

        return [[
            'shipping_rate' => $rate,
        ]];
    }

    /**
     * @return array<string, mixed>
     */
    protected function paymentCustomerPayload(?User $user, ?string $fallbackEmail): array
    {
        if ($user?->stripe_customer_id) {
            return [
                'customer' => $user->stripe_customer_id,
            ];
        }

        return [
            'customer_creation' => 'always',
            'customer_email' => $fallbackEmail,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    protected function subscriptionCustomerPayload(?User $user, ?string $fallbackEmail): array
    {
        if ($user?->stripe_customer_id) {
            return [
                'customer' => $user->stripe_customer_id,
            ];
        }

        return [
            'customer_email' => $fallbackEmail,
        ];
    }
}
