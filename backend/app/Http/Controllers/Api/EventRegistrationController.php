<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\EventRegistration;
use App\Http\Resources\EventResource;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EventRegistrationController extends Controller
{
    public function register(Request $request, $eventId)
    {
        $validated = $request->validate([
            'user_id' => 'nullable|exists:users,id',
            'name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'nullable|string',
            'profile_photo' => 'nullable|string',
        ]);

        $event = Event::findOrFail($eventId);

        // Check if user is already registered for this specific event (only when user_id is provided)
        if ($validated['user_id'] !== null) {
            $alreadyRegistered = EventRegistration::where('event_id', $eventId)
                ->where('user_id', $validated['user_id'])
                ->exists();

            if ($alreadyRegistered) {
                return response()->json([
                    'message' => 'User is already registered for this event'
                ], 409);
            }
        }

        $registered = EventRegistration::where('event_id', $eventId)->count();

        // Check if event has a max_slots limit and if it's full
        if ($event->max_slots !== null && $event->max_slots <= 0) {
            return response()->json([
                'message' => 'Event is full'
            ], 400);
        }

        $registration = EventRegistration::create([
            'event_id' => $eventId,
            'user_id' => $validated['user_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'profile_photo' => $validated['profile_photo'],
        ]);

        if ($event->max_slots !== null && $alreadyRegistered === false) {
            $event->decrement('max_slots');
        }

        return response()->json([
            'message' => 'Registration successful',
            'registration' => $registration
        ], 201);
    }

    public function index()
    {
        $events = Event::with('registration')->get();

        return view('events.index', compact('events'));
    }

    public function registeredEvents($userId)
    {
        $events = Event::query()
            ->whereHas('registrations', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->where(function ($query) {
                $query->whereNull('due_date')
                    ->orWhere('due_date', '>=', Carbon::today());
            })
            ->orderBy('event_date', 'asc')
            ->get();

        return EventResource::collection($events);
    }

    public function remainingSlots($eventId)
    {
        $event = Event::findOrFail($eventId);

        // If max_slots is null, it's unlimited
        if ($event->max_slots === null) {
            return response()->json([
                'remaining_slots' => -1,
                'is_unlimited' => true
            ]);
        }

        return response()->json([
            'remaining_slots' => max(0, $event->max_slots),
            'is_unlimited' => false
        ]);
    }

    public function checkRegistration($eventId, $userId)
    {
        $exists = EventRegistration::where('event_id', $eventId)
            ->where('user_id', $userId)
            ->exists();

        return response()->json($exists);
    }

    public function unregister(Request $request, $eventId)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $registration = EventRegistration::where('event_id', $eventId)
            ->where('user_id', $validated['user_id'])
            ->first();

        if (!$registration) {
            return response()->json([
                'message' => 'Registration not found'
            ], 404);
        }

        $registration->delete();

        // Increment max_slots if it's not unlimited
        $event = Event::findOrFail($eventId);
        if ($event->max_slots !== null) {
            $event->increment('max_slots');
        }

        return response()->json([
            'message' => 'Unregistration successful'
        ]);
    }
}
