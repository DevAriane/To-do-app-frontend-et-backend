<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_task()
    {
        $response = $this->postJson('/api/tasks', [
            'title' => 'Test Task',
            'description' => 'This is a test task',
            'completed' => false,
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'Test Task']);

        $this->assertDatabaseHas('tasks', ['title' => 'Test Task']);
    }

    /** @test */
    public function it_can_list_tasks()
    {
        Task::factory()->create(['title' => 'My Task']);

        $response = $this->getJson('/api/tasks');

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'My Task']);
    }

    /** @test */
    public function it_can_update_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->putJson("/api/tasks/{$task->id}", [
            'title' => 'Updated Title',
            'description' => 'Updated desc',
            'completed' => true,
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Updated Title']);

        $this->assertDatabaseHas('tasks', ['title' => 'Updated Title']);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}
