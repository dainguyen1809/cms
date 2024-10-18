<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRequest;
use App\Http\Resources\UserResource;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(AuthRequest $request)
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        if (! $token = auth()->attempt($credentials)) {
            return response()->json([
                'message' => 'Tên đăng nhập hoặc mật khẩu không đúng'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = auth()->user();
        $this->logUserLogin($user);

        // set cookie
        $cookie = Cookie::make('access_token', $token, Auth::factory()->getTTL() * 60 * 24);

        return $this->respondWithToken($token, $user)->withCookie($cookie);
    }

    public function profile()
    {
        return response()->json([
            'staus' => 200,
            'user' => new UserResource(auth()->user()),
            'message' => 'User information retrieved successfully',
            'expires_in' => Auth::factory()->getTTL() * 1,
        ]);
    }


    private function logUserLogin()
    {
        Log::info('User logged in successfully.', [
            'user_id' => auth()->user()->id,
            'email' => auth()->user()->email,
            'ip' => request()->ip(),
            'timestamp' => now(),
        ]);
    }

    protected function respondWithToken($token, $user)
    {
        $expiresAt = Carbon::now('Asia/Ho_Chi_Minh')->addMinutes(Auth::factory()->getTTL() * 1);
        return response()->json([
            'access_token' => $token,
            'user' => new UserResource($user),
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() . ' minutes',
            'expires_at' => $expiresAt->toDateTimeString(),
        ]);
    }

}
