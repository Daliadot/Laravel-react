<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class InstituicoesSeeder extends Seeder
{
    public function run()
    {
        DB::table('instituicoes')->insert([
            [
                'nome' => 'Instituição Alpha',
                'email' => 'contato@alpha.org',
                'password' => Hash::make('senha123'),
                'cnpj' => '12.345.678/0001-90',
                'cep' => '12345-678',
                'rua' => 'Rua das Flores',
                'numero' => '100',
                'bairro' => 'Centro',
                'cidade' => 'São Paulo',
                'telefone' => '(11) 91234-5678',
                'descricao' => 'Instituição voltada para educação.',
                'imagem' => 'alpha.png',
            ],
            [
                'nome' => 'Instituição Beta',
                'email' => 'beta@instituicao.com',
                'password' => Hash::make('senha123'),
                'cnpj' => '98.765.432/0001-10',
                'cep' => '87654-321',
                'rua' => 'Avenida Brasil',
                'numero' => '200',
                'bairro' => 'Bela Vista',
                'cidade' => 'Rio de Janeiro',
                'telefone' => '(21) 92345-6789',
                'descricao' => 'Organização de apoio social.',
                'imagem' => 'beta.jpg',
    
            ],
            // Adicione mais registros conforme necessário
        ]);
    }
}
