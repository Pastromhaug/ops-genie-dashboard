/**
 * Created by perandre on 6/7/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import ServicesTable from './servicesTable'
import {updateServiceDowntime, removeAlert, addAlert, updateAlert, updateTime} from '../actions/actionTypes';


const mapStateToProps = (state) => {
    return {_state: state}
};

const VisibleServicesTable = connect(
    mapStateToProps
)(ServicesTable);

export default VisibleServicesTable;