/**
 * Created by perandre on 6/6/16.
 */

import {UPDATE_TIME} from '../actionTypes';

const current_time = (state = 0, action) => {
    switch (action.type) {
        case UPDATE_TIME:
            return action.time;
        default:
            return state
    }
};

export default current_time;
