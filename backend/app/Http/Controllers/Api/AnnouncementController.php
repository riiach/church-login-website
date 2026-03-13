<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\AnnouncementResource;
use App\Models\Announcement;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function announcements()
    {
        return AnnouncementResource::collection(Announcement::all());
    }
}
