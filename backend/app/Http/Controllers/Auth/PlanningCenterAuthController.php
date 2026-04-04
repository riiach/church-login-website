<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PlanningCenterAuthController extends Controller
{
    public function redirect()
    {
        $query = http_build_query([
            'client_id' => config('services.pc.client_id'),
            'redirect_uri' => config('services.pc.redirect'),
            'response_type' => 'code',
            'scope' => 'openid people',
        ]);

        return redirect("https://api.planningcenteronline.com/oauth/authorize?{$query}");
    }

    public function callback()
    {
        $tokenResponse = Http::asForm()->post('https://api.planningcenteronline.com/oauth/token', [
            'grant_type' => 'authorization_code',
            'code' => request('code'),
            'client_id' => config('services.pc.client_id'),
            'client_secret' => config('services.pc.client_secret'),
            'redirect_uri' => config('services.pc.redirect'),
        ]);

        $tokens = $tokenResponse->json();
        $accessToken = $tokens['access_token'];

        // 1️⃣ Get basic user info
        $response = Http::withToken($accessToken)
            ->get('https://api.planningcenteronline.com/oauth/userinfo');
        $userInfo = $response->json();

        // 2️⃣ Get detailed person info
        $personResponse = Http::withToken($accessToken)
            ->get("https://api.planningcenteronline.com/people/v2/people/{$userInfo['sub']}");
        $person = $personResponse->json();

        // Extract phone & profile photo
        $phoneUrl = $person['data']['links']['phone_numbers'] ?? null;
        
        $phoneNumber = null;

        if ($phoneUrl) {
            $phoneResponse = Http::withToken($accessToken)->get($phoneUrl);
            $phoneData = $phoneResponse->json();

            $phoneNumber = $phoneData['data'][0]['attributes']['international'] ?? null;
        }

        $profile_photo = $person['data']['attributes']['avatar'] ?? null;

        // Find or create user
        $user = User::updateOrCreate(
            ['email' => $userInfo['email']],
            [
                'name' => $userInfo['name'],
                'planning_center_id' => $userInfo['sub'],
                'pc_access_token' => $tokens['access_token'],
                'pc_refresh_token' => $tokens['refresh_token'],
                'pc_token_expires_at' => now()->addSeconds($tokens['expires_in']),
                'phone' => $phoneNumber,
                'profile_photo' => $profile_photo,
            ]
        );

        Auth::guard('web')->login($user);

        Session::save();

        return redirect('http://localhost:3000');
    }
}
