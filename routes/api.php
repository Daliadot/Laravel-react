<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\InstituicoesController;
use App\Http\Controllers\ServicosController;
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
Route::post('/formulario',[FormularioController::class, 'store']);
Route::put('/formulario/{id}',[FormularioController::class, 'update']);
Route::delete('/formulario/{id}',[FormularioController::class, 'destroy']);
Route::get('/formulario',[FormularioController::class, 'index']);
Route::get('/formulario/{id}',[FormularioController::class, 'show']);

// API Routes Instituicoes
Route::post('/instituicoes',[InstituicoesController::class, 'store']);
Route::put('/instituicoes/{id}',[InstituicoesController::class, 'update']);
Route::delete('/instituicoes/{id}',[InstituicoesController::class, 'destroy']);
Route::get('/instituicoes',[InstituicoesController::class, 'index']);
Route::get('/instituicoes/{id}',[InstituicoesController::class, 'show']);

// API Routes Servicos
Route::post('/servicos',[ServicosController::class, 'store']);
Route::put('/servicos/{id}',[ServicosController::class, 'update']);
Route::delete('/servicos/{id}',[ServicosController::class, 'destroy']);
Route::get('/servicos',[ServicosController::class, 'index']);
Route::get('/servicos/{id}',[ServicosController::class, 'show']);

// API Routes Usuarios
Route::post('/usuarios',[UsuariosController::class, 'store']);
Route::put('/usuarios/{id}',[UsuariosController::class, 'update']);
Route::delete('/usuarios/{id}',[UsuariosController::class, 'destroy']);
Route::get('/usuarios',[UsuariosController::class, 'index']);
Route::get('/usuarios/{id}',[UsuariosController::class, 'show']); 