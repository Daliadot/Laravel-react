<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        //A função update é chamada para atualizar a senha do usuário autenticado.
        $validated = $request->validate([
            // 'current_password' é validado para garantir que o usuário forneça a senha atual corretamente.o    
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);
//Atualiza o banco e usa o hash parea criptografar a senha nova
        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
