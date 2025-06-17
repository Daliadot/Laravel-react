<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
  public function boot()
{
   Inertia::share([
    'authUser' => function () {
        if (Auth::guard('instituicao')->check()) {
            $user = Auth::guard('instituicao')->user();
            $tipo = 'instituicao';
        } elseif (Auth::guard('admin')->check()) {
            $user = Auth::guard('admin')->user();
            $tipo = 'admin';
        } elseif (Auth::guard('web')->check()) {
            $user = Auth::guard('web')->user();
            $tipo = 'voluntario';
        } elseif (Auth::check()) {
        
            $user = Auth::user();
            $tipo = 'usuario';
        } else {
            return null;
        }

        return [
            'id' => $user->id,
            'nome' => $user->nome ?? $user->name ?? '',
            'email' => $user->email,
            'tipo' => $tipo,
        ];
    }
]);
}
}
