<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\AuthRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function __construct(){
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

        // set cookie
        $cookie = Cookie::make('access_token', $token, Auth::factory()->getTTL() * 1);

        return $this->respondWithToken($token, $user)->withCookie($cookie);
    }



    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'access_token' => $token,
            'user' => new UserResource($user),
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }

}
