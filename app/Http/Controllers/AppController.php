<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Library;
use App\User;
use App\Team;
use App\Scenario;

class AppController extends Controller
{
    public function __construct() {
    }

    public function home(Request $request) {
        return view('home',['user'=>Auth::user()]);
    }

}
