/**
 * Created by perandre on 6/1/16.
 */
import {SERVICES_TRACKED} from '../constants/appConstants';
import {UPDATE_SERVICE_DOWNTIME,
    APPEND_AVAILABILITY_INTERVAL,
    UPDATE_AVAILABILITY_INERVALS,
    ADD_ALERT_TO_AVAILABILITY} from '../actions/actionTypes';
import {max, timeDiff, displayMoment} from '../js/timeUtil';
var moment = require('moment');

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
                    interval.start = max(interval.start, moment.utc(action.time));
                    return interval;
                });
                curr.availabilityIntervals = curr.availabilityIntervals.filter( (interval) => {
                    return interval.start.isBefore(interval.end);
                });
                return curr;
            });

        case ADD_ALERT_TO_AVAILABILITY:
            var entity = action.data.alert.entity;
            return state.map( (service) => {
                if (service.service !== entity) {
                    return service;
                }
                else {
                    var createdAt = action.data.alert.createdAt / 1000000;
                    var closedTime = action.data.alert.systemData.closeTime;
                    var closedAt = createdAt + closedTime;

                    var to_insert = {start: moment.utc(createdAt), end: moment.utc(closedAt)};
                    var intervals = service.availabilityIntervals;
                    var new_intervals = [];

                    var added = false;
                    for (var i = 0; i < intervals.length; i++) {
                        var curr_interval = intervals[i];
                        if (curr_interval.end.isBefore(to_insert.start)) {
                            new_intervals = new_intervals.concat([curr_interval]);
                        }
                        else if (curr_interval.start.isAfter(to_insert.end)) {
                            var tail = intervals.slice(i,intervals.length);
                            new_intervals = new_intervals.concat([to_insert]).concat(tail);
                            added = true;
                            break;
                        }
                        else {
                            if (curr_interval.start.isBefore(to_insert.start)) {
                                to_insert.start = curr_interval.start;
                            }
                            if (curr_interval.end.isAfter(to_insert.end)) {
                                to_insert.end = curr_interval.end;
                            }
                        }
                    }
                    if (!added) {
                        new_intervals = new_intervals.concat([to_insert]);
                    }
                    service.availabilityIntervals = new_intervals;
                    return service;
                }
            });

        default:
            return state;
    }
};

export default services