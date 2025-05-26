<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class Admin extends Model
{
    protected $table = 'Admins';

    protected $fillable = [
        'NM_admin',
        'email',
        'senha',
    ];

    /**
     * Criptografa a senha automaticamente ao salvar.
     */
    public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = Hash::make($value);
    }
}