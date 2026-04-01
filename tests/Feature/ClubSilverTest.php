<?php

use App\Models\User;
use App\Services\StripeCheckoutService;
use Illuminate\Support\Carbon;

afterEach(function (): void {
    \Mockery::close();
});

function clubSilverCheckoutEvent(int $userId, string $customerId = 'cus_club_001', string $subscriptionId = 'sub_club_001'): object
{
    return (object) [
        'type' => 'checkout.session.completed',
        'data' => (object) [
            'object' => (object) [
                'id' => 'cs_club_001',
                'mode' => 'subscription',
                'client_reference_id' => (string) $userId,
                'customer' => $customerId,
                'subscription' => $subscriptionId,
                'metadata' => (object) [
                    'membership' => 'club_silver',
                    'user_id' => (string) $userId,
                ],
            ],
        ],
    ];
}

function clubSilverSubscriptionEvent(string $type, int $userId, string $customerId = 'cus_club_001', string $subscriptionId = 'sub_club_001'): object
{
    return (object) [
        'type' => $type,
        'data' => (object) [
            'object' => (object) [
                'id' => $subscriptionId,
                'customer' => $customerId,
                'status' => $type === 'customer.subscription.deleted' ? 'canceled' : 'active',
                'current_period_end' => Carbon::now()->addMonth()->timestamp,
                'metadata' => (object) [
                    'membership' => 'club_silver',
                    'user_id' => (string) $userId,
                ],
            ],
        ],
    ];
}

it('requires authentication for club silver checkout sessions', function () {
    $this->postJson(route('club-silver.store'))
        ->assertUnauthorized();
});

it('creates a club silver checkout session for authenticated users', function () {
    $user = User::factory()->create();

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldReceive('createClubSilverCheckoutSession')
        ->once()
        ->with($user)
        ->andReturn((object) [
            'url' => 'https://checkout.stripe.test/club-silver',
        ]);

    $this->app->instance(StripeCheckoutService::class, $stripe);

    $this->actingAs($user)
        ->postJson(route('club-silver.store'))
        ->assertOk()
        ->assertJson([
            'checkout_url' => 'https://checkout.stripe.test/club-silver',
        ]);
});

it('activates club silver from the checkout completed webhook', function () {
    $user = User::factory()->create();

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldReceive('constructWebhookEvent')
        ->once()
        ->andReturn(clubSilverCheckoutEvent($user->id));

    $this->app->instance(StripeCheckoutService::class, $stripe);

    $this->post(route('stripe.webhook'), [], [
        'Stripe-Signature' => 'sig_test',
    ])->assertOk();

    $user->refresh();

    expect($user->stripe_customer_id)->toBe('cus_club_001')
        ->and($user->club_silver_subscription_id)->toBe('sub_club_001')
        ->and($user->club_silver_status)->toBe('active')
        ->and($user->hasActiveClubSilver())->toBeTrue();
});

it('syncs and cancels club silver from subscription webhooks', function (string $eventType, string $expectedStatus, bool $expectedActive) {
    $user = User::factory()->create([
        'stripe_customer_id' => 'cus_club_001',
        'club_silver_subscription_id' => 'sub_club_001',
    ]);

    $stripe = \Mockery::mock(StripeCheckoutService::class);
    $stripe->shouldReceive('constructWebhookEvent')
        ->once()
        ->andReturn(clubSilverSubscriptionEvent($eventType, $user->id));

    $this->app->instance(StripeCheckoutService::class, $stripe);

    $this->post(route('stripe.webhook'), [], [
        'Stripe-Signature' => 'sig_test',
    ])->assertOk();

    $user->refresh();

    expect($user->club_silver_status)->toBe($expectedStatus)
        ->and($user->hasActiveClubSilver())->toBe($expectedActive);
})->with([
    ['customer.subscription.updated', 'active', true],
    ['customer.subscription.deleted', 'canceled', false],
]);
