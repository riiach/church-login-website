<?php

namespace App\Http\Controllers\Backend;

use App\Http\Requests\StoreEventRequest;
use App\Models\Event;
use App\Models\EventRegistration;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = Event::orderByRaw("CASE WHEN due_date IS NULL THEN 1 WHEN due_date >= CURDATE() THEN 1 ELSE 0 END DESC, created_at DESC")->paginate(10);
        
        // Get all registrations keyed by event_id
        $registrations = EventRegistration::all()->groupBy('event_id');

        return view('events.index', compact('events', 'registrations'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('events.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $data = [
        'title'       => $request->title,
        'category'    => $request->category,
        'event_date'  => $request->event_date,
        'due_date'    => $request->due_date,
        'location'    => $request->location,
        'description' => $request->description,
        'max_slots'   => $request->max_slots,
        ];

        $data['event_date'] = $request->event_date ?: null;
        $data['due_date'] = $request->due_date ? Carbon::parse($request->due_date)->format('Y-m-d') : null;
        $data['max_slots'] = $request->max_slots ?: null;

        if($request->hasFile('image')){
            $data['image'] = $request->file('image')->store('events');
        } elseif($request->image_url) {
            $data['image'] = $request->image_url;
        }

        Event::create($data);

        return to_route('admin.events.index')->with('success','Announcement added.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Event $event)
    {
        return view('events.edit', compact('event'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image'],
            'description' => ['nullable', 'string', 'max:255'],
            'event_date' => ['nullable', 'date'],
            'due_date' => ['nullable', 'date', 'after_or_equal:event_date'],
            'location'=> ['nullable', 'string'],
            'max_slots' => ['nullable', 'integer', 'min:1'],
        ]);

        $data = $request->only(['title','description','event_date','due_date','location','max_slots','image']);

        // Make sure null is saved for empty fields
        $data['event_date'] = $request->event_date ?: null;
        $data['due_date'] = $request->due_date ? Carbon::parse($request->due_date)->format('Y-m-d') : null;
        $data['max_slots'] = $request->max_slots ?: null;

        // Handle image separately if you have upload logic
        $image = $event->image;
        if ($request->hasFile('image')) {
            if ($event->image && !str_starts_with($event->image, 'http')) {
                Storage::disk('public')->delete($event->image);
            }
            $image = $request->file('image')->store('events', 'public');
        }
        $data['image'] = $image;

        $event->update($data);

        return to_route('admin.events.index')->with('success','Event updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        if ($event->image && !str_starts_with($event->image, 'http')) {
            Storage::disk('public')->delete($event->image);
        }
        $event->delete();

        return back()->with('danger','Event deleted.');
    }
}
