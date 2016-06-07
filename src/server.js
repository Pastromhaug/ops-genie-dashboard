var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var serverUtil = require('./js/serverUtil');
var _ = require('lodash');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.listen(8000, function () {
    console.log('Example app listening on port 8000');
});



io.on('connection', function (socket) {
    socket.on('client ready', function () {
        serverUtil.initializeAlerts(socket);
    });
    socket.on('query', function(data) {
    })
});



// opsgenie webhook posts alerts here
app.post('/', function(req) {
    console.log('req.body');
    console.log(req.body);
    if (_.has(req.body.alert, 'alias')){
        var action = req.body.action;
        if (action == 'Create') {
            var alias = req.body.alert.alias;
            serverUtil.queryAndSendAlert('alias', alias, 'add alert', 'Create', io.sockets);
        }
        else if (action == 'Close') {
            var alertId = req.body.alert.alertId;
            serverUtil.queryAndSendAlert('id', alertId, 'remove alert', 'Close', io.sockets);
        }
    }

});