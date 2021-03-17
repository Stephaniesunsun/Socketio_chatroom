var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) { //not /landing!!important
  res.render('landingpage',{ title: 'landing page' });
});

module.exports = router;
