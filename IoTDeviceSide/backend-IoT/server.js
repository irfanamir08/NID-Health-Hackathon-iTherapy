var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var admin = require('firebase-admin');
var bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

dataFromServer = {
  msg: 'You are connected!'

}
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log("App is running on port " + port);
});

// WARNING: app.listen(80) will NOT work here!
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
  console.log('Client ' + socket.id + ' is connected');
  socket.emit('fromServer', dataFromServer);

    app.post('/replay', function(req, res) { // replay data from database
        var data = {
          w: req.body.l_shoulderW,
          x: req.body.l_shoulderX,
          y: req.body.l_shoulderY,
          z: req.body.l_shoulderZ,
          w2: req.body.l_elbowW,
          x2: req.body.l_elbowX,
          y2: req.body.l_elbowY,
          z2: req.body.l_elbowZ
        }
        // console.log(data);
        socket.broadcast.emit('dataFromDatabase', data); //broadcast to other client that connected

        res.send('meow');
    });

    app.post('/live', function(req, res) { // replay data from database
        var data = {
          w: req.body.l_shoulderW,
          x: req.body.l_shoulderX,
          y: req.body.l_shoulderY,
          z: req.body.l_shoulderZ,
          w2: req.body.l_elbowW,
          x2: req.body.l_elbowX,
          y2: req.body.l_elbowY,
          z2: req.body.l_elbowZ
        }
        // console.log(data);
        socket.broadcast.emit('dataFromDevice', data); //broadcast to other client that connected

        res.send('meow');
    });

});
