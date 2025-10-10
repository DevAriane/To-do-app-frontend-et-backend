<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
   public function index()
    {
        // ✅ Affiche uniquement les tâches de l’utilisateur connecté
        $tasks = Task::where('user_id', Auth::id())->get();

        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // 🔥 On récupère l'utilisateur connecté via Sanctum
        $user = $request->user();

        // 🔥 On associe l'ID de cet utilisateur à la tâche
        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? '',
            'user_id' => $user->id,  // <<--- ICI le lien entre token et tâche
        ]);

        return response()->json($task, 201);
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

