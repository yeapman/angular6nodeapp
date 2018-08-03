var express = require('express');
var router = express.Router();
var http = require('http').Server(express);
var io = require('socket.io')(http);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.send('200')
});

io.on('connection', function(socket) {
  console.log('a user connection');
  socket.on('disconnect', function() {
    console.log('user disconencet');
  });
});




module.exports = router;
