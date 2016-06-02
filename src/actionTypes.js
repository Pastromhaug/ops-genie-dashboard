/**
 * Created by perandre on 6/1/16.
 */


export const ADD_ALERT = 'ADD_ALERT';

export function addAlert(text) {
    return { type: ADD_ALERT, text: text }
}

export const UPDATE_SERVICE = 'UPDATE_SERVICE';

export function updateService(service, downtime, availability) {
    return {type: UPDATE_SERVICE, service: {service: service, downtime: downtime, avaiability: availability}}
}
