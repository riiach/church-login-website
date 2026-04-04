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
        if (!Schema::hasColumn('banners', 'text_content')) {
            Schema::table('banners', function (Blueprint $table) {
                $table->text('text_content')->nullable()->after('image');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('banners', 'text_content')) {
            Schema::table('banners', function (Blueprint $table) {
                $table->dropColumn('text_content');
            });
        }
    }
};