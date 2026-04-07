<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Crypt;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Throwable;

class PlanningCenterAuthController extends Controller
{
    public function redirect(Request $request)
    {
        $frontendRedirectUrl = $this->resolveFrontendRedirectUrl($request->query('redirect_to'));

        $query = http_build_query([
            'client_id' => config('services.pc.client_id'),
            'redirect_uri' => config('services.pc.redirect'),
            'response_type' => 'code',
            'scope' => 'openid people',
            'state' => $this->buildOAuthState($frontendRedirectUrl),
        ]);

        return redirect("https://api.planningcenteronline.com/oauth/authorize?{$query}");
    }

    public function callback(Request $request)
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

        $request->session()->regenerate();
        $request->session()->save();

        return redirect($this->resolveFrontendRedirectUrl($this->extractRedirectUrlFromState($request->query('state'))));
    }

    private function buildOAuthState(string $frontendRedirectUrl): string
    {
        return Crypt::encryptString(json_encode([
            'redirect_to' => $frontendRedirectUrl,
        ]));
    }

    private function extractRedirectUrlFromState(?string $state): ?string
    {
        if (! is_string($state) || trim($state) === '') {
            return null;
        }

        try {
            $payload = json_decode(Crypt::decryptString($state), true, 512, JSON_THROW_ON_ERROR);

            return is_array($payload) ? ($payload['redirect_to'] ?? null) : null;
        } catch (Throwable) {
            return null;
        }
    }

    private function resolveFrontendRedirectUrl(?string $candidateUrl): string
    {
        $defaultFrontendUrl = (string) config('app.frontend_url');

        if (! is_string($candidateUrl) || trim($candidateUrl) === '') {
            return $defaultFrontendUrl;
        }

        $normalizedCandidateOrigin = $this->normalizeOrigin($candidateUrl);

        if ($normalizedCandidateOrigin === null) {
            return $defaultFrontendUrl;
        }

        if (! in_array($normalizedCandidateOrigin, $this->allowedFrontendOrigins(), true)) {
            return $defaultFrontendUrl;
        }

        return $candidateUrl;
    }

    private function allowedFrontendOrigins(): array
    {
        return array_values(array_filter(array_unique([
            $this->normalizeOrigin(config('app.frontend_url')),
            $this->normalizeOrigin(env('FRONTEND_URL')),
            $this->normalizeOrigin(env('APP_FRONTEND_URL')),
        ])));
    }

    private function normalizeOrigin(?string $url): ?string
    {
        if (! is_string($url) || trim($url) === '') {
            return null;
        }

        $parts = parse_url(trim($url));

        if (! is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
            return null;
        }

        $origin = sprintf('%s://%s', $parts['scheme'], $parts['host']);

        if (isset($parts['port'])) {
            $origin .= ':' . $parts['port'];
        }

        return $origin;
    }
}
