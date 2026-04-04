<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSeriesRequest;
use App\Models\Series;

class SeriesController extends Controller
{
    public function index()
    {
        $series = Series::query()
            ->orderBy('order', 'asc')
            ->get();

        return view('series.index', compact('series'));
    }

    public function create()
    {
        return view('series.create');
    }

    public function store(StoreSeriesRequest $request)
    {
        $data = $request->validated();

        $data['order'] = $data['order'] ?? 0;
        $data['start_date'] = $data['start_date'] ?: null;
        $data['end_date'] = $data['end_date'] ?: null;

        Series::create($data);

        return to_route('admin.series.index')->with('success', 'Series created successfully.');
    }

    public function edit(Series $series)
    {
        return view('series.edit', compact('series'));
    }

    public function update(StoreSeriesRequest $request, Series $series)
    {
        $data = $request->validated();

        $data['order'] = $data['order'] ?? $series->order ?? 0;
        $data['start_date'] = $data['start_date'] ?: null;
        $data['end_date'] = $data['end_date'] ?: null;

        $series->update($data);

        return to_route('admin.series.index')->with('success', 'Series updated successfully.');
    }

    public function destroy(Series $series)
    {
        $series->delete();

        return back()->with('danger', 'Series deleted.');
    }
}
