<?php
namespace App\Models;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Instituicao extends Authenticatable implements JWTSubject
{
    protected $table = 'Instituicoes'; // nome correto da tabela no plural

    protected $fillable = [
        'nm_instituicao',
        'email',
        'password',
        'cnpj',
        'cep',
        'rua',
        'numero',
        'bairro',
        'cidade',
        'telefone',
        'descricao',
        'imagem',
        'status', // Adiciona o campo status

    ];
      public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    } 

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
