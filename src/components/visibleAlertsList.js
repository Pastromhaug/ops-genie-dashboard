/**
 * Created by perandre on 6/2/16.
 */
import React from 'react';
import { connect } from 'react-redux'
import AlertsList from './alertsList';
import {addAlert} from '../actionTypes';


const mapStateToProps = (state) => {
    return {alerts: state.alerts}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddAlert: (text) => {
            console.log(addAlert(text));
            dispatch(addAlert(text))
        }
    }
};


const VisibleAlertList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AlertsList);

export default VisibleAlertList;