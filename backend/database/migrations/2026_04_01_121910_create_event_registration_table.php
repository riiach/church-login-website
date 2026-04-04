<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('event_registration')) {
            return;
        }
        Schema::create('event_registration', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('user_id')->nullable();

            $table->string('name');
            $table->string('email');
            $table->string('phone')->nullable();
            
            $table->timestamps();

            $table->foreign('event_id')->constrained()->cascadeOnDelete();
            $table->foreign('user_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_registration');
    }
};
