<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_type',
        'duration',
        'distance',
        'notes',
        'date',
        'pet_id'
    ];

    protected $casts = [
        'date' => 'date',
        'distance' => 'decimal:2',
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }
} 