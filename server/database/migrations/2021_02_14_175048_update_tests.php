<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTests extends Migration
{
        /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
             
        Schema::dropIfExists('tests');

        Schema::create('tests', function (Blueprint $table) {
            $table->string('id')->index();
            $table->string('username');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tests', function (Blueprint $table) {
            //
        });
    }
}
