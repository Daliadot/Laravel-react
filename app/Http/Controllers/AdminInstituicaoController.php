<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Instituicao;

class AdminInstituicaoController extends Controller
{
    // Lista todas as instituições pendentes
    public function index()
    {
        $instituicoes = Instituicao::where('status', 'pending')->get();
        return inertia('Admin/InstituicoesPendentes', [
            'instituicoes' => $instituicoes,
        ]);
    }

    // Aprova a instituição
    public function aprovar($id)
    {
        $instituicao = Instituicao::findOrFail($id);
        $instituicao->status = 'accepted';
        $instituicao->save();

        return redirect()->back()->with('success', 'Instituição aprovada com sucesso!');
    }

    // Rejeita a instituição
    public function rejeitar($id)
    {
        $instituicao = Instituicao::findOrFail($id);
        $instituicao->status = 'rejected';
        $instituicao->save();

        return redirect()->back()->with('success', 'Instituição rejeitada.');
    }
}
