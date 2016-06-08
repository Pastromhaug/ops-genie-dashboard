/**
 * Created by perandre on 6/6/16.
 */

import {UPDATE_TIME} from '../actions/actionTypes';
import {AVAILABILITY_DAYS} from '../constants/appConstants';
var moment = require('moment');


const times = (state = 0, action) => {
    switch (action.type) {
        case UPDATE_TIME:
            var availability_time = moment(action.time).subtract(AVAILABILITY_DAYS, 'days');
            availability_time = availability_time.valueOf();
            return {
                current_time: action.time,
                availability_time: availability_time
            };
        default:
            return state
    }
};

export default times;
