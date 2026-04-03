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
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('unit')->default('ml');
            $table->boolean('can_build_with')->default(false);
            $table->boolean('can_be_built')->default(false);
            $table->boolean('can_sell')->default(false);
            $table->string('stripe_product_id')->nullable();
            $table->integer('price_amount')->default(0);
            $table->string('tagline')->nullable();
            $table->string('heat_label')->nullable();
            $table->integer('heat_level')->default(0);
            $table->string('taste_label')->nullable();
            $table->string('size_label')->nullable();
            $table->string('accent')->nullable();
            $table->string('glow')->nullable();
            $table->integer('unit_amount')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
