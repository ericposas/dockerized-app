<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function store(Request $request) {
        $newtest = new Test([
            $request->username
        ]);
        // $newtest.save();
        return response()->json([
            'msg' => 'new user saved'
        ]);
    }
}
