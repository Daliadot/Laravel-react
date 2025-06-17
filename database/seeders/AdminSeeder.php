<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('admins')->insert([
            'nome'     => 'gabriel',
            'email'    => 'gabriel@gmail.com',
            'password' => Hash::make('123456'), 
        ]);

          DB::table('admins')->insert([
            'nome'     => 'gabriella',
            'email'    => 'gabriella@gmail.com',
            'password' => Hash::make('123456'), 
        ]);

          DB::table('admins')->insert([
            'nome'     => 'miguel',
            'email'    => 'miguel@gmail.com',
            'password' => Hash::make('123456'), 
        ]);

          DB::table('admins')->insert([
            'nome'     => 'santiago',
            'email'    => 'santiago@gmail.com',
            'password' => Hash::make('123456'), 
        ]);

          DB::table('admins')->insert([
            'nome'     => 'ana',
            'email'    => 'ana@gmail.com',
            'password' => Hash::make('123456'), 
        ]);

          DB::table('admins')->insert([
            'nome'     => 'arthur',
            'email'    => 'arthur@gmail.com',
            'password' => Hash::make('123456'), 
        ]);
    }
}

