import { combineReducers } from 'redux';
import alerts from './alertsReducer';
import services from './servicesReducer';
import current_time from './timeReducer';

const mainReducer = combineReducers({
    alerts,
    services,
    current_time
});

export default mainReducer