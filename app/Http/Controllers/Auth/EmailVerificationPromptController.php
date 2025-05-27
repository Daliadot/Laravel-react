<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    // o invoke transforma a classe em uma função que pode ser chamada diretamente
    public function __invoke(Request $request): RedirectResponse|Response
    {
        //confere se o user verificou o email se sim a segunda linha a redireciona para a dashboard
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('dashboard', absolute: false))
                  // se não redireciona a view de verificar email
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
