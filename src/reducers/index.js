import { combineReducers } from 'redux';
import alerts from './alertsReducer';
import services from './servicesReducer';
import times from './timeReducer';

const mainReducer = combineReducers({
    alerts,
    services,
    times
});

export default mainReducer