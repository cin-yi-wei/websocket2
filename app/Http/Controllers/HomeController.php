<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Redis;
class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
     /*
    public function index()
    {

        return view('home');
    }
*/
public function store(Request $request)
{




  //return $request::all();
  //return view('home', compact('request'));
    /*
    if ($poll->save()) {
        return response()->json(array(
            'status' => 1
            'msg' => 'ok',
        ));
    } else {
        return Redirect::back()->withInput()->withErrors('保存失败！');
    }*/
}




    public function index(Request $request)
{

  Redis::set('name', 'Taylor');
  $aaa=Redis::get('name');

    $user = $request->user();
    $token = sha1($user->id . '|' . $user->email. '|' .$user->name);
    $name=$user->name;
    $alltoken=User::all();
    /*
    $alluser=$request->user();
    $alltoken=sha1()*/
    return view('home', compact('token','alltoken','name'));


        //return view('country',['all'=> Country::all()  ]);
}
}
