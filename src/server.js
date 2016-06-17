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
    console.log('Alerts Dashboard app listening on port 8000');
});



io.on('connection', function (socket) {

    serverUtil.initializeAlerts(socket);

    socket.on( serv.OPEN_ALERTS, function (data) {
        serverUtil.sendOpenAlertList(data.message, socket)
    });

    socket.on( serv.OPEN_ALERT, function (data) {
        serverUtil.sendOpenAlert(data.message, data.alias, socket);
    });

    socket.on( serv.CLOSED_ALERT, function (data) {
        serverUtil.sendClosedAlert(data.message, data.id, socket);
    });

    socket.on( serv.UPDATED_AFTER_ALERTS, function (data) {
        serverUtil.sendUpdatedAfterAlertList(data.message, data.updatedAfter, socket);
    })
});



app.post('/webhook', function(req) {
    console.log('req.body');
    console.log(req.body);
    console.log('tail -f /var/log/upstart/ops-genie-dashboard.log');
    if (_.has(req.body.alert, 'alias') && ! _.has(req.body, 'retry')){
        var action = req.body.action;
        if (action == 'Create') {
            var alias = req.body.alert.alias;
            serverUtil.sendOpenAlert(cli.ADD_ALERT, alias, io.sockets);
        }
        else if (action == 'Close') {
            var alertId = req.body.alert.alertId;
            serverUtil.sendClosedAlert(cli.REMOVE_ALERT, alertId, io.sockets);
        }
    }

});