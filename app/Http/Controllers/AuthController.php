<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    // === VIEWS DE LOGIN ===
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

    // === LOGIN VOLUNTÁRIO ===
    public function loginUsuario(Request $request)
    {
        $this->logoutGuards($request);

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect('/');
        }

        return back()
            ->withErrors(['email' => 'Credenciais inválidas.'])
            ->withInput();
    }

    // === LOGIN ADMIN ===
   public function loginAdmin(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (Auth::guard('admin')->attempt($credentials)) {
        $request->session()->regenerate();
        return redirect('/admin/dashboard');
    }

    return back()->withErrors(['email' => 'Credenciais inválidas.'])->withInput();
}

    // === LOGIN INSTITUIÇÃO ===
    public function loginInstituicao(Request $request)
    {
        $this->logoutGuards($request);

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('instituicao')->attempt($credentials)) {
            $request->session()->regenerate();
            return redirect('/');
        }

        return back()
            ->withErrors(['email' => 'Credenciais inválidas.'])
            ->withInput();
    }

    // === LOGOUT ===
    public function logout(Request $request)
    {
        // Checa todos os guards
        foreach (['web', 'admin', 'instituicao'] as $guard) {
            if (Auth::guard($guard)->check()) {
                Auth::guard($guard)->logout();
            }
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    // === MÉTODO PRIVADO AUXILIAR ===
    private function logoutGuards(Request $request)
    {
        foreach (['web', 'admin', 'instituicao'] as $guard) {
            if (Auth::guard($guard)->check()) {
                Auth::guard($guard)->logout();
            }
        }

        $request->session()->invalidate();
        $request->session()->regenerateToken();
    }
}
