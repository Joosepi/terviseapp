<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\PetController;
use App\Http\Controllers\API\HealthRecordController;
use App\Http\Controllers\API\WorkoutController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // Pet routes
    Route::apiResource('pets', PetController::class);
    
    // Health records routes (nested under pets)
    Route::apiResource('pets.health-records', HealthRecordController::class);
    
    // Workouts routes (nested under pets)
    Route::apiResource('pets.workouts', WorkoutController::class);
    
    // Dashboard stats
    Route::get('/dashboard/stats', function (Request $request) {
        $user = $request->user();
        $petsCount = $user->pets()->count();
        $healthRecordsCount = $user->pets()->withCount('healthRecords')->get()->sum('health_records_count');
        $workoutsCount = $user->pets()->withCount('workouts')->get()->sum('workouts_count');
        
        return response()->json([
            'petsCount' => $petsCount,
            'healthRecordsCount' => $healthRecordsCount,
            'workoutsCount' => $workoutsCount,
        ]);
    });
}); 