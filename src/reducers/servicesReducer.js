/**
 * Created by perandre on 6/1/16.
 */
import {SERVICES_TRACKED} from '../constants/constants';
import {UPDATE_SERVICE} from '../actions/actionTypes';

var initial_state = SERVICES_TRACKED.map( (service) => {
    return {
        service: service,
        last_time_available: null,
        availability: 100.00
    }
});

const services = (state = initial_state, action) => {
    switch (action.type) {
        case UPDATE_SERVICE:
            var found = false;
            var newstate = [];
            for (var i = 0; i < state.length; i++) {
                if (state[i].service == action.service.service) {
                    newstate = newstate.concat([action.service]);
                    found = true;
                }
                else {
                    newstate = newstate.concat([state[i]]);
                }
            }
            if (found == false) {
                newstate = newstate.concat([action.service]);
            }
            return newstate;
        default:
            return state;
    }
};

export default services