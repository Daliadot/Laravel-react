<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\Instituicao;

class AuthController extends Controller
{
    public function indexUsuario()
    {
        return Inertia::render('User/LoginVoluntario');
    }

    public function indexAdmin()
    {
        return Inertia::render('Admin');
    }

    public function indexInstituicao()
    {
        return Inertia::render('ONG/LoginIniciativa');
    }

    // ✅ Login com JWT da INSTITUIÇÃO
    public function loginInstituicao(Request $request)
  
{
    $credentials = $request->only('email', 'password');

    if (!$token = auth()->attempt($credentials)) {
        return response()->json(['error' => 'Credenciais inválidas'], 401);
    }

    return response()->json([
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => auth()->factory()->getTTL() * 60
    ]);
}

    // ✅ Retornar dados da instituição autenticada
    public function meInstituicao()
    {
        return response()->json(auth()->user());
    }

    // ✅ Logout da INSTITUIÇÃO (invalida o token)
    public function logoutInstituicao()
    {
        try {
            auth()->logout();
            return response()->json(['message' => 'Logout feito com sucesso']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Erro ao deslogar'], 500);
        }
    }

    // Opcional: mantém os outros logins com sessão
    public function loginUsuario(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect('/');
        }

        return back()->withErrors(['password' => 'Credenciais inválidas'])->withInput();
    }

    public function loginAdmin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('admin')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors(['password' => 'Credenciais inválidas'])->withInput();
    }

    public function logout(Request $request)
    {
        if (Auth::guard('admin')->check()) {
            Auth::guard('admin')->logout();
        } elseif (Auth::guard('instituicao')->check()) {
            Auth::guard('instituicao')->logout();
        } else {
            Auth::guard('web')->logout();
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
