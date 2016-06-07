/**
 * Created by perandre on 6/1/16.
 */


import {ADD_ALERT, UPDATE_ALERT} from '../actions/actionTypes'

const alerts = (state = []
    , action) => {

    var id;
    var i;
    switch (action.type) {

        case ADD_ALERT:
            const type = action.alert.action;
            id = action.alert.alert.alias;
            if (type === 'Create') {
                return [
                    action.alert,
                    ...state
                ];
            }
            else if (type === 'Close') {
                return state.filter( (curr) => curr.alert.alias !== id);
            }
            else {
                return [...state];
            }
            break;

        case UPDATE_ALERT:
            const newAlert = action.alert;
            id = newAlert.alert.alias;
            return state.map( (curr) => {
                if (curr.alert.alias !== id) return curr;
                else return newAlert;
            });
            break;
        
        default:
            return state
    }
};

export default alerts