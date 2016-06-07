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

function queryAlertList() {
    return fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&status=open&order=asc')
        .then( function (resp) {return resp.json()});
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

function initializeAlerts(socket) {
    queryAlertList()
        .then( function (alert_list) {
            alert_list = alert_list.alerts;
            // iterate through the alerts received
            for (var i = 0; i < alert_list.length; i++) {
                var alias = alert_list[i].alias;
                queryAndSendAlert(alias, 'add alert', 'Create', socket);
            }
        })
}


io.on('connection', function (socket) {

    socket.on('client ready', function () {
        initializeAlerts(socket);
    });

    socket.on('query', function(data) {
    })
});


// opsgenie webhook posts alerts here
app.post('/', function(req) {

    const alias = req.body.alert.alias;
    const action = req.body.action;

    if (action == 'Create') {
        queryAndSendAlert(alias, 'add alert', 'Create', io.sockets);
    }
    else if (action == 'Close') {
        queryAndSendAlert(alias, 'remove alert', 'Close', io.sockets);
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(8000, function () {
    console.log('Example app listening on port 8000');
});
