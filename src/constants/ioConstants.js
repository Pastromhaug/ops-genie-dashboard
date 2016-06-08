/**
 * Created by perandre on 6/8/16.
 */

// server.js sockets wait on these strings with socket.on()
const serv = {
    OPEN_ALERTS: 'OPEN_ALERTS',
    SPECIFIC_OPEN_ALERT: 'SPECIFIC_OPEN_ALERT',
    SPECIFIC_CLOSED_ALERT: 'SPECIFIC_CLOSED_ALERT',
    UPDATED_BEFORE_ALERTS :'UPDATED_BEFORE_ALERTS'
};

// client side sockets wait on these strings with socket.on()
const cli = {
    ADD_ALERT: 'ADD_ALERT',
    REMOVE_ALERT: 'REMOVE_ALERT'
};

module.exports = {
    serv: serv,
    cli: cli
};

