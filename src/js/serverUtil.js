/**
 * Created by perandre on 6/7/16.
 */
var fetch = require('node-fetch');
var ioConstants = require('../constants/ioConstants');
const cli = ioConstants.cli;
const appConstants = require('../constants/appConstants');
const SERVICES_TRACKED = appConstants.SERVICES_TRACKED;



function queryOpenAlert(alias) {
    return fetch( 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&alias=' + alias)
        .then( function (respons) {return respons.json()});
}

function queryClosedAlert(id) {
    return fetch( 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&id=' + id)
        .then( function (respons) {return respons.json()});
}

function sendOpenAlert(message, alias, socket) {
    queryOpenAlert(alias)
        .then( function (alert_resp) {
            var recipients = alert_resp.recipients;
            if (recipients.indexOf('oncall') != -1){
                if (SERVICES_TRACKED.indexOf(alert_resp.entity) == -1){
                    alert_resp.entity = 'Unknown';
                }
                const final = {
                    alert: alert_resp,
                    action: 'Create'
                };
                socket.emit(message, final);
            }
        });
}

function sendClosedAlert(message, id, socket) {
    queryClosedAlert(id)
        .then( function (alert_resp) {
            var recipients = alert_resp.recipients;
            if (recipients.indexOf('oncall') != -1) {
                if (SERVICES_TRACKED.indexOf(alert_resp.entity) == -1) {
                    alert_resp.entity = 'Unknown';
                }
                const final = {
                    alert: alert_resp,
                    action: 'Closed'
                };
                socket.emit(message, final);
            }
        });
}

function queryOpenAlertList() {
    return fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&status=open&order=asc')
        .then( function (resp) {return resp.json()});
}

function sendOpenAlertList(message, socket) {
    queryOpenAlertList().then( function(list_resp) {
        var final = list_resp.alerts;
        socket.emit(message, final);
    })
}

function queryUpdatedAfterAlertList(updatedAfter) {
    return fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d'+
        '&sortBy=updatedAt&order=asc&limit=100&status=closed&updatedAfter=' + updatedAfter)
        .then( function (resp) {return resp.json()});
}

function sendUpdatedAfterAlertList(message, updatedAfter, socket) {
    queryUpdatedAfterAlertList(updatedAfter).then(function (list_resp) {
        var final = list_resp.alerts;
        if (final.length > 1) {
            var next_updated_after = final[final.length - 1].updatedAt;
            final.map( (aler) => {
                sendClosedAlert(message, aler.id, socket);
            });
            sendUpdatedAfterAlertList(message, next_updated_after, socket)
        }
    })
}

function initializeAlerts(socket) {
    queryOpenAlertList()
        .then( function (alert_list) {
            alert_list = alert_list.alerts;
            // iterate through the alerts received
            for (var i = 0; i < alert_list.length; i++) {
                var alias = alert_list[i].alias;
                sendOpenAlert(cli.ADD_ALERT ,alias, socket);
            }
        })
}

module.exports = {
    queryOpenAlert: queryOpenAlert,
    queryClosedAlert: queryClosedAlert,
    sendOpenAlert: sendOpenAlert,
    sendClosedAlert: sendClosedAlert,
    queryOpenAlertList: queryOpenAlertList,
    sendOpenAlertList: sendOpenAlertList,
    initializeAlerts: initializeAlerts,
    queryUpdatedAfterAlertList: queryUpdatedAfterAlertList,
    sendUpdatedAfterAlertList: sendUpdatedAfterAlertList
};