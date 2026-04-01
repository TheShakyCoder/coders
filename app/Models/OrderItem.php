<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'order_id',
    'product_slug',
    'product_name',
    'stripe_price_id',
    'quantity',
    'unit_amount',
    'line_total_amount',
])]
class OrderItem extends Model
{
    use HasUuids, SoftDeletes;

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }
}
