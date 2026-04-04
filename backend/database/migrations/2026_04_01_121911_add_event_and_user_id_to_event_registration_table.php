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
        Schema::table('event_registration', function (Blueprint $table) {
            if (!Schema::hasColumn('event_registration', 'event_id')) {
                $table->unsignedBigInteger('event_id')->after('id');
                $table->foreign('event_id')->references('id')->on('events')->cascadeOnDelete();
            }
            if (!Schema::hasColumn('event_registration', 'user_id')) {
                $table->unsignedBigInteger('user_id')->nullable()->after('event_id');
                $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_registration', function (Blueprint $table) {
            $table->dropForeign(['event_id']);
            $table->dropForeign(['user_id']);
            $table->dropColumn(['event_id', 'user_id']);
        });
    }
};
