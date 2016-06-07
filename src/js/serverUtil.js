/**
 * Created by perandre on 6/7/16.
 */
var fetch = require('node-fetch');


function queryAlert(url_param, alias_id) {
    return fetch( 'https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&' + url_param + '=' + alias_id)
        .then( function (respons) {return respons.json()});
}

function queryAlertList() {
    return fetch('https://api.opsgenie.com/v1/json/alert?apiKey=d541ec04-c286-48df-95fa-79c59c9def5d&status=open&order=asc')
        .then( function (resp) {return resp.json()});
}

function queryAndSendAlert(url_param, alias_id, message, action, socket) {
    queryAlert(url_param, alias_id)
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
                queryAndSendAlert('alias',alias, 'add alert', 'Create', socket);
            }
        })
}

module.exports = {
    queryAlert: queryAlert,
    queryAlertList: queryAlertList,
    queryAndSendAlert: queryAndSendAlert,
    initializeAlerts: initializeAlerts
};