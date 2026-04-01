<?php

use Inertia\Testing\AssertableInertia;

test('a Product can be stored in admin', function () 
{
    //  GIVEN
    $this->actingAs(\App\Models\User::factory()->create());
    $this->assertAuthenticated();

    //  WHEN
    $data = [
        'name' => 'Test Product',
        'description' => 'Test Product Description',
        'unit' => 'bottle',
        'price_amount' => 10,
        'can_sell' => true,
        'can_build_with' => false,
        'can_be_built' => true,
    ];

    $this
        ->followingRedirects()
        ->post('/admin/products', $data)

        //  THEN
        ->assertStatus(200)
        ->assertInertia(fn(AssertableInertia $in) => $in
            ->component('Admin/Products/Index')
            ->has('products', 1, fn(AssertableInertia $in) => $in
                ->where('name', $data['name'])
                ->where('description', $data['description'])
                ->where('unit', $data['unit'])
                ->where('price_amount', $data['price_amount'])
                ->where('can_sell', $data['can_sell'])
                ->where('can_build_with', $data['can_build_with'])
                ->where('can_be_built', $data['can_be_built'])
                ->whereNull('stripe_product_id')
                ->whereNull('class')
                ->etc()
            )
        );
});
