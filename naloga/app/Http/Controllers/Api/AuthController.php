<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Registracija novega uporabnika
    public function signup(SignupRequest $request)
    {
        // Preveri in validira podatke iz zahteve
        $data = $request->validated();
        /** @var \App\Models\User $user */
        // Ustvari novega uporabnika v bazi podatkov
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        // Ustvari žeton za uporabnika in vrne odgovor s podatki o uporabniku in žetonu
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

    // Prijava uporabnika
    public function login(LoginRequest $request)
    {
        // Preveri in validira prijavne podatke iz zahteve
        $credentials = $request->validated();
        // Preveri, ali so prijavni podatki veljavni
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect'
            ], 422);
        }

        /** @var \App\Models\User $user */
        // Pridobi trenutno prijavljenega uporabnika
        $user = Auth::user();
        // Ustvari žeton za uporabnika in ga vrne skupaj z uporabnikom
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }

     // Odjava uporabnika
    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        // Pridobi trenutno prijavljenega uporabnika
        $user = $request->user();
        // Izbriše trenutni žeton uporabnika
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
