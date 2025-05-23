<?php

namespace App\Http\Controllers;

use App\Models\Formulario;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class FormularioController extends Controller
{
    /**
     * funcionando
     */
    public function index()
    {
        $regFormulario = formulario::All();
        $contador = $regFormulario->count();
        return Response()->json($regFormulario);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'registros inválidos',
                'errors' => $validator->errors()
            ], 400);
        }

        $registros = formulario::create($request->all());

        if ($registros) {
            return response()->json([
                'success' => true,
                'message' => 'formulario cadastrado com sucesso',
                'data' => $registros
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'erro ao cadastrar o formulario'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $regFormulario = formulario::find($id);

        if ($regFormulario) {
            return response()->json([
                'success' => true,
                'message' => 'formulario encontrado',
                'data' => $regFormulario
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'formulario não encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'registros inválidos',
                'errors' => $validator->errors()
            ], 400);
        }

        $regFormularioBanco = formulario::find($id);

        if (!$regFormularioBanco) {
            return respone()->json([
                'success' => false,
                'message' => 'formulario não encontrado',
            ], 404);
        }

        $regFormularioBanco->status = $request->status;

        if ($regFormularioBanco->save()) {
            return response()->json([
                'success' => true,
                'message' => 'formulario atualizado com sucesso',
                'data' => $regFormularioBanco
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'erro ao atualizar o formulario'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $regFormulario = formulario::find($id);
        if (!$regFormulario) {
            return response()->json([
                'success' => false,
                'message' => 'formulario não encontrado'
            ], 404);
        }
            if ($regFormulario->delete()) {
                return response()->json([
                    'success' => true,
                    'message' => 'formulario deletado com sucesso'
                ], 200);
            }
        }
}
    