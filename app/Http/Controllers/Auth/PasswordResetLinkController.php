<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    //redireciona a view esqueci a senha
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);
//pede o email do user para enviarem a senha de reset
        // We will send the password reset link to this user. Once we have attempted
        // to send the link, we will examine the response then see the message we
        // need to show to the user. Finally, we'll send out a proper response.

       // A função sendResetLink envia o link de reset de senha para o email do usuário
        $status = Password::sendResetLink(
            $request->only('email')
        );
//se o status for igual a Password::RESET_LINK_SENT, significa que o link foi enviado com sucesso
        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', __($status));
        }
// Se o status não for igual a Password::RESET_LINK_SENT, significa que houve um erro ao enviar o link
        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
