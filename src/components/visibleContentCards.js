/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import { connect } from 'react-redux';
import ContentCards from './contentCards';
import {updateService, addAlert} from '../actionTypes';


const mapStateToProps = (state) => {
    return {state: state}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateService: (service, downtime, availability) => dispatch(updateService(service, downtime, availability)),
        onAddAlert: (text) => {
            console.log(addAlert(text));
            dispatch(addAlert(text))
        }
    }
};


const VisibleContentCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentCards);

export default VisibleContentCards;