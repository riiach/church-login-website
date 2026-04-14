<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBannerRequest;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->query('category');

        $query = Banner::query()->latest();

        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        $banners = $query->get();
        $categories = Banner::distinct('category')->pluck('category')->sort()->values();

        return view('banners.index', compact('banners', 'categories', 'category'));
    }

    public function create()
    {
        return view('banners.create');
    }

    public function store(StoreBannerRequest $request)
    {
        $data = $request->only(['category', 'link', 'order', 'text_content']);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('banners', 'public');
        } elseif ($request->image_url) {
            $data['image'] = $request->image_url;
        }

        Banner::create($data);

        return to_route('admin.banners.index')->with('success', 'Banner created successfully.');
    }

    public function edit(Banner $banner)
    {
        return view('banners.edit', compact('banner'));
    }

    public function update(Request $request, Banner $banner)
    {
        $request->validate([
            'category' => ['required', 'string', 'max:255'],
            'link' => ['nullable', 'string', 'max:255'],
            'order' => ['nullable', 'integer'],
            'text_content' => ['nullable', 'string'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,webp', 'max:2048'],
            'image_url' => ['nullable', 'url', 'max:2048'],
        ]);

        $data = $request->only(['category', 'link', 'order', 'text_content']);
        $image = $banner->image;

        if ($request->hasFile('image')) {
            if ($banner->image && !str_starts_with($banner->image, 'http')) {
                Storage::disk('public')->delete($banner->image);
            }

            $image = $request->file('image')->store('banners', 'public');
        } elseif ($request->filled('image_url')) {
            if ($banner->image && !str_starts_with($banner->image, 'http')) {
                Storage::disk('public')->delete($banner->image);
            }

            $image = $request->image_url;
        }

        $data['image'] = $image;

        $banner->update($data);

        return to_route('admin.banners.index')->with('success', 'Banner updated successfully.');
    }

    public function destroy(Banner $banner)
    {
        if ($banner->image && !str_starts_with($banner->image, 'http')) {
            Storage::disk('public')->delete($banner->image);
        }

        $banner->delete();

        return back()->with('danger', 'Banner deleted.');
    }
}