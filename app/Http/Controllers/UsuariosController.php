<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;

class UsuariosController extends Controller
{
    public function index()
    {
        $regUsuarios = Usuarios::all();
        return response()->json($regUsuarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|unique:Usuarios,email',
            'password' => 'required|min:6',
            'cpf' => ['required', 'regex:/^\d{11}$/'],
            'imagem' => 'nullable|image|max:2048',
        ]);

        // Salva a imagem se enviada
        $imagemPath = null;
        if ($request->hasFile('imagem')) {
            $imagemPath = $request->file('imagem')->store('usuarios', 'public');
        }

        Usuarios::create([
            'nome' => $request->nome,
            'email' => $request->email,
            'password' => Hash::make($request->password), // ← Aqui a password é criptografada corretamente
            'cpf' => $request->cpf,
            'imagem' => $imagemPath,
        ]);

        return redirect('/'); // Redireciona para a página Welcome
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $Usuarios = Usuarios::find($id);

        if ($Usuarios) {
            return response()->json([
                'success' => true,
                'message' => 'Usuário encontrado',
                'data' => $Usuarios
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Usuário não encontrado'
        ], 404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Usuarios = Usuarios::find($id);

        if (!$Usuarios) {
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'cpf' => ['required', 'regex:/^\d{11}$/']
        ]);

        $Usuarios->update([
            'nome' => $request->nome,
            'email' => $request->email,
            'password' => Hash::make($request->password), // ← Criptografa a nova password
            'cpf' => $request->cpf
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Usuário atualizado com sucesso',
            'data' => $Usuarios
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $Usuarios = Usuarios::find($id);

        if (!$Usuarios) {
            return response()->json([
                'success' => false,
                'message' => 'Usuário não encontrado'
            ], 404);
        }

        $Usuarios->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuário deletado com sucesso'
        ]);
    }
}
