<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Socialite;

class AuthController extends Controller
{
    function __construct() {
    }

    public function login() {
        if(!Auth::user()){
            return view('login',[]);
        } else {
            return redirect('/');
        }  
    }

    public function google_redirect(Request $request) {
        return Socialite::driver('google')
            ->redirect();
    }

    public function google_callback(Request $request) {
        $idp_user = Socialite::driver('google')->user();

        $user = User::where('email', $idp_user->getEmail())
            ->where('idp','google')
            ->first();
        if ($user === null) {
            $user = new User();
            $user->email = $idp_user->getEmail();
        }
        $user->first_name = $idp_user->user['given_name'];
        $user->last_name = $idp_user->user['family_name'];
        $user->idp = 'google';
        $user->last_login = now();
        $user->save();
        Auth::login($user, true);

        if (isset($redirect) && $redirect !== null) {
            return redirect($redirect);
        } else {
            return redirect('/');
        }
    }

    /**
     * This initiates a logout request across all the SSO infrastructure.
     */
    public function logout(Request $request) {
        Auth::logout();
        Session::save();    
        $returnTo = $request->query('returnTo');
        $sessionIndex = $request->query('sessionIndex');
        $nameId = $request->query('nameId');
        $full_logout = true;
        return view('logout',['full_logout' => $full_logout]);
    }

    public function idps(Request $request) {
        $idps = [];
        $idps[] = ['value'=>null,'label'=>'None'];
        $idps[] = ['value'=>'google','label'=>'Google'];
        return $idps;
    }


}