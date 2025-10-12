
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\AuthController;


use App\Models\User;

Route::post('/refresh', function (Request $request) {
    $user = User::find($request->user_id);
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    $token = $user->createToken('mobile_app_token')->plainTextToken;

    return response()->json(['token' => $token]);
});


Route::get('/ping', function () {
    return response()->json(['message' => 'API OK ✅']);
});


Route::get('/test', function(Request $request){
    return response()->json(['message' => 'API fonctionne !']);
});

 Route::post('/register',[AuthController::class,'register']);
 Route::post('/login',[AuthController::class,'login']);


 Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user',[AuthController::class,'index']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/tasks', [TaskController::class,'index']);
    Route::post('/tasks/create', [TaskController::class,'store']);  
    Route::post('/tasks/{id}/update', [TaskController::class,'update']);
    Route::post('/tasks/{id}/delete', [TaskController::class,'destroy']);
});


