<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Workout;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WorkoutController extends Controller
{
    public function index(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $workouts = $pet->workouts()->orderBy('date', 'desc')->get();
        return response()->json($workouts);
    }

    public function store(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'activity_type' => 'required|in:walk,play,training',
            'duration' => 'required|integer|min:1|max:600',
            'distance' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string|max:1000',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $workout = $pet->workouts()->create($request->all());

        return response()->json($workout, 201);
    }

    public function show(Request $request, Pet $pet, Workout $workout)
    {
        if ($pet->user_id !== $request->user()->id || $workout->pet_id !== $pet->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($workout);
    }

    public function update(Request $request, Pet $pet, Workout $workout)
    {
        if ($pet->user_id !== $request->user()->id || $workout->pet_id !== $pet->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'activity_type' => 'required|in:walk,play,training',
            'duration' => 'required|integer|min:1|max:600',
            'distance' => 'nullable|numeric|min:0|max:100',
            'notes' => 'nullable|string|max:1000',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $workout->update($request->all());

        return response()->json($workout);
    }

    public function destroy(Request $request, Pet $pet, Workout $workout)
    {
        if ($pet->user_id !== $request->user()->id || $workout->pet_id !== $pet->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $workout->delete();

        return response()->json(['message' => 'Workout deleted successfully']);
    }
} 