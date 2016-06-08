var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var serverUtil = require('./js/serverUtil');
var _ = require('lodash');
var ioConstants = require('./constants/ioConstants');
const serv = ioConstants.serv;
const cli = ioConstants.cli;




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

    serverUtil.initializeAlerts(socket);

    socket.on( serv.OPEN_ALERTS, function (data) {
        serverUtil.sendOpenAlertList(data.message, socket)
    });

    socket.on( serv.SPECIFIC_ALERT, function (data) {
        serverUtil.sendAlert(data.message, data.url_param, data.alias_id, data.action, socket);
    });

    socket.on( serv.UPDATED_BEFORE_ALERTS, function (data) {
        serverUtil.sendUpdatedBeforeAlertList(data.message, data.updatedAt, data.sortBy, data.order, socket);
    })
});



app.post('/', function(req) {
    console.log('req.body');
    console.log(req.body);
    if (_.has(req.body.alert, 'alias')){
        var action = req.body.action;
        if (action == 'Create') {
            var alias = req.body.alert.alias;
            serverUtil.sendAlert(cli.ADD_ALERT,'alias', alias, 'Create', io.sockets);
        }
        else if (action == 'Close') {
            var alertId = req.body.alert.alertId;
            serverUtil.sendAlert(cli.REMOVE_ALERT, 'id', alertId, 'Close', io.sockets);
        }
    }

});