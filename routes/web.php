<?php
use App\Http\Controllers\AdminInstituicaoController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Rota inicial
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

// Rota protegida por auth e admin
//Agrupa rotas que compartilham configurações comuns. No caso, middlewares
//O auth e admin significa que a rota só vai funcionar se ambas forem verdadeiras
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/instituicoes/pendentes', [AdminInstituicaoController::class, 'index'])->name('admin.instituicoes.pendentes');
    Route::post('/admin/instituicoes/{id}/aprovar', [AdminInstituicaoController::class, 'aprovar'])->name('admin.instituicoes.aprovar');
    Route::post('/admin/instituicoes/{id}/rejeitar', [AdminInstituicaoController::class, 'rejeitar'])->name('admin.instituicoes.rejeitar');
});

// Página Iniciativa
Route::get('/Iniciativa', function () {
    return Inertia::render('Iniciativa', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Página Ajuda
Route::get('/Ajuda', function () {
    return Inertia::render('Ajuda', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Página Home
Route::get('/Home', function () {
    return Inertia::render('Home', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Página Conta
Route::get('/Conta', function () {
    return Inertia::render('Conta', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Página Mensagens
Route::get('/Mensagens', function () {
    return Inertia::render('Mensagens', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Página Termos
Route::get('/Termos', function () {
    return Inertia::render('Termos', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Página Admin (acesso aberto neste exemplo, cuidado!)
Route::get('/Admin', function () {
    return Inertia::render('Admin', [
        'canLogin'    => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Rotas de perfil protegidas por auth
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rotas de autenticação
require __DIR__.'/auth.php';
