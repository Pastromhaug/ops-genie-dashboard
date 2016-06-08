/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import ContentCards from './contentCards';
import {updateServiceDowntime, removeAlert, addAlert, updateAlert, updateTime,
        updateAvailabilityIntervals, appendAvailabilityInterval} from '../actions/actionTypes';


const mapStateToProps = (state) => {
    return {_state: state}
};

const mapDispatchToProps = (dispatch) => {

    return {

        onUpdateServiceDowntime: (service, downtime) => {
            dispatch(updateServiceDowntime(service, downtime))
        },

        onAddAlert: (alert) => {
            dispatch(addAlert(alert))
        },

        onRemoveAlert: (alert) => {
            dispatch(removeAlert(alert))
        },

        onUpdateAlert: (alert) => {
            dispatch(updateAlert(alert))
        },

        onUpdateTime: (time) => {
            dispatch(updateTime(time))
        },

        onAppendAvailabilityInterval: (service, start, end) => {
            dispatch(appendAvailabilityInterval(service, start, end))
        },

        onUpdateAvailabilityIntervals: (time) => {
            dispatch(updateAvailabilityIntervals(time))
        }
    }
};


const VisibleContentCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentCards);

export default VisibleContentCards;