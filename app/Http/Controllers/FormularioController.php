<?php

namespace App\Http\Controllers;

use App\Models\Formulario;
use Illuminate\Http\Request;
use App\Enums\FormularioStatus;
use Illuminate\Support\Facades\Mail;
use App\Mail\ConfirmacaoInscricao;


class FormularioController extends Controller
{
public function store(Request $request)
{
    //Pega os dados do request e valida
    $validated = $request->validate([
        'cd_usuario' => 'required|exists:usuarios,id',
        'cd_instituicao' => 'required|exists:instituicoes,id',
        'dados' => 'required|array',
    ]);

try {
    // Verifica se o usuário já possui um formulário pendente
    $formulario = Formulario::create(array_merge(
        $validated,
        ['status' => FormularioStatus::PENDENTE]
    ));

    return response()->json($formulario, 201);
    // Se o formulário for criado com sucesso, retorna o objeto JSON do formulário
} catch (\Exception $e) {
    
    return response()->json([
        'erro' => true,
        'mensagem' => $e->getMessage()
    ], 500);
}
}


    public function atualizarStatus(Request $request, Formulario $formulario)
    {
        // Verifica se o usuário é um administrador
        $validated = $request->validate([
            'status' => 'required|in:aceito,recusado',
        ]);
// Verifica se o status é válido
        $formulario->update([
            'status' => $validated['status']
        ]);

        // Enviar mensagem de confirmação se aceito
        if ($validated['status'] === FormularioStatus::ACEITO->value) {
            Mail::to($formulario->usuario->email)->send(new ConfirmacaoInscricao());
        }

        return response()->json(['mensagem' => 'Status atualizado com sucesso.']);
    }
    // Listar todos os formulários pendentes
     
    

    public function listarPorInstituicao($instituicaoId)
    {
        return Formulario::where('cd_instituicao', $instituicaoId)
                         ->with('usuario')
                         ->get();
    }
}
