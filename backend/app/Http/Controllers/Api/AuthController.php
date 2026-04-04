<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        return response()->json([
            'user' => $user,
            'message'=> 'User Registered Successfully'
        ], 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Authenticated, user is logged in via Sanctum cookie
        $user = Auth::user();

        return response()->json([
            'data' => $user,
            'message' => 'User logged in successfully',
        ]);
    }

    public function logout(Request $request)
    {
        $user = Auth::guard('web')->user();

        // If user logged in via Sanctum API token
        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }

        // If using SPA session
        Auth::guard('web')->logout();
        // Do not invalidate whole session; that would also log out admin guard.
        $request->session()->regenerateToken();
        $request->session()->save();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json([
            'data' => Auth::guard('web')->user(),
        ]);
    }
}