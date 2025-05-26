<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    public function handle($request, Closure $next)
    {
        // Verifica se o usuário está autenticado
        if (!Auth::check()) {
            // Usuário não está logado
            return redirect()->route('login')->with('error', 'Você precisa estar logado para acessar esta página.');
        }

        // Verifica se o usuário é administrador
        if (!Auth::user()->is_admin) {
            // Usuário logado, mas não é admin
            return redirect('/')->with('error', 'Acesso negado. Você não é um administrador.');
        }

        // Se passou nas duas verificações, deixa continuar
        return $next($request);
    }
}
