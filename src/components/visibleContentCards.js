/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import ContentCards from './contentCards';
import {addAlert, updateService} from '../actionTypes';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return{state: state};
};


const mapDispatchToProps = (dispatch) => {
    return {
        onNewAlert: (text) => dispatch(addAlert(text)),
        onUpdateService: (service, downtime, availability) => dispatch(updateService(service, downtime, availability))
    }
};

const VisibleContentCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentCards);

export default VisibleContentCards;