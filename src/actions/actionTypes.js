/**
 * Created by perandre on 6/1/16.
 */


export const ADD_ALERT = 'ADD_ALERT';

export function addAlert(alert) {
    return { type: ADD_ALERT, alert: alert}
}

export const REMOVE_ALERT = 'REMOVE_ALERT';

export function removeAlert(alert) {
    return { type: REMOVE_ALERT, alert: alert}
}


export const UPDATE_ALERT = 'UPDATE_ALERT';

export function updateAlert(alert) {
    return {type: UPDATE_ALERT, alert: alert}
}


export const UPDATE_SERVICE_DOWNTIME = 'UPDATE_SERVICE';

export function updateServiceDowntime(service, time) {
    return {type: UPDATE_SERVICE_DOWNTIME, stuff: {service: service, last_time_available: time}}
}


export const UPDATE_TIME = 'UPDATE_TIME';

export function updateTime(time) {
    return {type: UPDATE_TIME, time: time}
}

