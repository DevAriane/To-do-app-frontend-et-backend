<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(4),
            'description' => $this->faker->paragraph(),
            'completed' => false, // valeur par défaut
            'user_id' => \App\Models\User::factory(), // associe un utilisateur
        ];
    }
}
