<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Delete orphaned event_registration records (where event_id doesn't exist in events table)
        DB::delete('DELETE FROM event_registration WHERE event_id NOT IN (SELECT id FROM events)');

        // Check if the foreign key exists and drop it
        $tableName = 'event_registration';
        $foreignKeys = DB::select("SELECT CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = ? AND COLUMN_NAME = 'event_id' AND REFERENCED_TABLE_NAME IS NOT NULL", [$tableName]);
        
        if (!empty($foreignKeys)) {
            Schema::table('event_registration', function (Blueprint $table) {
                $table->dropForeign(['event_id']);
            });
        }

        // Create the foreign key with cascadeOnDelete
        Schema::table('event_registration', function (Blueprint $table) {
            $table->foreign('event_id')
                ->references('id')
                ->on('events')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_registration', function (Blueprint $table) {
            $table->dropForeign(['event_id']);
            $table->foreign('event_id')
                ->references('id')
                ->on('events');
        });
    }
};
