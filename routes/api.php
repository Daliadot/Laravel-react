
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\FormularioController;
use App\Http\Controllers\InstituicaoController;
use App\Http\Controllers\UsuariosController;

//quando alguém acessar GET /user, o método index do InstituicaoController será chamado.



// Rota protegida que retorna o usuário autenticado (exemplo)
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::options('/{any}', function () {
    return response()->json([], 204);
})->where('any', '.*');

// Rotas Admin protegidas por JWT
// Route::middleware('auth:api')->group(function () {
    Route::post('/admin',[AdminController::class, 'store']);
    Route::put('/admin/{id}',[AdminController::class,'update']);
    Route::delete('/admin/{id}',[AdminController::class,'destroy']);
    Route::get('/admin',[AdminController::class,'index']);
    Route::get('/admin/{id}',[AdminController::class,'show']);
// });

// Rotas Formulario protegidas (exemplo)
Route::post('/formularios', [FormularioController::class, 'store']);
Route::middleware('auth:api')->group(function () {
    Route::patch('/formularios/{formulario}/status', [FormularioController::class, 'atualizarStatus'])->name('formularios.status');
    Route::get('/Instituicao/{id}/formularios', [FormularioController::class, 'listarPorInstituicao'])->name('Instituicao.formularios');
});

// Rotas Instituicao protegidas
Route::post('/Instituicao',[InstituicaoController::class, 'store']);
Route::get('/Instituicao',[InstituicaoController::class, 'index']);
Route::get('/Instituicao/{id}',[InstituicaoController::class, 'show']);
// Route::middleware('auth:api')->group(function () {
    Route::put('/Instituicao/{id}',[InstituicaoController::class, 'update']);
    Route::delete('/Instituicao/{id}',[InstituicaoController::class, 'destroy']);
// });

// Rotas Usuarios protegidas
Route::get('/usuarios',[UsuariosController::class, 'index']);
 Route::post('/usuarios',[UsuariosController::class, 'store']);
Route::middleware('auth:api')->group(function () {
    Route::put('/usuarios/{id}',[UsuariosController::class, 'update']);
    Route::delete('/usuarios/{id}',[UsuariosController::class, 'destroy']);
    Route::get('/usuarios/{id}',[UsuariosController::class, 'show']);
});

