<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicos extends Model
{
    protected $fillable = [
        'descricao',
        'horas_servico',
    ];
}