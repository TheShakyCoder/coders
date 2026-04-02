<?php

use App\Models\Order;
use App\Models\User;
use App\Services\StripeCheckoutService;

afterEach(function (): void {
    \Mockery::close();
});

function hotSauceProducts(): array
{
    return [
        [
            'slug' => 'coders-hot-classic',
            'name' => "Coder's Hot Classic",
            'tagline' => 'Classic red pepper heat.',
            'description' => 'Built for pizza.',
            'heat_label' => 'Classic Heat',
            'heat_level' => 3,
            'price' => '£14',
            'currency' => 'gbp',
            'unit_amount' => 1400,
            'size_label' => '125ml bottle',
            'stripe_product_id' => 'prod_classic',
            'accent' => '#f97316',
            'glow' => 'rgba(249, 115, 22, 0.45)',
        ],
        [
            'slug' => 'coders-hot-mango',
            'name' => "Coder's Hot Mango",
            'tagline' => 'Mango and habanero.',
            'description' => 'Sweet heat for rich crust.',
            'heat_label' => 'Mango Lift',
            'heat_level' => 2,
            'price' => '£15',
            'currency' => 'gbp',
            'unit_amount' => 1500,
            'size_label' => '125ml bottle',
            'stripe_product_id' => 'prod_mango',
            'accent' => '#fb923c',
            'glow' => 'rgba(251, 146, 60, 0.42)',
        ],
        [
            'slug' => 'coders-hot-honey',
            'name' => "Coder's Hot Honey",
            'tagline' => 'Honey with a sting.',
            'description' => 'Built for drizzled slices.',
            'heat_label' => 'Honey Burn',
            'heat_level' => 4,
            'price' => '£16',
            'currency' => 'gbp',
            'unit_amount' => 1600,
            'size_label' => '125ml bottle',
            'stripe_product_id' => 'prod_honey',
            'accent' => '#facc15',
            'glow' => 'rgba(250, 204, 21, 0.35)',
        ],
        [
            'slug' => 'coders-hot-chocolate',
            'name' => "Coder's Hot Chocolate",
            'tagline' => 'Chocolate and smoked chili.',
            'description' => 'Built for late slices.',
            'heat_label' => 'Midnight Burn',
            'heat_level' => 5,
            'price' => '£17',
            'currency' => 'gbp',
            'unit_amount' => 1700,
            'size_label' => '125ml bottle',
            'stripe_product_id' => 'prod_chocolate',
            'accent' => '#f87171',
            'glow' => 'rgba(248, 113, 113, 0.34)',
        ],
    ];
}

it('creates a checkout session and guest order for a custom box', function () {
    config()->set('hot_sauce.products', hotSauceProducts());

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldReceive('createCheckoutSession')
        ->once()
        ->with(\Mockery::type(Order::class), \Mockery::on(function (array $items): bool {
            return count($items) === 1
                && $items[0]['stripe_product_id'] === (config('hot_sauce.stripe_box_price_id') ?: 'price_default_box')
                && $items[0]['unit_amount'] === 1999
                && $items[0]['quantity'] === 1;
        }))
        ->andReturn((object) [
            'id' => 'cs_test_123',
            'url' => 'https://checkout.stripe.test/cs_test_123',
            'payment_intent' => 'pi_test_123',
            'customer' => 'cus_test_123',
        ]);

    $this->app->instance(StripeCheckoutService::class, $stripe);

    $response = $this->postJson(route('checkout.store'), [
        'items' => [
            ['product' => 'coders-hot-classic', 'quantity' => 2],
            ['product' => 'coders-hot-honey', 'quantity' => 1],
        ],
    ]);

    $response->assertOk()->assertJson([
        'checkout_url' => 'https://checkout.stripe.test/cs_test_123',
    ]);

    $order = Order::query()->with('items')->sole();

    expect($order->status)->toBe(Order::STATUS_CHECKOUT_CREATED)
        ->and($order->user_id)->toBeNull()
        ->and($order->product_slug)->toBe('coders-hot-sauce-box')
        ->and($order->product_name)->toBe("Coder's Hot Sauce Box")
        ->and($order->quantity)->toBe(1)
        ->and($order->subtotal_amount)->toBe(1999)
        ->and($order->currency)->toBe('gbp')
        ->and($order->stripe_checkout_session_id)->toBe('cs_test_123')
        ->and($order->items)->toHaveCount(2)
        ->and($order->items->sum('quantity'))->toBe(3);
});

it('associates authenticated users to created box orders', function () {
    config()->set('hot_sauce.products', hotSauceProducts());

    $user = User::factory()->create();

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldReceive('createCheckoutSession')
        ->once()
        ->andReturn((object) [
            'id' => 'cs_test_456',
            'url' => 'https://checkout.stripe.test/cs_test_456',
            'payment_intent' => 'pi_test_456',
            'customer' => 'cus_test_456',
        ]);

    $this->app->instance(StripeCheckoutService::class, $stripe);

    $this->actingAs($user)
        ->postJson(route('checkout.store'), [
            'items' => [
                ['product' => 'coders-hot-mango', 'quantity' => 1],
            ],
        ])
        ->assertOk();

    $order = Order::query()->sole();

    expect($order->user_id)->toBe($user->id)
        ->and($order->customer_email)->toBe($user->email)
        ->and($order->product_slug)->toBe('partial-box')
        ->and($order->quantity)->toBe(1)
        ->and($order->currency)->toBe('gbp');
});

it('rejects unknown products before contacting stripe', function () {
    config()->set('hot_sauce.products', hotSauceProducts());

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldNotReceive('createCheckoutSession');
    $this->app->instance(StripeCheckoutService::class, $stripe);

    $this->postJson(route('checkout.store'), [
        'items' => [
            ['product' => 'unknown-sauce', 'quantity' => 1],
        ],
    ])->assertStatus(422)
        ->assertJsonValidationErrors(['items']);

    expect(Order::count())->toBe(0);
});

it('rejects boxes with more than three bottles', function () {
    config()->set('hot_sauce.products', hotSauceProducts());

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldNotReceive('createCheckoutSession');
    $this->app->instance(StripeCheckoutService::class, $stripe);

    $this->postJson(route('checkout.store'), [
        'items' => [
            ['product' => 'coders-hot-classic', 'quantity' => 2],
            ['product' => 'coders-hot-mango', 'quantity' => 2],
        ],
    ])->assertStatus(422)
        ->assertJsonValidationErrors(['items']);
});
