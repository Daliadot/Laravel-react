<?php

namespace App\Http\Controllers;

use App\Models\admin;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    /**
     * funcionando
     */
    public function index()
    {
        $regadmin = admin::All();
        $contador = $regadmin->count();
        return Response()->json($regadmin);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'registros inválidos',
                'errors' => $validator->errors()
            ], 400);
        }

        $registros = admin::create($request->all());

        if ($registros) {
            return response()->json([
                'success' => true,
                'message' => 'admin cadastrado com sucesso',
                'data' => $registros
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'erro ao cadastrar o admin'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $regadmin = admin::find($id);

        if ($regadmin) {
            return response()->json([
                'success' => true,
                'message' => 'admin encontrado',
                'data' => $regadmin
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'admin não encontrado'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required',
            'email' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'registros inválidos',
                'errors' => $validator->errors()
            ], 400);
        }

        $regadminBanco = admin::find($id);

        if (!$regadminBanco) {
            return respone()->json([
                'success' => false,
                'message' => 'admin não encontrado',
            ], 404);
        }

        $regadminBanco->nome = $request->nome;
        $regadminBanco->email = $request->email;
        $regadminBanco->email = $request->email;

        if ($regadminBanco->save()) {
            return response()->json([
                'success' => true,
                'message' => 'admin atualizado com sucesso',
                'data' => $regadminBanco
            ], 201);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'erro ao atualizar o admin'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $regadmin = admin::find($id);
        if (!$regadmin) {
            return response()->json([
                'success' => false,
                'message' => 'admin não encontrado'
            ], 404);
        }
            if ($regadmin->delete()) {
                return response()->json([
                    'success' => true,
                    'message' => 'admin deletado com sucesso'
                ], 200);
            }
        }
}
    