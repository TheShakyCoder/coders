<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('public_id')->unique();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status')->index();
            $table->string('product_slug');
            $table->string('product_name');
            $table->string('stripe_price_id');
            $table->unsignedInteger('quantity')->default(1);
            $table->unsignedInteger('unit_amount');
            $table->unsignedInteger('subtotal_amount')->nullable();
            $table->unsignedInteger('shipping_amount')->nullable();
            $table->unsignedInteger('total_amount')->nullable();
            $table->string('currency', 3)->default('usd');
            $table->string('stripe_checkout_session_id')->nullable()->unique();
            $table->string('stripe_payment_intent_id')->nullable()->index();
            $table->string('stripe_customer_id')->nullable()->index();
            $table->string('customer_email')->nullable()->index();
            $table->string('customer_name')->nullable();
            $table->json('shipping_address')->nullable();
            $table->json('customer_details')->nullable();
            $table->json('stripe_session_payload')->nullable();
            $table->timestamp('checkout_created_at')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expired_at')->nullable();
            $table->timestamp('canceled_at')->nullable();
            $table->timestamp('failed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
