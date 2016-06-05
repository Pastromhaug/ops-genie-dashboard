var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var bodyParser = require('body-parser');
//var $ = require('jquery');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


io.on('connection', function (socket) {
    socket.emit('server event', { foo: 'bar' });
    socket.on('client event', function (data) {
        console.log(data);
    });
});



data = {};
//init();

app.post('/', function(req, res) {
    console.log('post received');
    //console.log(req.body);
    const resp = req.body;
    const newalert =
        {
            service: resp.source.type,
            message: resp.alert.message,
            user: resp.alert.userId,
            alertId: resp.alert.alertId
        };
    data = [newalert].concat(data);
    io.sockets.emit('server event', newalert);
    console.log(resp);

    res.send('hi there');
});

app.get('/', function (req, res) {
    console.log(__dirname + '/public/index.html');
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/data', function(req, res) {
    console.log('getting data');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(data));
});

server.listen(8000, function () {
    console.log(__dirname + "/public/bundle.js");
    console.log('Example app listening on port 3000!');
});


//function init() {
//    $.ajax({
//        type: 'GET',
//        url: 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d',
//        url: 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d',
//        dataType: 'json',
//        success: function(data){
//            console.log(data);
//        }
//    });
//}