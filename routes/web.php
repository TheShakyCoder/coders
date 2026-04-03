<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ClubSilverController;
use App\Http\Controllers\StripeWebhookController;
use App\Services\ProductsService;
use App\Support\ProductCatalog;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (ProductsService $productsService) {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => $productsService->storeFrontProducts(),
        'boxLimit' => ProductCatalog::boxLimit(),
        'boxName' => ProductCatalog::boxName(),
        'bottles' => (int) config('hot_sauce.bottles'),
    ]);
})->name('home');

Route::post('/checkout/session', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');
Route::get('/checkout/cancel', [CheckoutController::class, 'cancel'])->name('checkout.cancel');
Route::post('/stripe/webhook', StripeWebhookController::class)->name('stripe.webhook');

Route::get('/dashboard', function () {
    $orders = auth()->user()
        ->orders()
        ->latest()
        ->get()
        ->map(fn ($o) => [
            'public_id'    => $o->public_id,
            'status'       => $o->status,
            'total_amount' => $o->total_amount,
            'currency'     => $o->currency,
            'paid_at'      => $o->paid_at?->toISOString(),
            'created_at'   => $o->created_at->toISOString(),
        ]);

    return Inertia::render('Dashboard', compact('orders'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/club-silver/session', [ClubSilverController::class, 'store'])->name('club-silver.store');
    Route::get('/club-silver/success', [ClubSilverController::class, 'success'])->name('club-silver.success');
    Route::get('/club-silver/cancel', [ClubSilverController::class, 'cancel'])->name('club-silver.cancel');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('products', \App\Http\Controllers\Admin\ProductController::class);
});

require __DIR__.'/auth.php';
