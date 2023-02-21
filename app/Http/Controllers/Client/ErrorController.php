<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ErrorController extends Controller
{
    public function serverError()
    {
        return view('error.500');
    }

    public function PageNotFound()
    {
        return view('error.404');
    }

    public function AccessDenied()
    {
        return view('error.403');
    }
}
