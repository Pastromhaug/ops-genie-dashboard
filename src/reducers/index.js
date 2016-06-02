import { combineReducers } from 'redux'
import alerts from './alertsReducer'

const mainReducer = combineReducers({
    alerts
});

export default mainReducer