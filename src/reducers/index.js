import { combineReducers } from 'redux';
import alerts from './alertsReducer';
import services from './servicesReducer';

const mainReducer = combineReducers({
    alerts,
    services
});

export default mainReducer