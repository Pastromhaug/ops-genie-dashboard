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

    // 'client event' is emited by client immediately after setup  to let the server now it's ready
    socket.on('client ready', function () {

        // query for all open alerts using web api
        fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&status=open&order=asc')
            .then( function (resp) {return resp.json()})
            .then( function (resp) {
                // send all open alerts as list to client
                socket.emit('init alerts', resp);
                return resp;
            })
            .then( function (resp) {
                resp = resp.alerts;

                // iterate through the alerts received
                for (var i = 0; i < resp.length; i++) {
                    var currAlert = resp[i];
                    var currAlias = currAlert.alias;

                    // for each open alert, query it again, specifically. This is necessary because for some reason it returns
                    // more info for each alert.
                    fetch( 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&alias=' + currAlias)
                        .then( function (resp) {return resp.json()})
                        .then( function (resp) {
                            var newAlert = {
                                alert: resp,
                                action: 'Create'
                            };

                            // send client updated information on each alert
                            socket.emit('update alert', newAlert
                            );})
                }
            })
    });
    socket.on('query', function(data) {
        console.log('query:');
        console.log(data);
    })
});


// opsgenie webhook posts alerts here
app.post('/', function(req, res) {
    const resp = req.body;

    // send alert to all clients
    io.sockets.emit('new alert', resp);
    var currAlias = resp.alert.alias;

    // query the same alert using the web api. This is dumb but necessary, since the webhook doesn't send necessary
    // information about the alert
    if (resp.action === 'Create'){
        fetch( 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&alias=' + currAlias)
            .then( function (resp) {return resp.json()})
            .then( function (resp) {
                var newAlert = {
                    alert: resp,
                    action: 'Create'
                };
                console.log('toupdate: ');
                console.log(newAlert);

                // send client an update on the alert it just received
                io.sockets.emit('update alert', newAlert
                );})
    }


});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(8000, function () {
    console.log('Example app listening on port 8000');
});
