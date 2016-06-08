/**
 * Created by perandre on 6/1/16.
 */
import {SERVICES_TRACKED} from '../constants/appConstants';
import {UPDATE_SERVICE_DOWNTIME,
    APPEND_AVAILABILITY_INTERVAL,
    UPDATE_AVAILABILITY_INERVALS} from '../actions/actionTypes';

var initial_state = SERVICES_TRACKED.map( (service) => {
    return {
        service: service,
        last_time_available: null,
        availabilityIntervals: []
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
        case APPEND_AVAILABILITY_INTERVAL:
            return state.map( (curr) => {
                if (curr.service === action.data.service) {
                   curr.availabilityIntervals.concat([{start: data.start, end: data.end}]);
                   return curr;
                }
                else return curr;
            });
        case UPDATE_AVAILABILITY_INERVALS:
            return state.map( (curr) => {
                curr.availabilityIntervals = curr.availabilityIntervals.map( (interval) => {
                    interval.start = max(inerval.start, action.time);
                    return interval;
                });
                curr.availabilityIntervals = curr.availabilityIntervals.filter( (interval) => {
                    return interval.start < interval.end;
                });
                return curr;
            });
        default:
            return state;
    }
};

export default services