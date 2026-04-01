<?php

use App\Models\Order;
use App\Services\StripeCheckoutService;

afterEach(function (): void {
    \Mockery::close();
});

function makeOrder(array $attributes = []): Order
{
    $order = Order::create(array_merge([
        'public_id' => 'ord_test_001',
        'status' => Order::STATUS_CHECKOUT_CREATED,
        'product_slug' => 'custom-box',
        'product_name' => "Coder's Hot Sauce Box",
        'stripe_price_id' => 'box-builder',
        'quantity' => 3,
        'unit_amount' => 1500,
        'subtotal_amount' => 4400,
        'total_amount' => 4400,
        'currency' => 'gbp',
    ], $attributes));

    $order->items()->createMany([
        [
            'product_slug' => 'coders-hot-classic',
            'product_name' => "Coder's Hot Classic",
            'stripe_price_id' => 'prod_classic',
            'quantity' => 2,
            'unit_amount' => 1400,
            'line_total_amount' => 2800,
        ],
        [
            'product_slug' => 'coders-hot-honey',
            'product_name' => "Coder's Hot Honey",
            'stripe_price_id' => 'prod_honey',
            'quantity' => 1,
            'unit_amount' => 1600,
            'line_total_amount' => 1600,
        ],
    ]);

    return $order->load('items');
}

function checkoutEvent(string $type, string $publicId, string $sessionId = 'cs_live_001'): object
{
    return (object) [
        'type' => $type,
        'data' => (object) [
            'object' => (object) [
                'id' => $sessionId,
                'mode' => 'payment',
                'client_reference_id' => $publicId,
                'payment_status' => 'paid',
                'payment_intent' => 'pi_live_001',
                'customer' => 'cus_live_001',
                'currency' => 'gbp',
                'amount_subtotal' => 4400,
                'amount_total' => 4800,
                'total_details' => (object) [
                    'amount_shipping' => 400,
                ],
                'customer_details' => (object) [
                    'email' => 'buyer@example.com',
                    'name' => 'Ada Lovelace',
                ],
                'shipping_details' => (object) [
                    'address' => (object) [
                        'city' => 'London',
                        'state' => 'London',
                        'country' => 'GB',
                    ],
                ],
                'metadata' => (object) [
                    'order_public_id' => $publicId,
                ],
            ],
        ],
    ];
}

it('marks box orders paid from completed checkout webhooks', function () {
    $order = makeOrder([
        'public_id' => 'ord_test_paid',
        'stripe_checkout_session_id' => 'cs_live_paid',
    ]);

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldReceive('constructWebhookEvent')
        ->once()
        ->andReturn(checkoutEvent('checkout.session.completed', $order->public_id, 'cs_live_paid'));

    $this->app->instance(StripeCheckoutService::class, $stripe);

    $this->post(route('stripe.webhook'), [], [
        'Stripe-Signature' => 'sig_test',
    ])->assertOk();

    $order->refresh();

    expect($order->status)->toBe(Order::STATUS_PAID)
        ->and($order->customer_email)->toBe('buyer@example.com')
        ->and($order->shipping_amount)->toBe(400)
        ->and($order->total_amount)->toBe(4800)
        ->and($order->currency)->toBe('gbp')
        ->and($order->shipping_address['city'])->toBe('London')
        ->and($order->paid_at)->not->toBeNull();
});

it('maps non-completed checkout webhook statuses onto local box orders', function (string $eventType, string $expectedStatus, string $timestampColumn) {
    $order = makeOrder([
        'public_id' => 'ord_test_status',
        'stripe_checkout_session_id' => 'cs_live_status',
    ]);

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldReceive('constructWebhookEvent')
        ->once()
        ->andReturn(checkoutEvent($eventType, $order->public_id, 'cs_live_status'));

    $this->app->instance(StripeCheckoutService::class, $stripe);

    $this->post(route('stripe.webhook'), [], [
        'Stripe-Signature' => 'sig_test',
    ])->assertOk();

    $order->refresh();

    expect($order->status)->toBe($expectedStatus)
        ->and($order->{$timestampColumn})->not->toBeNull();
})->with([
    ['checkout.session.expired', Order::STATUS_EXPIRED, 'expired_at'],
    ['checkout.session.async_payment_failed', Order::STATUS_PAYMENT_FAILED, 'failed_at'],
]);
