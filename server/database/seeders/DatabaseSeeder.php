<?php

namespace Database\Seeders;

use \App\Models\Test;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $test = new Test;
        $test->username = 'Macaroni';
        $test->save();
        
        $test = new Test;
        $test->username = 'Jenkins';
        $test->save();
        
        $test = new Test;
        $test->username = 'Marty McFly';
        $test->save();

    }
}
