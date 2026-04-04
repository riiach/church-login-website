<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\EventResource;
use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Carbon\Carbon;

class EventController extends Controller
{
    public function events()
    {
        $events = Event::where(function ($query) {
            $query->whereNull('due_date')
                  ->orWhere('due_date', '>=', Carbon::now());
        })->get();

        return EventResource::collection($events);
    }
}
