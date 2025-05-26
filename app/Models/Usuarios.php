<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\HasFactory; 


class Usuarios extends Model
{
    protected $table = 'Usuarios';

    protected $fillable = [
        'nm_usuario',
        'email',
        'senha',
        'cpf',
        'imagem'
    ];
     public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = Hash::make($value);
    }
    public function formularios()
{
    return $this->hasMany(Formulario::class, 'cd_usuario');
}

}
