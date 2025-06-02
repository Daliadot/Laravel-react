<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

class Admin extends Authenticatable
{
    protected $table = 'Admins';

    protected $fillable = [
        'NM_admin',
        'email',
        'password',
    ];

    /**
     * Criptografa a senha automaticamente ao ser definida.
     */
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}
