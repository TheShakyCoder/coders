<?php

use App\Models\Product;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\delete;

it('admin can delete a product', function () {
    $admin = User::factory()->create();
    $product = Product::factory()->create();

    actingAs($admin)
        ->delete(route('admin.products.destroy', $product))
        ->assertRedirect(route('admin.products.index'))
        ->assertSessionHas('success', 'Product deleted successfully.');

    expect(Product::find($product->id))->toBeNull();
    expect(Product::withTrashed()->find($product->id))->not->toBeNull();
});

it('unauthenticated users cannot delete product', function () {
    $product = Product::factory()->create();

    delete(route('admin.products.destroy', $product))
        ->assertRedirect(route('login'));
});
