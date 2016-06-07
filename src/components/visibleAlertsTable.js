
/**
 * Created by perandre on 6/7/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import AlertsTable from './alertsTable'
import {updateServiceDowntime, removeAlert, addAlert, updateAlert, updateTime} from '../actions/actionTypes';


const mapStateToProps = (state) => {
    return {_state: state}
};

const VisibleAlertsTable = connect(
    mapStateToProps
)(AlertsTable);

export default VisibleAlertsTable;