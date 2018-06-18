<?php
header('Content-Type:application/json');
/*
require 'Predis/Autoloader.php';

Predis\Autoloader::register();*/
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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::post('/ajax/connect',function(){

  //$json =json_encode('{"data1" : "aaa", "data2" : "bbb"}');
//  $data='{data1:"aaa",data2:"bbb"}';

//$data = json_decode($data,true)['data1'];

  $json = file_get_contents('php://input'); // read JSON from raw POST data
$data = json_decode($json,true)['data1'];

$client = new Predis\Client();
/*
$client->set('foo', $data);
$value = $client->get('foo');

$client->lpush('names', "a", "b");
$value = $client->lrange('names', 0, -1);
*/
$client->sadd('usertoken',$data );
$value = $client->smembers('usertoken');


return (array)$value;
        //   return $data;

/*
  if (!empty($json)) {
      $data = json_decode($json,true)['data1']; // decode
      //  $data = json_decode($data)->data1;
  }
*/
//  return $data;

//Request::all()


/*
  $data= ;

  $data=json_decode($data,true)['data1'];
   return $data;*/
  /*
  if(Request::ajax()){
    $data=Request->get('data1');


      //$data=Response::json(Request::all());
    //  echo $data;
  //  $data=$data->data1;
    //$data='{data1:"aaa",data2:"bbb"}';

      $data = preg_replace('/(\w+):/is', '"$1":', $data);
      $j= json_decode($data,true)['data1'];



//$j=ext_json_decode(Request::all(), true)->data1;
    //$j=json_decode( preg_replace('/[\x00-\x1F\x80-\xFF]/', '', Request::all()), true )->data1;
//$j=json_decode(Request::all())->data1;
    return $data;

  }
  */
});

Route::post('/ajax/disconnect',function(){
  $json = file_get_contents('php://input'); // read JSON from raw POST data
$data = json_decode($json,true)['data1'];
$client = new Predis\Client();
$client->srem('usertoken',$data );
$value = $client->smembers('usertoken');
return (array)$value;

});
