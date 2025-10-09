<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index() {
        return Task::all();
    }

public function store(Request $request) {
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'user_id' => 'required|exists:users,id'
    ]);

    return Task::create($validated);
}



    public function show(Task $task) {
        return $task;
    }

    public function update(Request $request, Task $task) {
        $task->update($request->all());
        return $task;
    }

    public function destroy(Task $task) {
        $task->delete();
        return response()->json([
            'message' => 'Deleted'
            ]
        );
    }
}

