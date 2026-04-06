<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureFrontendOrigin
{
    public function handle(Request $request, Closure $next): Response
    {
        $allowedOrigins = array_values(array_filter([
            $this->normalizeOrigin(config('app.frontend_url')),
            $this->normalizeOrigin(env('FRONTEND_URL')),
            $this->normalizeOrigin(env('APP_FRONTEND_URL')),
        ]));

        $requestOrigin = $this->normalizeOrigin(
            $request->headers->get('origin') ?: $request->headers->get('referer')
        );

        if ($requestOrigin === null || ! in_array($requestOrigin, $allowedOrigins, true)) {
            abort(403, 'Invalid request origin.');
        }

        return $next($request);
    }

    private function normalizeOrigin(?string $value): ?string
    {
        if (! is_string($value) || trim($value) === '') {
            return null;
        }

        $trimmedValue = rtrim(trim($value), '/');
        $parts = parse_url($trimmedValue);

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