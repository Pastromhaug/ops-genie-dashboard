/**
 * Created by perandre on 6/1/16.
 */


import {ADD_ALERT, REMOVE_ALERT, UPDATE_ALERT} from '../actions/actionTypes'

const alerts = (state = [] , action) => {


    var alias;
    var id;

    switch (action.type) {


        case ADD_ALERT:
            return [
                action.alert,
                ...state
            ];

        case REMOVE_ALERT:
            alias = action.alert.alert.alias;
            id = action.alert.alert.alertId;
            return state.filter( (curr) => curr.alert.alias !== alias || curr.alert.id !== id);


        case UPDATE_ALERT:
            alias = action.alert.alert.alias;
            id = action.alert.alert.id;
            return state.map( (curr) => {
                if (curr.alert.alias !== alias || curr.alert.id !== id) return curr;
                else return action.alert;
            });

        default:
            return state
    }
};

export default alerts