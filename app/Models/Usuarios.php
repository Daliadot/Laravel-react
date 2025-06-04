<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Usuarios extends Authenticatable
{
    use HasFactory;

    protected $table = 'usuarios';

    protected $fillable = [
        'nome',
        'email',
        'password',
        'cpf',
        'imagem',
    ];



 public function getAuthPassword()
{
    return $this->password;
}


    public function formularios()
    {
        return $this->hasMany(Formulario::class, 'cd_usuario');
    }
}
