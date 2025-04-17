<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\AuthResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(AuthRequest $auth_request)
    {
        $user = User::create($auth_request->validated());
        Auth::login($user);

        return response()->json(new AuthResource($user));
    }

    public function login(AuthRequest $auth_request)
    {
        $user = $auth_request->validated();
        if(!Auth::attempt($user)){
            throw ValidationException::withMessages([
                'email' => 'You provided Credentials not matched'
            ]);
        }

        $user = Auth::user();

        if (!$user instanceof \App\Models\User) {
            return response()->json(['message' => 'Authentication failed'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json(
            [
                'message' => 'Login Successfully',
                'token' => $token,
                'user' => new AuthResource($user)
            ]);

    }

    public function logout()
    {dd(request()->all());
        Auth::logout();

        return response()->json([
            'message' => 'User Logout successfully'
        ], 200);
    }
}
