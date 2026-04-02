<?php

use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

it('admin can view create product page', function () {
    $admin = User::factory()->create();

    actingAs($admin)
        ->get(route('admin.products.create'))
        ->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Products/Create')
        );
});

it('unauthenticated users cannot view create product page', function () {
    get(route('admin.products.create'))
        ->assertRedirect(route('login'));
});
