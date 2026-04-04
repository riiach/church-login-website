<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAnnouncementRequest;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;
use Carbon\Carbon;

class AnnouncementController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');
        
        try {
            $query = Announcement::orderByRaw("CASE WHEN due_date IS NULL THEN 1 WHEN due_date >= CURDATE() THEN 1 ELSE 0 END DESC");
        } catch (\Exception $e) {
            // Fall back if due_date column doesn't exist yet
            $query = Announcement::query();
        }
        
        // Sort by event_date descending (highest/newest first)
        $query->orderBy('event_date', 'desc');
        
        // Filter by category if provided
        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }
        
        $announcements = $query->get();
        
        // Get all unique categories for the filter dropdown
        $categories = Announcement::distinct('category')->pluck('category')->sort();

        return view('announcements.index', compact('announcements', 'categories', 'category'));
    }

    public function create()
    {
        return view('announcements.create');
    }

    public function store(StoreAnnouncementRequest $request)
    {
        $data = $request->only([
            'title',
            'category',
            'event_date',
            'end_date',
            'start_time',
            'end_time',
            'location',
            'description'
        ]);

        // Only add due_date if column exists
        if (Schema::hasColumn('announcements', 'due_date')) {
            $data['due_date'] = $request->due_date ? Carbon::parse($request->due_date)->format('Y-m-d') : null;
        }

        $data['event_date'] = $data['event_date'] ?: null;
        $data['end_date'] = $data['end_date'] ?: null;
        $data['start_time'] = $data['start_time'] ?: null;
        $data['end_time'] = $data['end_time'] ?: null;

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('announcements', 'public');
        } elseif ($request->image_url) {
            $data['image'] = $request->image_url;
        }

        Announcement::create($data);

        return to_route('admin.announcements.index')
            ->with('success','Announcement added.');
    }

    public function edit(Announcement $announcement)
    {
        return view('announcements.edit', compact('announcement'));
    }

    public function update(Request $request, Announcement $announcement)
    {
        $request->validate([
            'title' => ['required','string','max:255'],
            'image' => ['nullable','image'],
            'description' => ['nullable','string'],
            'category' => ['required','string'],
            'event_date' => ['nullable','date'],
            'due_date' => ['nullable','date'],
            'end_date' => ['nullable','date'],
            'start_time' => ['nullable','date_format:H:i'],
            'end_time' => ['nullable','date_format:H:i'],
            'location'=> ['nullable','string'],
        ]);

        $image = $announcement->image;

        if ($request->hasFile('image')) {

            if ($announcement->image && !str_starts_with($announcement->image, 'http')) {
                Storage::disk('public')->delete($announcement->image);
            }

            $image = $request->file('image')->store('announcements','public');
        }

        $updateData = [
            'title'=> $request->title,
            'image'=> $image,
            'description'=> $request->description,
            'category'=> $request->category,
            'event_date' => $request->event_date ?: null,
            'location'=> $request->location,
        ];

        // Only add due_date if column exists
        if (Schema::hasColumn('announcements', 'due_date')) {
            $updateData['due_date'] = $request->due_date ? Carbon::parse($request->due_date)->format('Y-m-d') : null;
        }

        $announcement->update($updateData);

        return to_route('admin.announcements.index')
            ->with('success','Announcement updated.');
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
