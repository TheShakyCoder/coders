<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(),
            'unit' => $this->faker->randomElement(['bottle', 'case', 'kg', 'unit']),
            'price_amount' => $this->faker->numberBetween(100, 10000),
            'can_sell' => $this->faker->boolean(80),
            'can_build_with' => $this->faker->boolean(30),
            'can_be_built' => $this->faker->boolean(40),
            'stripe_product_id' => 'prod_' . $this->faker->bothify('??##??##??'),
            'class' => $this->faker->randomElement(['A', 'B', 'C', null]),
        ];
    }
}
