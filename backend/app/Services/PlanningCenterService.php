<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PlanningCenterService
{
    protected $client;

    public function __construct()
    {
        $this->client = Http::withBasicAuth(
            config('services.planningcenter.app_id'),
            config('services.planningcenter.secret')
        )->baseUrl(config('services.planningcenter.url'));
    }

    public function events()
    {
        return $this->client
            ->get('/calendar/v2/events')
            ->json();
    }

    public function people()
    {
        return $this->client
            ->get('/people/v2/people')
            ->json();
    }

    public function groups()
    {
        return $this->client
            ->get('/groups/v2/groups')
            ->json();
    }

    public function refreshToken($user)
    {
        $response = Http::post(
            'https://api.planningcenteronline.com/oauth/token',
            [
                'grant_type' => 'refresh_token',
                'refresh_token' => $user->pc_refresh_token,
                'client_id' => config('services.pc.client_id'),
                'client_secret' => config('services.pc.client_secret'),
            ]
        );

        $data = $response->json();

        $user->update([
            'pc_access_token' => $data['access_token'],
            'pc_refresh_token' => $data['refresh_token'],
            'pc_token_expires_at' => now()->addSeconds($data['expires_in']),
        ]);

        return $data['access_token'];
    }

    public function getValidToken($user)
    {
        if (now()->greaterThan($user->pc_token_expires_at)) {
            return $this->refreshToken($user);
        }

        return $user->pc_access_token;
    }
}