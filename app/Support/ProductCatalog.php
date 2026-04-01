<?php

namespace App\Support;

use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;

class ProductCatalog
{
    public static function boxLimit(): int
    {
        return (int) config('hot_sauce.box_limit', 3);
    }

    public static function boxName(): string
    {
        return (string) config('hot_sauce.box_name', "Coder's Hot Sauce Box");
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public static function storefront(): array
    {
        return array_map(function (array $product): array {
            return Arr::except($product, ['stripe_product_id']);
        }, config('hot_sauce.products', []));
    }

    /**
     * @return array<string, mixed>
     */
    public static function findOrFail(string $slug): array
    {
        $product = collect(config('hot_sauce.products', []))
            ->firstWhere('slug', $slug);

        if (! is_array($product)) {
            throw ValidationException::withMessages([
                'product' => 'That sauce is not available.',
            ]);
        }

        return $product;
    }

    /**
     * @param  array<int, array{product:string,quantity:int}>  $items
     * @return array<int, array<string, mixed>>
     */
    public static function resolveBoxItemsOrFail(array $items): array
    {
        $normalizedItems = collect($items)
            ->groupBy('product')
            ->map(function ($group, string $slug): array {
                try {
                    $product = self::findOrFail($slug);
                } catch (ValidationException) {
                    throw ValidationException::withMessages([
                        'items' => 'That sauce is not available.',
                    ]);
                }

                $quantity = $group->sum('quantity');

                if (blank($product['stripe_product_id'] ?? null)) {
                    throw ValidationException::withMessages([
                        'items' => 'One of the selected sauces is not connected to Stripe yet.',
                    ]);
                }

                return [
                    ...$product,
                    'quantity' => $quantity,
                    'line_total_amount' => $product['unit_amount'] * $quantity,
                ];
            })
            ->values();

        $totalQuantity = $normalizedItems->sum('quantity');

        if ($totalQuantity < 1 || $totalQuantity > self::boxLimit()) {
            throw ValidationException::withMessages([
                'items' => 'Choose between 1 and '.self::boxLimit().' bottles per box.',
            ]);
        }

        return $normalizedItems->all();
    }
}
