const express = require('express');
//const io=app.get('socketio');
const router = express.Router();
/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('chatroom', { title: 'EMeet' });
  console.log("hello")
});

module.exports = router;
