<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\InstituicoesController;
use App\Http\Controllers\UsuariosController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API Routes Admin
Route::post('/admin',[AdminController::class, 'store']);
Route::put('/admin/{id}',[AdminController::class,'update']);
Route::delete('/admin/{id}',[AdminController::class,'destroy']);
Route::get('/admin',[AdminController::class,'index']);
Route::get('/admin/{id}',[AdminController::class,'show']);

// API Routes Formulario

// Enviar novo formulário para uma instituição
Route::post('/formularios', [FormularioController::class, 'store']);

Route::patch('/formularios/{formulario}/status', [FormularioController::class, 'atualizarStatus'])->name('formularios.status');

// Ver todos os formulários recebidos por uma instituição
Route::get('/instituicoes/{id}/formularios', [FormularioController::class, 'listarPorInstituicao'])->name('instituicoes.formularios');


// API Routes Instituicoes
Route::post('/instituicoes',[InstituicoesController::class, 'store']);
Route::put('/instituicoes/{id}',[InstituicoesController::class, 'update']);
Route::delete('/instituicoes/{id}',[InstituicoesController::class, 'destroy']);
Route::get('/instituicoes',[InstituicoesController::class, 'index']);
Route::get('/instituicoes/{id}',[InstituicoesController::class, 'show']);

// API Routes Usuarios
Route::post('/usuarios',[UsuariosController::class, 'store']);
Route::put('/usuarios/{id}',[UsuariosController::class, 'update']);
Route::delete('/usuarios/{id}',[UsuariosController::class, 'destroy']);
Route::get('/usuarios',[UsuariosController::class, 'index']);
Route::get('/usuarios/{id}',[UsuariosController::class, 'show']); 