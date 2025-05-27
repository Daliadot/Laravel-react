<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        // Verifica se o usuário já verificou o email
        // Se já tiver verificado, redireciona para a dashboard com o parâmetro 'verified=1'
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
        }
        // Marca o email do usuário como verificado
        // Se o usuário ainda não tiver verificado, marca o email como verificado
        // e dispara o evento Verified
        // Isso pode ser usado para enviar notificações ou realizar outras ações
        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return redirect()->intended(route('dashboard', absolute: false).'?verified=1');
    }
}
