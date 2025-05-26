<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Instituicoes extends Model
{
    protected $table = 'Instituicoes';

    protected $fillable = [
        'nm_instituicao',
        'email_instituicao',
        'senha',
        'descricao',
        'endereco_instituicao',
        'telefone',
        'imagem',
    ];
         public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = Hash::make($value);
    }
    public function formularios()
{
    return $this->hasMany(Formulario::class);
}

} 