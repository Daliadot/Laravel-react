<?php

namespace App\Http\Controllers;

use App\Models\Servicos;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class ServicosController extends Controller
{
    /**
     * funcionando
     */
    public function index()
    {
        $regServicos = servicos::All();
        $contador = $regServicos->count();
        return Response()->json($regServicos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // descricao horas_sevico
        $validator = Validator::make($request->all(), [
            'descricao' => 'required',
            'horas_servico' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'registros inválidos',
                'errors' => $validator->errors()
            ], 400);
        }
        $registros = servicos::create($request->all());

        if ($registros) {
            return response()->json([
                'success' => true,
                'message' => 'Serviço cadastrado com sucesso',
                'data' => $registros
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'erro ao cadastrar o serviço'
            ], 500);
        }   
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $regServicos = servicos::find($id);

        if ($regServicos) {
            return response()->json([
                'success' => true,
                'message' => 'serviço encontrado',
                'data' => $regServicos
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'serviço não encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'descricao' => 'required',
            'horas_servico' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'registros inválidos',
                'errors' => $validator->errors()
            ], 400);
        }
        $regServicosBanco = servicos::find($id);
        if (!$regServicosBanco) {
            return response()->json([
                'success' => false,
                'message' => 'serviço não encontrado'
            ], 404);
        }

        $regServicosBanco->descricao = $request->descricao;
        $regServicosBanco->horas_servico = $request->horas_servico;

        if ($regServicosBanco->save()) {
            return response()->json([
                'success' => true,
                'message' => 'serviço atualizado com sucesso',
                'data' => $regServicosBanco
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'erro ao atualizar o serviço'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $regServicos = servicos::find($id);
        if (!$regServicos) {
            return response()->json([
                'success' => false,
                'message' => 'serviço não encontrado'
            ], 404);
        }
        if ($regServicos->delete()) {
            return response()->json([
                'success' => true,
                'message' => 'serviço excluído com sucesso'
            ], 200);
        }
    }
}
