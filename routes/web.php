<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//algumas rotas de autenticação foram comentadas para fazer os botoes do 
// AdminDashboard funcionarem, mas só descomentar quando tiver tudo pronto
// na parte de autenticação

// Páginas públicas
Route::get('/', fn() => Inertia::render('Welcome'));
Route::get('/CadastroVoluntario', fn() => Inertia::render('User/CadastroVoluntario'));
Route::get('/CadastroInstituicao', fn() => Inertia::render('Ong/CadastroInstituicao'));
Route::get('/admin', fn() => Inertia::render('Admin'));
 Route::get('/instituicao/edit',fn() => Inertia::render('Ong/ONGedit'));

// Login voluntário
Route::get('/login/voluntario', [AuthController::class, 'indexUsuario'])->name('login.voluntario');
Route::post('/login/voluntario', [AuthController::class, 'loginUsuario'])->name('auth.voluntario');

// Login admin
Route::get('/login/admin', [AuthController::class, 'indexAdmin'])->name('login.admin');
// Route::post('/login/admin', [AuthController::class, 'loginAdmin'])->name('auth.admin');

// Login instituição
Route::get('/login/instituicao', [AuthController::class, 'indexInstituicao'])->name('login.instituicao');
Route::post('/login/instituicao', [AuthController::class, 'loginInstituicao'])->name('auth.instituicao');

// ✅ Logout compartilhado para qualquer guard
Route::post('/logout', [AuthController::class, 'logout'])->middleware('web')->name('logout');

// Painel voluntário
Route::middleware(['web', 'auth:web'])->group(function () {
    Route::get('/dashboard', fn() => 'Dashboard Voluntário')->name('dashboard');
});

// Painel admin
// Route::middleware(['web', 'auth:admin'])->group(function () {
    Route::get('/admin/dashboard', fn() => Inertia::render('AdminDashboard'))->name('admin.dashboard');
// });

// Painel instituição
Route::middleware(['web', 'auth:instituicao'])->group(function () {
    Route::get('/instituicao/dashboard', fn() => 'Dashboard Instituição')->name('instituicao.dashboard');
   

});


// Perfil comum a todos os tipos de usuário autenticado
Route::middleware('web')->get('/perfil', function () {
    if (Auth::guard('web')->check()) {
        $user = Auth::guard('web')->user();
        $tipo = 'usuario';
    } elseif (Auth::guard('instituicao')->check()) {
        $user = Auth::guard('instituicao')->user();
        $tipo = 'instituicao';
    } elseif (Auth::guard('admin')->check()) {
        $user = Auth::guard('admin')->user();
        $tipo = 'admin';
    } else {
        return redirect('/')->with('error', 'Acesso não autorizado.');
    }

    return Inertia::render('Conta', [
        'user' => [
            'nome' => $user->nome ?? $user->nm_instituicao ?? $user->name ?? 'Nome não encontrado',
            'email' => $user->email ?? 'Email não encontrado',
            'tipo' => $tipo,
        ]
    ]);
})->name('perfil');
