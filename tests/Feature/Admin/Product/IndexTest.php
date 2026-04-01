<?php

use App\Models\Product;
use App\Models\User;
use Inertia\Testing\AssertableInertia;

test('admin can view products index', function () {
    $user = User::factory()->create();
    $products = Product::factory()->count(3)->create();

    $this->actingAs($user)
        ->get(route('admin.products.index'))
        ->assertStatus(200)
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('Admin/Products/Index')
            ->has('products', 3)
        );
});

test('unauthenticated users cannot view products index', function () {
    $this->get(route('admin.products.index'))
        ->assertRedirect(route('login'));
});
