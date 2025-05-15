<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('workouts', function (Blueprint $table) {
            $table->id();
            $table->string('activity_type'); // walk, play, training
            $table->integer('duration'); // in minutes
            $table->decimal('distance', 8, 2)->nullable(); // in kilometers
            $table->text('notes')->nullable();
            $table->date('date');
            $table->foreignId('pet_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('workouts');
    }
}; 