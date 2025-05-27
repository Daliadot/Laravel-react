<?php
//esse código é responsável pela autenticação de usuários pelo breeze
//ele exibe a tela de login, processa o login e logout dos usuários
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        //renderiza a view de login usando Inertia
        //verifica se a rota de reset de senha existe
        //e passa o status da sessão, se houver
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        //valida os dados de login usando o LoginRequest
        //autentica o usuário e regenera a sessão
        $request->authenticate();

        $request->session()->regenerate();
//verifica se o usuário é um administrador
/*
        if (Auth::user()->is_admin) {
            //se for, redireciona para a rota de dashboard do admin
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }
        //se não for, redireciona para a rota de dashboard do usuário
        if (Auth::user()->is_admin === null) {
            //se o campo is_admin for nulo, redireciona para a rota de dashboard do usuário
            return redirect()->intended(route('dashboard', absolute: false));
        }
            */
        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        //destrói a sessão autenticada do usuário
        Auth::guard('web')->logout();
//invalida a seção
        $request->session()->invalidate();

        //previne a falsificação de requisição de sites
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
