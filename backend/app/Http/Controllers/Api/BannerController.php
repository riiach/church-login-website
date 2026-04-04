<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    public function banners(Request $request)
    {
        $category = $request->query('category');

        $query = Banner::query()->latest();

        if ($category && $category !== 'all') {
            $query->where('category', $category);
        }

        return response()->json([
            'data' => $query->get(),
        ]);
    }
}