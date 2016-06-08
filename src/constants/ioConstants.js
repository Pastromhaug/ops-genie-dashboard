/**
 * Created by perandre on 6/8/16.
 */

// server.js sockets wait on these strings with socket.on()
const serv = {
    OPEN_ALERTS: 'OPEN_ALERTS',
    OPEN_ALERT: 'OPEN_ALERT',
    CLOSED_ALERT: 'CLOSED_ALERT',
    UPDATED_AFTER_ALERTS :'UPDATED_AFTER_ALERTS'
};

// client side sockets wait on these strings with socket.on()
const cli = {
    ADD_ALERT: 'ADD_ALERT',
    REMOVE_ALERT: 'REMOVE_ALERT',
    OPEN_ALERT_FOR_DOWNTIME: 'OPEN_ALERTS_FOR_DOWTIME',
    UPDATED_AFTER_ALERTS: 'UPDATED_AFTER_ALERTS',
    CLOSED_ALERT: 'CLOSED_ALERT'
};

module.exports = {
    serv: serv,
    cli: cli
};

