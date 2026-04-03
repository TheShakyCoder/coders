<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        foreach (config('hot_sauce.products') as $data) {
            Product::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'name'             => $data['name'],
                    'tagline'          => $data['tagline'] ?? null,
                    'description'      => $data['description'] ?? null,
                    'heat_label'       => $data['heat_label'] ?? null,
                    'heat_level'       => $data['heat_level'] ?? 0,
                    'size_label'       => $data['size_label'] ?? null,
                    'accent'           => $data['accent'] ?? null,
                    'glow'             => $data['glow'] ?? null,
                    'image'            => $data['image'] ?? null,
                    'unit_amount'      => $data['unit_amount'] ?? 0,
                    'stripe_product_id'=> $data['stripe_product_id'] ?? null,
                    'can_sell'         => true,
                ],
            );
        }
    }
}
