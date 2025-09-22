<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Task;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Créer 5 utilisateurs avec 3 tâches chacun
        User::factory()
            ->count(5)
            ->create()
            ->each(function ($user) {
                Task::factory()->count(3)->create([
                    'user_id' => $user->id,
                ]);
            });

        // Créer un admin avec 5 tâches
        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password123'),
        ]);

        Task::factory()->count(5)->create([
            'user_id' => $admin->id,
        ]);
    }
}
