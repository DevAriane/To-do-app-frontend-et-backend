<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class TaskApiTest extends TestCase
{
use DatabaseTransactions; 

    /** @test */
    public function it_can_list_tasks()
    {
        Task::factory()->create(['title' => 'Test tâche']);
        
        $this->getJson('/api/tasks')
             ->assertStatus(200)
             ->assertJsonFragment(['title' => 'Test tâche']);
    }

    /** @test */
    public function it_can_create_a_task()
    {
        $this->postJson('/api/tasks/create', [
            'title' => 'Nouvelle tâche',
            'description' => 'Test API',
            'completed'=>'false'
        ])
        ->assertStatus(201)
        ->assertJsonFragment(['title' => 'Nouvelle tâche']);
    }

    /** @test */
    public function it_can_update_a_task()
    {
        $task = Task::factory()->create();

        $this->postJson('/api/tasks/update', [
            'id' => $task->id,
            'title' => 'Titre modifié',
            'completed'=>'false'
        ])
        ->assertStatus(200)
        ->assertJsonFragment(['title' => 'Titre modifié']);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        $task = Task::factory()->create();

        $this->postJson('/api/tasks/delete', ['id' => $task->id])
             ->assertStatus(200);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }
}
