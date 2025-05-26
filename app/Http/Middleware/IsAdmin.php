<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
     
class IsAdmin
{
    public function handle($request, Closure $next)
    {
        // Verifica se o usuário está autenticado e é um administrador
        if (Auth::check() && Auth::user()->is_admin) {
            return $next($request);
        }
//Para virar admin tem que ir ao banco de dados no phpmyadmin e alterar o campo is_admin para 1 (true) do usuário desejado
        // Redireciona para a página de login ou outra página se não for admin
        return redirect()->route('login')->with('error', 'Acesso negado. Você não tem permissão para acessar esta área, solicite suas credenciais de Admin.');
    }
}