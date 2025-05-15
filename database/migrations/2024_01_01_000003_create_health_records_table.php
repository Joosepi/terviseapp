<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('health_records', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // vaccination, vet_visit, medication, allergy
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('date');
            $table->string('veterinarian')->nullable();
            $table->string('medication_name')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('pet_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('health_records');
    }
}; 