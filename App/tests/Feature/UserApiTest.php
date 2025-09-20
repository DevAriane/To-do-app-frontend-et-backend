<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    /**
     * A basic feature test example.
     */

    public function test_it_returns_users()
{
    $response = $this->getJson('/api/users');

    $response->assertStatus(200)
             ->assertJsonStructure([
                 '*' => ['id', 'name', 'email']
             ]);
}


    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
