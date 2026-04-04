<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class AnnouncementController extends Controller
{
    public function announcements()
    {
        // Only filter by due_date if the column exists
        if (Schema::hasColumn('announcements', 'due_date')) {
            $announcements = Announcement::where(function ($query) {
                $query->whereNull('due_date')
                      ->orWhere('due_date', '>=', Carbon::now());
            })->get();
        } else {
            // Fallback if column doesn't exist yet
            $announcements = Announcement::all();
        }

        return AnnouncementResource::collection($announcements);
    }
}
