/**
 * Created by perandre on 6/1/16.
 */


export const ADD_ALERT = 'ADD_ALERT';

export function addAlert(alert) {
    return { type: ADD_ALERT, alert: alert}
}


export const UPDATE_ALERT = 'UPDATE_ALERT';

export function updateAlert(alert) {
    return {type: UPDATE_ALERT, alert: alert}
}


export const UPDATE_SERVICE = 'UPDATE_SERVICE';

export function updateService(service, downtime, availability) {
    return {type: UPDATE_SERVICE, service: {service: service, downtime: downtime, availability: availability}}
}


export const UPDATE_TIME = 'UPDATE_TIME';

export function updateTime(time) {
    return {type: UPDATE_TIME, time: time}
}

