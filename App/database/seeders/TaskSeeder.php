<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;

class TaskSeeder extends Seeder
{
    public function run()
    {
        // Vérifie d’abord qu’il existe des utilisateurs
        $users = User::all();

        if ($users->count() === 0) {
            $this->command->warn('Aucun utilisateur trouvé, création de 5 utilisateurs...');
            $users = \App\Models\User::factory(5)->create();
        }

        // Pour chaque utilisateur, créer 3 tâches
        foreach ($users as $user) {
            Task::factory()->count(3)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
