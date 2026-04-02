<?php

use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('admin can view edit product page', function () {
    $admin = User::factory()->create();
    $product = Product::factory()->create();

    actingAs($admin)
        ->get(route('admin.products.edit', $product))
        ->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Products/Edit')
            ->has('product', fn ($page) => $page
                ->where('id', $product->id)
                ->where('name', $product->name)
                ->etc()
            )
        );
});

it('unauthenticated users cannot view edit product page', function () {
    $product = Product::factory()->create();

    get(route('admin.products.edit', $product))
        ->assertRedirect(route('login'));
});
