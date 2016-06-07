/**
 * Created by perandre on 6/1/16.
 */
import {SERVICES_TRACKED} from '../constants/constants';
import {UPDATE_SERVICE_DOWNTIME} from '../actions/actionTypes';

var initial_state = SERVICES_TRACKED.map( (service) => {
    return {
        service: service,
        last_time_available: null,
        availability: 100.00
    }
});

const services = (state = initial_state, action) => {
    switch (action.type) {
        case UPDATE_SERVICE_DOWNTIME:
            return state.map( (curr) => {
                if (curr.service === action.stuff.service) {
                    return Object.assign({}, curr, action.stuff)
                }
                else return curr;
            } );
        default:
            return state;
    }
};

export default services