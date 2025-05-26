<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; 


class Formulario extends Model
{
    use HasFactory;

    protected $table = 'formularios';

    protected $fillable = [
        'cd_usuario',
        'cd_instituicao',
        'dados',
        'status',
    ];

    protected $casts = [
        'dados' => 'array',
    ];

    public function usuarios()
    {
        return $this->belongsTo(Usuarios::class);
    }
    public function instituicao()
    {
        return $this->belongsTo(instituicoes::class);
    }
}