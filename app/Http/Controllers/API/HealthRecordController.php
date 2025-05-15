<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\HealthRecord;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HealthRecordController extends Controller
{
    public function index(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $healthRecords = $pet->healthRecords()->orderBy('date', 'desc')->get();
        return response()->json($healthRecords);
    }

    public function store(Request $request, Pet $pet)
    {
        if ($pet->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'type' => 'required|in:vaccination,vet_visit,medication,allergy',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'date' => 'required|date',
            'veterinarian' => 'nullable|string|max:255',
            'medication_name' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $healthRecord = $pet->healthRecords()->create($request->all());

        return response()->json($healthRecord, 201);
    }

    public function show(Request $request, Pet $pet, HealthRecord $healthRecord)
    {
        if ($pet->user_id !== $request->user()->id || $healthRecord->pet_id !== $pet->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($healthRecord);
    }

    public function update(Request $request, Pet $pet, HealthRecord $healthRecord)
    {
        if ($pet->user_id !== $request->user()->id || $healthRecord->pet_id !== $pet->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'type' => 'required|in:vaccination,vet_visit,medication,allergy',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'date' => 'required|date',
            'veterinarian' => 'nullable|string|max:255',
            'medication_name' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $healthRecord->update($request->all());

        return response()->json($healthRecord);
    }

    public function destroy(Request $request, Pet $pet, HealthRecord $healthRecord)
    {
        if ($pet->user_id !== $request->user()->id || $healthRecord->pet_id !== $pet->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $healthRecord->delete();

        return response()->json(['message' => 'Health record deleted successfully']);
    }
} 