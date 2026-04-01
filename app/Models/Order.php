<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

#[Fillable([
    'public_id',
    'user_id',
    'status',
    'product_slug',
    'product_name',
    'stripe_price_id',
    'quantity',
    'unit_amount',
    'subtotal_amount',
    'shipping_amount',
    'total_amount',
    'currency',
    'stripe_checkout_session_id',
    'stripe_payment_intent_id',
    'stripe_customer_id',
    'customer_email',
    'customer_name',
    'shipping_address',
    'customer_details',
    'stripe_session_payload',
    'checkout_created_at',
    'paid_at',
    'expired_at',
    'canceled_at',
    'failed_at',
])]
class Order extends Model
{
    use HasUuids, SoftDeletes;

    public const STATUS_INITIATED = 'initiated';

    public const STATUS_CHECKOUT_CREATED = 'checkout_created';

    public const STATUS_CHECKOUT_FAILED = 'checkout_failed';

    public const STATUS_PAID = 'paid';

    public const STATUS_CANCELED = 'canceled';

    public const STATUS_EXPIRED = 'expired';

    public const STATUS_PAYMENT_FAILED = 'payment_failed';

    protected static function booted(): void
    {
        static::creating(function (Order $order): void {
            if (blank($order->public_id)) {
                $order->public_id = (string) Str::ulid();
            }
        });
    }

    protected function casts(): array
    {
        return [
            'shipping_address' => 'array',
            'customer_details' => 'array',
            'stripe_session_payload' => 'array',
            'checkout_created_at' => 'datetime',
            'paid_at' => 'datetime',
            'expired_at' => 'datetime',
            'canceled_at' => 'datetime',
            'failed_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
