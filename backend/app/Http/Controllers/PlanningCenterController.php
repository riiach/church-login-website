<?php

namespace App\Http\Controllers;

use App\Services\PlanningCenterService;

class PlanningCenterController extends Controller
{
    public function events(PlanningCenterService $pc)
    {
        return response()->json($pc->events());
    }

    public function people(PlanningCenterService $pc)
    {
        return response()->json($pc->people());
    }

    public function groups(PlanningCenterService $pc)
    {
        return response()->json($pc->groups());
    }
}