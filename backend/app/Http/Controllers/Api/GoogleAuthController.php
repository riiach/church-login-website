<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver("google")->stateless()->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver("google")->stateless()->user();

        $user = User::updateOrCreate(
            [
                'email' => $googleUser->email
            ],
            [
                'name' => $googleUser->name,
                'google_id' => $googleUser->id,
                'password' => bcrypt(Str::random(16)),
                'email_verified_at' => now()
            ]
        );

        $token = $user->createToken('google_auth_token')->plainTextToken;

        $cookie = cookie(
            'auth_token',
            $token,
            60 * 24,   // minutes (1 day)
            '/',
            null,
            false,
            true       // httpOnly
        );

        return redirect(config('app.frontend_url'))->withCookie($cookie);
    }
}
