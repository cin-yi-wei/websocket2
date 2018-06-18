/*
var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('notification', function(err, count) {
  console.log('connect!');
});

redis.on('message', function(channel, notification) {
  console.log(notification);
  notification = JSON.parse(notification);

  // 將訊息推播給使用者
  io.emit('notification', notification.data.message);
});

// 監聽 3000 port
http.listen(3000, function() {
  console.log('Listening on Port 3000');
});
*/

var app = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('notification', function(err, count) {
  console.log('connect!');
});

io.on('connection', function(socket) {
  var userconnect,name;
var tokenarray=[],namearray=[];
/*
  socket.on('message', function (msg) {
    // 验证如果用户不在房间内则不给发送
    if (roomInfo[roomID].indexOf(user) === -1) {
      return false;
    }
    socketIO.to(roomID).emit('msg', user, msg);
  });

*/


socket.on('post', function(m) {

io.in(m.room).emit('msg', m);// 6
  /*
 		if(typeof socket['room'] !== 'undefined') {
 			socket.broadcast.in(socket['room']).emit('msg', m);
 		} else {
 			socket.emit('warning', 'You should choose a chat room first.');// 5
 		}*/
 	});

    socket.on('isme', function(token) {
  socket.join('token:' + token.mytoken+token.yourtoken);
 io.in('token:' + token.mytoken+token.yourtoken).emit('system', "twoin");// 6
  });

/*
  socket.on('chat', function(token) {
socket.join('token:' + token.mytoken+token.yourtoken);
// io.broadcast.in('token:' + token.mytoken+token.yourtoken).emit('system', "roomcreat");// 6
});
*/


  socket.on('chatroom', function(token) {
//socket.broadcast.emit("checkchattoken",token.yourtoken  );

socket.broadcast.emit("checkchattoken",token );
console.log( 'my='+token.mytoken+ 'your=' + token.yourtoken   );
   socket.join('token:' + token.mytoken+token.yourtoken);

    io.in('token:' + token.mytoken+token.yourtoken).emit('system', "onein");// 6
   /*
    socket.in('token:' + token.mytoken+token.yourtoken).emit('system', "roomcreat");// 6
  socket.broadcast.in('token:' + token.mytoken+token.yourtoken).emit('system', "roomcreat");// 6
*/
});



  // 當使用者觸發 set-token 時將他加入屬於他的 room
  socket.on('set-token', function(token) {
    userconnect=token.token;
    name=token.name;

    //-------------------------------------redis-----------
    var redis = require('redis'),
    RDS_PORT = 6379,        //端口号
    RDS_HOST = '127.0.0.1',    //服务器IP
    RDS_PWD = null,    //密码
    RDS_OPTS = {},            //设置项
    client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
    client.on('connect',function(){
    client.sadd("username", String(name));
    client.sadd("usertoken",String(userconnect));

    client.smembers("usertoken", function(err,res){
      //io.emit('usertoken',res );
      tokenarray=res;

       client.smembers("username", function(err,res){
         namearray=res;
          console.log("append"+tokenarray+namearray)
//io.emit('usertoken',tokenarray);
io.emit('usertoken',{"token":tokenarray,"name":namearray} );
      })

   })



/*
tokenarray=client.smembers('usertoken');
namearray=client.smembers('username');*/

});
/*
tokenarray=["1","2","3"];
namearray=["1","2","3"];*/
//----------------------------------------------------



    //console.log(token);
    socket.join('token:' + userconnect);
  });

  socket.on('disconnect', function () {

//-----------------redis------------------
var redis = require('redis'),
RDS_PORT = 6379,        //端口号
RDS_HOST = '127.0.0.1',    //服务器IP
RDS_PWD = null,    //密码
RDS_OPTS = {},            //设置项
client = redis.createClient(RDS_PORT,RDS_HOST,RDS_OPTS);
client.on('connect',function(){
client.srem("usertoken", String(userconnect));
client.srem("username", String(name));
client.smembers("usertoken", function(err,res){
//io.emit('usertoken',res );
   tokenarray=res;

   client.smembers("username", function(err,res){
     namearray=res;
      console.log("remove"+tokenarray)
      io.emit('usertoken', {"token":tokenarray,"name":namearray} );
   })
})



});
//-----------------redisend-----------------
/*
tokenarray=["1","2","3"];
namearray=["1","2","3"];*/


  //  io.emit('disconnect',token+"user out");


  });

});








redis.on('message', function(channel, notification) {
  console.log(notification);
  notification = JSON.parse(notification);

  // 使用 to() 指定傳送的 room，也就是傳遞給指定的使用者
  io.to('token:' + notification.data.token).emit(
    'notification',
    notification.data.message
  );

});

// 監聽 3000 port

http.listen(3000, function() {
  console.log('Listening on Port 3000');
});
