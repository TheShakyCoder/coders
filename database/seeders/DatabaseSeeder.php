<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ProductSeeder::class);

        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'support@fig.limited'],
            [
                'name' => 'Fig Support',
                'password' => Hash::make(config('app.admin.password')),
                'email_verified_at' => now(),
                'is_admin' => true,
            ]
        );
    }
}
