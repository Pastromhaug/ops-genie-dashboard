/**
 * Created by perandre on 6/1/16.
 */


export const ADD_ALERT = 'ADD_ALERT';

export function addAlert(text) {
    return { type: ADD_ALERT, text }
}