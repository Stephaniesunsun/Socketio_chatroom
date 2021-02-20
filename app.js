const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http=require('http');
const socketio=require('socket.io');

//const {username, room}= Qs.parse(location.search,{
  //ignoreQueryPrefix : true
//});
const app = express();
const server=http.createServer(app);
const io=socketio(server);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const messageFormatting = require('./tools/message');
 //get username and room from URL
var myName="BOT";

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

io.sockets.on('connection',socket=>{
   //welcome current user
   socket.emit('message',messageFormatting(myName,'Hello everybody'))
   //broadcast when a user connects
   socket.broadcast.emit('message',messageFormatting(myName,'a user has joined the chat'));
   //runs when client disconnects
   socket.on('disconnect',()=>{
     io.emit('message',messageFormatting(myName,'a user has left the chat'))
   });
   //listen to new msg
   socket.on('chatMessage',(message)=>{
    io.emit('message',messageFormatting('username',message)) //emit back to all the clients
   })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
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
