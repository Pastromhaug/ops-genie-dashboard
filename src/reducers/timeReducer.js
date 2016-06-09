/**
 * Created by perandre on 6/6/16.
 */

import {UPDATE_TIME} from '../actions/actionTypes';
import {AVAILABILITY_DAYS} from '../constants/appConstants';
import {calcAvailabiliyTime, calcCurrentTime} from '../js/timeUtil';



const times = (state = 0, action) => {
    switch (action.type) {
        case UPDATE_TIME:
            return {
                current_time: calcCurrentTime(),
                availability_time: calcAvailabiliyTime()
            };
        default:
            return state
    }
};

export default times;
