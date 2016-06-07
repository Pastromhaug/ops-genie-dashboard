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

function queryAlert(alias) {
    return fetch( 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&alias=' + alias)
        .then( function (respons) {return respons.json()});
}

function queryAndSendAlert(alias, message, action, socket) {
    queryAlert(alias)
        .then( function (alert_resp) {
            const final = {
                alert: alert_resp,
                action: action
            };
            socket.emit(message, final);
    });
}

function queryAlertList() {
    return fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&status=open&order=asc')
        .then( function (resp) {return resp.json()});
}

io.on('connection', function (socket) {

    // 'client event' is emited by client immediately after setup  to let the server now it's ready
    socket.on('client ready', function () {
        // query for all open alerts using web api
        fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&status=open&order=asc')
            .then( function (resp) {return resp.json()})
            .then( function (resp) {
                resp = resp.alerts;
                // iterate through the alerts received
                console.log('resp.length: ' + resp.length);
                for (var i = 0; i < resp.length; i++) {
                    var alias = resp[i].alias;
                    queryAndSendAlert(alias, 'add alert', 'Create', socket);
                }
            })
    });
    socket.on('query', function(data) {
    })
});


// opsgenie webhook posts alerts here
app.post('/', function(req, res) {

    const resp = req.body;
    //console.log('resp');
    //console.log(resp);
    var currAlias = resp.alert.alias;
    // query the same alert using the web api. This is dumb but necessary, since the webhook doesn't send necessary
    // information about the alert
    fetch( 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&alias=' + currAlias)
        .then( function (update_resp) {return update_resp.json()})
        .then( function (update_resp) {
            resp.alert = update_resp;
            console.log('resp');
            console.log(resp);

            if (resp.action == 'Create'){
                io.sockets.emit('add alert', resp);
            }
            else if (resp.action == 'Close') {
                io.sockets.emit('remove alert', resp);
            }
        })


});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(8000, function () {
    console.log('Example app listening on port 8000');
});
