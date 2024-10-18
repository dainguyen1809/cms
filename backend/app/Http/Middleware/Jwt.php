<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class Jwt
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next) : Response
    {
        try {
            $token = $request->cookie('access_token');
            if ($request->hasCookie('access_token')) {
                $request->headers->set('Authorization', 'Bearer ' . $token);
            }

            if (! $token) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Token not found!'
                ]);
            }

            $user = JWTAuth::parseToken()->authenticate();

            if (! $user) {
                return response()->json([
                    'status' => 404,
                    'error' => 'Not found!',
                    'message' => 'User not found!'
                ]);
            }

        } catch (TokenExpiredException $e) {
            Log::error('TokenExpiredException: ' . $e->getMessage());
            return response()->json([
                'status' => 401,
                'error' => 'Token expired',
                'message' => "Your session has expired. Please login again."
            ]);
        } catch (JWTException $e) {
            Log::error('JWTException: ' . $e->getMessage());
            return response()->json([
                'status' => 401,
                'error' => 'Invalid token',
                'message' => 'The provided token is invalid.'
            ]);
        } catch (\Exception $e) {
            Log::error('General Exception: ' . $e->getMessage());
            return response()->json([
                'status' => 404,
                'error' => 'Not found!',
                'message' => 'Token not found'
            ]);
        }

        return $next($request);
    }
}
