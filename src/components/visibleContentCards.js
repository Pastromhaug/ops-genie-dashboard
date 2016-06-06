/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import ContentCards from './contentCards';
import {updateService, addAlert, updateAlert} from '../actionTypes';


const mapStateToProps = (state) => {
    return {_state: state}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateService: (service, downtime, availability) => dispatch(updateService(service, downtime, availability)),
        onAddAlert: (alert) => {
            dispatch(addAlert(alert))
        },
        onUpdateAlert: (alert) => {
            dispatch(updateAlert(alert))
        }
    }
};


const VisibleContentCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentCards);

export default VisibleContentCards;