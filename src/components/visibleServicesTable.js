/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import ServicesTable from './servicesTable';
import {updateService} from '../actionTypes'

const mapStateToProps = (state) => {
    return {services: state.services}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: (service, downtime, availability) => dispatch(updateService(service, downtime, availability))
    }
};


const VisibleServicesTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServicesTable);

export default VisibleServicesTable;