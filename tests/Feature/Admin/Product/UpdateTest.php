<?php

use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;

it('admin can update a product', function () {
    $admin = User::factory()->create();
    $product = Product::factory()->create([
        'name' => 'Old Name',
        'unit' => 'Old Unit',
        'price_amount' => 1000,
    ]);

    $newData = [
        'name' => 'New Name',
        'description' => 'New Description',
        'unit' => 'New Unit',
        'price_amount' => 2000,
        'can_sell' => true,
        'can_build_with' => false,
        'can_be_built' => true,
        'stripe_product_id' => 'prod_new',
        'class' => 'heavy',
    ];

    actingAs($admin)
        ->put(route('admin.products.update', $product), $newData)
        ->assertRedirect(route('admin.products.index'))
        ->assertSessionHas('success', 'Product updated successfully.');

    $product->refresh();

    expect($product->name)->toBe('New Name');
    expect($product->description)->toBe('New Description');
    expect($product->unit)->toBe('New Unit');
    expect($product->price_amount)->toBe(2000);
    expect($product->can_sell)->toBeTrue();
    expect($product->can_build_with)->toBeFalse();
    expect($product->can_be_built)->toBeTrue();
    expect($product->stripe_product_id)->toBe('prod_new');
    expect($product->class)->toBe('heavy');
});

it('validation fails when updating with invalid data', function () {
    $admin = User::factory()->create();
    $product = Product::factory()->create();

    actingAs($admin)
        ->put(route('admin.products.update', $product), [
            'name' => '', // Required
            'unit' => '', // Required
        ])
        ->assertSessionHasErrors(['name', 'unit']);
});
