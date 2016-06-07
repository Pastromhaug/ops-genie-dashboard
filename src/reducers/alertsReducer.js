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
                for (i = 0; i < state.length; i++) {
                    const curr = state[i];
                    if (curr.alert.alias === id) {
                        return state.slice(0,i).concat(state.slice(i+1,state.length));
                    }
                }
            }
            else {
                return [...state];
            }
            break;
        case UPDATE_ALERT:
            const newAlert = action.alert;
            id = newAlert.alert.alias;
            for (i = 0; i < state.length; i++) {
                const curr = state[i];
                if (curr.alert.alias === id) {
                    return state.slice(0,i).concat([newAlert]).concat(state.slice(i+1,state.length));
                }
            }
            break;
        default:
            return state
    }
};

export default alerts