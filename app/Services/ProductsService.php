<?php

namespace App\Services;

class ProductsService
{
    public function storeFrontProducts()
    {
        return \App\Models\Product::query()
            ->where('can_sell', true)
            ->get()
            ->map(fn (\App\Models\Product $p) => [
                'slug' => $p->slug,
                'name' => $p->name,
                'tagline' => $p->tagline,
                'description' => $p->description,
                'heat_label' => $p->heat_label,
                'heat_level' => $p->heat_level,
                'taste_label' => $p->taste_label,
                'price' => $p->price,
                'accent' => $p->accent,
                'glow' => $p->glow,
                'image' => $p->image,
            ])
            ->toArray();
    }
}