
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\AuthController;



Route::get('/test', function(Request $request){
    return response()->json(['message' => 'API fonctionne !']);
});

// Route::post('/register',[AuthController::class,'register']);
// Route::post('/login',[AuthController::class,'login']);

//  Route::post('/logout',[AuthController::class,'logout']);
   

// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/logout',[AuthController::class,'logout']);
//     Route::get('/tasks', [TaskController::class,'show']);
//     Route::post('/tasks/create', [TaskController::class,'store']);
//     Route::post('/tasks/update', [TaskController::class,'update']);
//     Route::post('/tasks/delete', [TaskController::class,'destroy']);
// });

  Route::get('/tasks', [TaskController::class,'show']);
    Route::post('/tasks/create', [TaskController::class,'store']);
    Route::post('/tasks/update', [TaskController::class,'update']);
    Route::post('/tasks/delete', [TaskController::class,'destroy']);