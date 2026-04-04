<?php

use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\SeriesController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\PlanningCenterController;
use App\Http\Controllers\Api\EventRegistrationController;


Route::get("/announcement", [AnnouncementController::class, 'announcements']);
Route::get('/banner', [BannerController::class, 'banners']);
Route::get("/event", [EventController::class, 'events']);
Route::get('/series', [SeriesController::class, 'series']);
Route::get('/test', function () {
    return "API working";
});

// Auth routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Session-aware auth routes for SPA
Route::middleware(['web'])->group(function () {
    // Returns { data: null } for guests instead of 401 to simplify frontend checks.
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Planning Center routes
Route::get('/pc/events', [PlanningCenterController::class, 'events']);
Route::get('/pc/people', [PlanningCenterController::class, 'people']);
Route::get('/pc/groups', [PlanningCenterController::class, 'groups']);

// Event registration routes
Route::get('/users/{userId}/registered-events', [EventRegistrationController::class, 'registeredEvents']);
Route::post('/events/{eventId}/register', [EventRegistrationController::class, 'register']);
Route::get('/events/{eventId}/remaining-slots', [EventRegistrationController::class, 'remainingSlots']);
Route::get('/events/{eventId}/check-registration/{userId}', [EventRegistrationController::class, 'checkRegistration']);
Route::post('/events/{eventId}/unregister', [EventRegistrationController::class, 'unregister']);