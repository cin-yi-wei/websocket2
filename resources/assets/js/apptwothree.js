

var io = require('socket.io-client');

var notification = io.connect('http://localhost:3000');
var old= [],old_name= [];
var whatroom,whoname;


notification.on('disconnect', function(message) {
  console.log(message);
});





/*
notification.on('disconnect', function() {
  notification.emit('set-token', TOKEN);
  $.ajax({
      type: "post",
      url: "/ajax/disconnect",
      async: false, // 使用同步方式
      // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
      // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
      data: JSON.stringify({
          "data1": TOKEN //parseInt($('input[name="a"]').val()),
      }),
      contentType: "application/json",
      dataType: "json",
      success: function(data) {
          console.log(data);
      } // 注意不要在此行增加逗号
  });
});
*/

notification.on('usertoken', function(message) {
console.log(message);

var a= (message.token).filter(function(v){ return old.indexOf(v) > -1 })  //交集
var b = (message.token).filter(function(v){ return a.indexOf(v) == -1 })  // b=message-a  差集

var a_name= (message.name).filter(function(v){ return old_name.indexOf(v) > -1 })  //交集
var b_name =( message.name).filter(function(v){ return a_name.indexOf(v) == -1 })  // b=message-a  差集

   for(var len in b){
     $("#user").append('<button type="button"   id="div' + b[len]+ '" name="'+b_name[len]+'" value="'+b[len]+'">'+b_name[len]+'</button>');
    document.getElementById("div"+b[len]).onclick=function(){
      $('#panel').val("");
      console.log("this is "+ this.innerHTML);
        notification.emit('chatroom', { 'mytoken': TOKEN,'yourtoken': this.value } );
        whatroom="token:"+TOKEN+this.value ;

        // alert("mytoken="+TOKEN+"/n yourtoken="+this.value);  //  this 指当前发生事件的HTML元素，这里是<div>标签
     }
   }

var c = old.filter(function(v){ return a.indexOf(v) == -1 }) // c=old-a 差集
   for(var len in c){
     $("#div"+c[len]).remove();
   }

   var c_name = old_name.filter(function(v){ return a_name.indexOf(v) == -1 }) // c=old-a 差集


   /*
for(var len in message){
  $("#user").append('<div id="div' + message[len]+ '">   '+message[len]+'  </div>');
}
*/


//$("#user").append("<button type='button' onclick='myFunction()' id='roombut' value='"+message[0]+message.length+"' >"+message[0]+message.length+"</button>");


old=message.token;
old_name=message.name;
})






function myFunction(clicked_id) {

    notification.emit('set-token', { 'mytoken': TOKEN,'yourtoken': document.getElementById(clicked_id).value } );
alert(
"mytoken="+TOKEN+
"token="+  document.getElementById(clicked_id).value
);

}

notification.on('connect', function() {


  notification.emit('set-token', {"token":TOKEN,"name":NAME});
/*
$.ajax({
    type: "post",
    url: "/ajax/connect",
    async: false, // 使用同步方式
    // 1 需要使用JSON.stringify 否则格式为 a=2&b=3&now=14...
    // 2 需要强制类型转换，否则格式为 {"a":"2","b":"3"}
    data: JSON.stringify({
        "data1": TOKEN //parseInt($('input[name="a"]').val()),
    }),
    contentType: "application/json",
    dataType: "json",
    success: function(data) {
        console.log(data);
    } // 注意不要在此行增加逗号
});
*/
/*
var queues=new Array();
queues.push(TOKEN);
for(var queue in queues){
console.log(queues[queue]);
}*/
//console.log(queues[0]);
//  $("#room").append("<button type='button' onclick='myFunction()' id='roombut' value='"+TOKEN+"' >"+TOKEN+"</button>");

    //  var  allToken='{{ $alltoken or null }}';
      //alert(Notification.ALLTOKEN);
    //  console.log(Notification.ALLTOKEN);
    //    $("#room").append( allToken );


});

/*
window.onbeforeunload = function(){
    var temp = document.getElementById("temp");
    if(temp.value=='1'){
      socket.disconnect();
    }
}
*/
notification.on('notification', function(message) {
  console.log(message);
  $("#room").append(message);
});


notification.on('checkchattoken', function(message) {
if(message.yourtoken==TOKEN)
{
whatroom="token:"+ message.mytoken+message.yourtoken  ;
notification.emit('isme', message);
}
//  $("#room").append(message);
});


notification.on('system', function (sysMsg) {
console.log(sysMsg );
});


document.getElementById("send").onclick=function(){
  console.log("send" );
 		//e.stopPropagation();
 		var m = $('#msg').val();
 		notification.emit('post', {who:TOKEN,whoname:NAME,room:whatroom, msg:m});
 }

/*
$('#send').onclick=function() {
  console.log("send" );
 		//e.stopPropagation();
 		var m = $('#msg').val();
 		notification.emit('post', {room:whatroom, msg:m});
 	//	$('#msg').val('');
 		//updateMsg({nickname:nickname,msg:m});
 	}*/

  notification.on('msg', function (msg) {
    var ta = $("#panel");
   		var t = new Date();
   		var s = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
   		var m = '[ '+ msg.whoname+ ' (' + s + ')]: ' + msg.msg;
   		ta.val(ta.val()+'\n'+m);
   		setTimeout(function(){
   		ta.scrollTop(ta[0].scrollHeight - ta.innerHeight());
   		},10);



  //  $('#panel').append(msg+"/n" );

  console.log(msg );
  });
