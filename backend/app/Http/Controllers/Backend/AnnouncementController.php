<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Models\Announcements;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcements::all();

        return view('announcements.index', compact('announcements'));
    }

    public function create()
    {
        return view('announcements.create');
    }

    public function store(StoreAnnouncementRequest $request)
    {
        
        $data = [
        'title'       => $request->title,
        'category'    => $request->category,
        'event_date'  => $request->event_date,
        'location'    => $request->location,
        'description' => $request->description,
        ];

        if($request->hasFile('image')){
            $data['image'] = $request->file('image')->store('announcements');
        }

        Announcements::create($data);

        return to_route('announcements.index')->with('success','Announcement added.');
    }

    public function edit(Announcements $announcement)
    {
        return view('announcements.edit', compact('announcement'));
    }

    public function update(Request $request, Announcements $announcement)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image'],
            'description' => ['nullable', 'string', 'max:255'],
            'category' => ['required', 'string'],
            'event_date' => ['nullable', 'date'],
            'location'=> ['nullable', 'string'],
        ]);

        $image = $announcement->image;
        if ($request->hasFile('image')) {
            Storage::delete($announcement->image);
            $image = $request->file('image')->store('announcements');
        }

        $announcement->update([
            'title'=> $request->title,
            'image'=> $image,
            'description'=> $request->description,
            'category'=> $request->category,
            'event_date' => $request->event_date,
            'location'=> $request->location,

        ]);

        return to_route('announcements.index')->with('success','Announcement updated.');
    }

    public function destroy(Announcements $announcement)
    {
        Storage::delete($announcement->image);
        $announcement->delete();

        return back()->with('danger','Announcement deleted.');

    }
}
