<?php

use App\Http\Controllers\Backend\AdminController;
use App\Http\Controllers\Backend\AnnouncementController;
use App\Http\Controllers\Backend\BannerController;
use App\Http\Controllers\Auth\PlanningCenterAuthController;
use App\Http\Controllers\Backend\EventController;
use App\Http\Controllers\Backend\SeriesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Planning Center OAuth routes
|--------------------------------------------------------------------------
*/

Route::get('/auth/planning-center/redirect', [PlanningCenterAuthController::class, 'redirect'])
    ->name('planning-center.redirect');
Route::get('/auth/planning-center/callback', [PlanningCenterAuthController::class, 'callback'])
    ->name('planning-center.callback');

/*
|--------------------------------------------------------------------------
| Planning Center Data Sync routes
|--------------------------------------------------------------------------
*/

Route::get('/debug-user', function () {
    return [
        'auth_check' => Auth::check(),
        'user' => Auth::user(),
    ];
});

// Frontend logout endpoint (web guard only).
Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->regenerateToken();

    return response()->json([
        'message' => 'Logged out successfully',
    ]);
})->withoutMiddleware([\Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class]);

/*
|--------------------------------------------------------------------------
| Admin Root Redirect
|--------------------------------------------------------------------------
*/

Route::get('/admin', function () {
    return view('admin.welcome');
});


/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Guest Admin Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('guest:admin')->group(function () {

        Route::get('/login', [AdminController::class, 'showLogin'])->name('login');
        Route::post('/login', [AdminController::class, 'login']);

        Route::get('/register', [AdminController::class, 'showRegister'])->name('register');
        Route::post('/register', [AdminController::class, 'register']);

    });


    /*
    |--------------------------------------------------------------------------
    | Authenticated Admin Routes
    |--------------------------------------------------------------------------
    */

    Route::middleware('auth:admin')->group(function () {

        Route::get('/dashboard', function () {
            return view('admin.dashboard');
        })->name('dashboard');

        Route::post('/logout', [AdminController::class, 'logout'])->name('logout');

        Route::resource('announcements', AnnouncementController::class);
        Route::resource('banners', BannerController::class);
        Route::resource('events', EventController::class);
        Route::resource('series', SeriesController::class);

    });

});


/*
|--------------------------------------------------------------------------
| Debug Route
|--------------------------------------------------------------------------
*/

Route::get('/admin-test', function () {
    dd(
        Auth::guard('web')->check(),
        Auth::guard('admin')->check()
    );
});


/*
|--------------------------------------------------------------------------
| Breeze User Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});