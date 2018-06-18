@extends('layouts.app')

@section('content')

<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">Dashboard</div>

                <div id="room" class="panel-body">

                <div id="user" class="panel-body">

                </div>
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in! <br>
                    <div class="chatarea">
                      <textarea cols='100' rows='15' id='panel' readonly></textarea><br>

                   		<label id='msglabel' class='disabled'>Message: </label>
                      <input type='text' size='54' id='msg'>
                      <button type='button' id='send'>send</button>

                      </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script>
    var TOKEN = '{{ $token or null }}';
    var ALLTOKEN = '{{ $alltoken or null }}';
    var NAME = '{{ $name or null }}';



</script>


<script src="/js/apptwo.js"></script>
@endsection
