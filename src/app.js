var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
    socket.on('client event', function (data) {
        fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&status=open')
            .then( function (resp) {return resp.json()})
            .then( function (resp) {socket.emit('init alerts', resp);})
    });
});

data = {};

app.post('/', function(req, res) {
    const resp = req.body;
    data = [resp].concat(data);
    io.sockets.emit('server event', resp);

    res.send('hi there');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/data', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

server.listen(8000, function () {
    console.log('Example app listening on port 8000');
});
