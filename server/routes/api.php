<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Models\Test;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::post('/test', function (Request $request) {
    $test = new Test([
        'username' => $request->username
    ]);
    $test->save();
    return response()->json([
        'msg' => 'user created!'
    ]);
});

Route::get('/dbdata', function (Request $request) {
    $all_tests = Test::all();
    return response()->json($all_tests);
});


Route::get('/somedata', function (Request $request) {
    return response()->json([
        'employees' => [
            [
                'name' => 'Emily Schoel',
                'organization' => 'TM advertising'
            ],
            [
                'name' => 'Stacy Bennett',
                'organization' => 'TM advertising'
            ],
        ]
    ]);
});
