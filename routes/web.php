<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', [AuthController::class, 'login']);
Route::get('/idp/google', [AuthController::class, 'google_redirect']);
Route::get('/idp/google/callback', [AuthController::class, 'google_callback']);
Route::get('/logout', [AuthController::class, 'logout']);

Route::group(['middleware'=>['custom.auth']], function () use ($router) {
    Route::get('/', [AppController::class, 'home']);
    Route::get('/deck', function () {
        return view('welcome');
    });
});

Route::group(['prefix' => 'api','middleware'=>['no.save.session']], function () use ($router) {
});