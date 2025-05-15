<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'title',
        'description',
        'date',
        'veterinarian',
        'medication_name',
        'notes',
        'pet_id'
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
} 