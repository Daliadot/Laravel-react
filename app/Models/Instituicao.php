<?php
namespace App\Models;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Instituicao extends Authenticatable implements JWTSubject
{
    protected $table = 'instituicoes'; // nome correto da tabela no plural

    protected $fillable = [
        'nm_instituicao',
        'email',
        'password',
        'cep',
        'rua',
        'numero',
        'bairro',
        'cidade',
        'telefone',
        'descricao',
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
