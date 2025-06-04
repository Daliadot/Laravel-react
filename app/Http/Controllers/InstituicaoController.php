<?php

namespace App\Http\Controllers;

use App\Models\Instituicao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule; // importa Rule para validação de status

class InstituicaoController extends Controller
{
    public function index()
    {
        $regInstituicao = Instituicao::all();
        return response()->json($regInstituicao);
    }

    public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'nm_instituicao' => 'required|string|max:255',
        'email' => 'required|email|unique:instituicoes,email',
        'password' => 'required|min:6',
        'cnpj' => 'nullable|string',
        'cep' => 'required',
        'rua' => 'required',
        'numero' => 'required',
        'bairro' => 'required',
        'cidade' => 'required',
        'telefone' => 'required',
        'descricao' => 'required',
        'imagem' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'message' => 'Registros inválidos',
            'errors' => $validator->errors()
        ], 400);
    }

    $registro = Instituicao::create([
        'nm_instituicao' => $request->nm_instituicao,
        'email' => $request->email,
        'password' => Hash::make($request->password), // Criptografa corretamente
        'cnpj' => $request->cnpj,
        'cep' => $request->cep,
        'rua' => $request->rua,
        'numero' => $request->numero,
        'bairro' => $request->bairro,
        'cidade' => $request->cidade,
        'telefone' => $request->telefone,
        'descricao' => $request->descricao,
        'imagem' => $request->imagem,
        'status' => 'pendente', // Define o status inicial como 'pendente'
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Instituição cadastrada com sucesso',
        'data' => $registro
    ], 201);
}

    public function show($id)
    {
        return Instituicao::with('formularios.usuarios')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', Rule::in(['pendente', 'aceito', 'rejeitado'])],
        ]);

        $instituicao = Instituicao::findOrFail($id);
        $instituicao->status = $request->status;
        $instituicao->save();

        return response()->json([
            'success' => true,
            'instituicao' => $instituicao
        ], 200);
    }

    public function destroy($id)
    {
        $registro = Instituicao::find($id);
        if (!$registro) {
            return response()->json([
                'success' => false,
                'message' => 'Instituição não encontrada'
            ], 404);
        }

        $registro->delete();

        return response()->json([
            'success' => true,
            'message' => 'Instituição excluída com sucesso'
        ], 200);
    }
}
