<?php

use App\Http\Controllers\Api\AnnouncementController;
use Illuminate\Support\Facades\Route;

Route::get("/announcement", [AnnouncementController::class, 'announcements']);
Route::get('/test', function () {
    return "API working";
});