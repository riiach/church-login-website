<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AnnouncementController extends Controller
{
    public function index()
    {
        $announcements = Announcement::all();

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
        } elseif($request->image_url) {
            $data['image'] = $request->image_url;
        }

        Announcement::create($data);

        return to_route('announcements.index')->with('success','Announcement added.');
    }

    public function edit(Announcement $announcement)
    {
        return view('announcements.edit', compact('announcement'));
    }

    public function update(Request $request, Announcement $announcement)
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
        if ($announcement->image && !str_starts_with($announcement->image, 'http')) {
            Storage::disk('public')->delete($announcement->image);
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

    public function destroy(Announcement $announcement)
    {
        if ($announcement->image && !str_starts_with($announcement->image, 'http')) {
            Storage::disk('public')->delete($announcement->image);
        }
        $announcement->delete();

        return back()->with('danger','Announcement deleted.');

    }
}
