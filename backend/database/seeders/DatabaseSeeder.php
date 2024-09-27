<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::factory()->create([
            'name' => 'Nguyen Huu Dai',
            'email' => 'dainguyen.nhd@gmail.com',
            'password' => Hash::make('password'),
            'address' => 'Tuy Hoa, Phu Yen',
            'phone' => '0987654321'
        ]);
    }
}
