<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['slug', 'name', 'tagline', 'description', 'heat_label', 'heat_level', 'taste_label', 'size_label', 'accent', 'glow', 'image', 'unit', 'unit_amount', 'price_amount', 'can_sell', 'in_stock', 'can_build_with', 'can_be_built', 'stripe_product_id', 'class'])]
class Product extends Model
{
    use HasFactory, HasUuids, SoftDeletes;

    protected $casts = [
        'can_sell' => 'boolean',
        'in_stock' => 'boolean',
        'can_build_with' => 'boolean',
        'can_be_built' => 'boolean',
    ];
}
