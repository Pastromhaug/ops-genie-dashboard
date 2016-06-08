/**
 * Created by perandre on 6/7/16.
 */
var fetch = require('node-fetch');
var ioConstants = require('../constants/ioConstants');
const cli = ioConstants.cli;


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
            const final = {
                alert: alert_resp,
                action: 'Create'
            };
            socket.emit(message, final);
        });
}

function sendClosedAlert(message, id, socket) {
    queryClosedAlert(id)
        .then( function (alert_resp) {
            const final = {
                alert: alert_resp,
                action: 'Closed'
            };
            socket.emit(message, final);
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

function queryUpdatedBeforeAlertList(updatedBefore, sortBy, order) {
    return fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&updatedBefore='
        + updatedBefore + '&sortBy=' + sortBy + '&order=' + order + '&limit=20' )
        .then( function (resp) {return resp.json()});
}

function sendUpdatedBeforeAlertList(message, updatedBefore, sortBy, order, socket) {
    queryUpdatedBeforeAlertList(updatedBefore, sortBy, order).then(function (list_resp) {
        var final = list_resp.alerts;
        socket.emit(message, final);
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
    queryUpdatedBeforeAlertList: queryUpdatedBeforeAlertList,
    sendUpdatedBeforeAlertList: sendUpdatedBeforeAlertList
};