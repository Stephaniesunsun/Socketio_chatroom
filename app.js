const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http=require('http');
const socketio=require('socket.io');


const app = express();
const server=http.createServer(app);
const io=socketio(server);

const indexRouter = require('./routes/index');
const landingRouter = require('./routes/landing');
const messageFormatting = require('./tools/message');
const {Join,getUser,leave,getRoomUsers}=require('./tools/user');

var username="BOT";

io.logger=true;
io.engineio_logger=true;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('socketio',io);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var username="BOT";

//then we need to emit this two paras into server
io.sockets.on('connection',socket=>{
  socket.on('joinRoom',({username,room})=>{
    const user=Join(socket.id,username,room);
    socket.join(user.room);
    //welcome current user
    socket.emit('message',messageFormatting(user.username,'Hello everybody'))
    //broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',messageFormatting(username,`${user.username} has joined the chat`));
    //send user and room info
    io.to(user.room).emit('roomUsers',{
      room:user.room,
      users:getRoomUsers(user.room)
    });
});
   //listen to new msg
  socket.on('chatMessage',(message)=>{
    const user=getUser(socket.id);
    io.to(user.room).emit('message',messageFormatting(user.username,message)) //emit back to all the clients
 })
 //runs when client disconnects
  socket.on('disconnect',()=>{ 
    const user=leave(socket.id);
    if(user){
      io.to(user.room).emit('message',messageFormatting(user.username,`${user.username} has left the chat`))
      //send user and room info
      io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUsers(user.room)
    });
    }
  })
})

app.use('/room', indexRouter);
app.use('/', landingRouter);
//run when client connects

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const PORT =process.env.PORT || 3000 ;
server.listen(PORT,()=>console.log(`server is listening on port ${PORT}`));

module.exports = app;
