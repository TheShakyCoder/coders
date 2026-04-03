<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('slug')->unique()->after('id');
            $table->string('tagline')->nullable()->after('name');
            $table->string('heat_label')->nullable()->after('description');
            $table->integer('heat_level')->default(0)->after('heat_label');
            $table->string('taste_label')->nullable()->after('heat_level');
            $table->string('size_label')->nullable()->after('taste_label');
            $table->string('accent')->nullable()->after('image');
            $table->string('glow')->nullable()->after('accent');
            $table->integer('unit_amount')->default(0)->after('price_amount');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['slug', 'tagline', 'heat_label', 'heat_level', 'taste_label', 'size_label', 'accent', 'glow', 'unit_amount']);
        });
    }
};
