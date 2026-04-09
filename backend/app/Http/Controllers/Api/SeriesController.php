<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Series;
use Carbon\Carbon;

class SeriesController extends Controller
{
    public function series()
    {
        $windowStart = Carbon::today();
        $windowEnd = Carbon::today()->addMonths(6);

        $series = Series::query()
            ->select(['id', 'order', 'title', 'chapter', 'description', 'start_date', 'end_date'])
            ->where(function ($query) use ($windowStart, $windowEnd) {
                $query->where(function ($subQuery) use ($windowStart, $windowEnd) {
                    $subQuery->whereNotNull('start_date')
                        ->where('start_date', '<=', $windowEnd)
                        ->where(function ($rangeQuery) use ($windowStart) {
                            $rangeQuery->whereNull('end_date')
                                ->orWhere('end_date', '>=', $windowStart);
                        });
                })->orWhere(function ($subQuery) use ($windowStart) {
                    $subQuery->whereNull('start_date')
                        ->whereNotNull('end_date')
                        ->where('end_date', '>=', $windowStart);
                });
            })
            ->orderBy('order', 'asc')
            ->get();

        return response()->json([
            'data' => $series,
        ]);
    }
}
