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
        Schema::table('event_registration', function (Blueprint $table) {
            // Check if the unique constraint exists before trying to drop it
            $indexName = 'event_registration_event_id_user_id_unique';
            
            // Get existing indexes
            $indexes = DB::select("SHOW INDEXES FROM event_registration WHERE Key_name = ?", [$indexName]);
            
            if (!empty($indexes)) {
                $table->dropUnique(['event_id', 'user_id']);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('event_registration', function (Blueprint $table) {
            // Only re-add if it doesn't exist
            $indexName = 'event_registration_event_id_user_id_unique';
            $indexes = DB::select("SHOW INDEXES FROM event_registration WHERE Key_name = ?", [$indexName]);
            
            if (empty($indexes)) {
                $table->unique(['event_id', 'user_id']);
            }
        });
    }
};
