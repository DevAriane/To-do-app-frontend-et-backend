<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Task;

class GetTasksApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_returns_all_tasks(): void
    {
        Task::factory()->count(3)->create();

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    public function test_store_creates_task(): void
    {
        $payload = [
            'title' => 'Ranger les habits',
            'description' => 'la meilleure des choses à faire',
            'completed' => false
        ];

        $response = $this->postJson('/api/tasks/create', $payload);

        $response->assertStatus(201);
        $response->assertJsonFragment(['title' => 'Ranger les habits']);

        $this->assertDatabaseHas('tasks', ['title' => 'Ranger les habits']);
    }
}
