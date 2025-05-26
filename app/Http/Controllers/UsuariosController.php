<?php

namespace App\Http\Controllers;

use App\Models\Usuarios;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class UsuariosController extends Controller
{
  /*funcionando*/
    public function index()
    {
        $regUsuarios = usuarios::All();
        $contador = $regUsuarios->count();
        return Response()->json($regUsuarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //nm_usuario email senha cpf
        $validator = Validator::make($request->all(), [
            'nm_usuario' => 'required',
            'email' => 'required',
            'senha' => 'required',
            'cpf' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'registros inválidos',
                'errors' => $validator->errors()
            ], 400);
        }

        $registros = usuarios::create($request->all());
        if ($registros) {
            return response()->json([
                'success' => true,
                'message' => 'Usuário cadastrado com sucesso',
                'data' => $registros
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'erro ao cadastrar o usuário'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $regUsuarios = usuarios::find($id);

        if ($regUsuarios) {
            return response()->json([
                'success' => true,
                'message' => 'usuario encontrado',
                'data' => $regUsuarios
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'usuario não encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nm_usuario' => 'required',
            'email' => 'required',
            'senha' => 'required',
            'cpf' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'registros inválidos',
                'errors' => $validator->errors()
            ], 400);
        }
        $regUsuariosBanco = usuarios::find($id);

        if (!$regUsuariosBanco) {
            return response()->json([
                'success' => false,
                'message' => 'usuario não encontrado'
            ], 404);
        }
        $regUsuariosBanco->nm_usuario = $request->nm_usuario;
        $regUsuariosBanco->email = $request->email;
        $regUsuariosBanco->senha = $request->senha;
        $regUsuariosBanco->cpf = $request->cpf;

        if ($regUsuariosBanco->save()) {
            return response()->json([
                'success' => true,
                'message' => 'usuario atualizado com sucesso',
                'data' => $regUsuariosBanco
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'erro ao atualizar o usuario'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $regUsuarios = usuarios::find($id);

        if (!$regUsuarios) {
            return response()->json([
                'success' => false,
                'message' => 'usuario não encontrado'
            ], 404);
        }
            if ($regUsuarios->delete()) {
                return response()->json([
                    'success' => true,
                    'message' => 'usuario deletado com sucesso'
                ], 200);
            }
        
    }
}
