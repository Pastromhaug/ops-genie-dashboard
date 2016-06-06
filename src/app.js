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
            .then( function (resp) {
                socket.emit('init alerts', resp);
                return resp;
            })
            .then( function (resp) {
                resp = resp.alerts;
                console.log('resp: ');
                console.log(resp);
                for (var i = 0; i < resp.length; i++) {
                    var currAlert = resp[i];
                    console.log('currAlert:');
                    console.log(currAlert);
                    var currAlias = currAlert.alias;
                    console.log('currAlias:');
                    console.log(currAlias);
                    fetch( 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&alias=' + currAlias)
                        .then( function (resp) {return resp.json()})
                        .then( function (resp) {
                            resp['username'] = resp['source'];
                            var newAlert = {
                                alert: resp,
                                action: 'Create'
                            };
                            socket.emit('update alert', newAlert
                            );})


                }
            })
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
