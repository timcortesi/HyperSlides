<?php 

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;


class CustomAuthentication
{
    protected $saml2;

    public function __construct(Guard $auth) {
    }

    public function handle($request, Closure $next)
    {
        if(!Auth::user()){    
            if (Route::current()->uri == '/') {
                return redirect('/login');
            } else {
                return redirect('/login?redirect='.urlencode(url()->full()));
            }
        }
        return $next($request);
    }
}
