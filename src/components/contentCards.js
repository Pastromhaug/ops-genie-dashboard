/**
 * Created by perandre on 5/2/16.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import VisibleServicesTable from './visibleServicesTable';
import VisibleAlertsTable from './visibleAlertsTable';
import {appbarStyles} from '../styles/contentCardsStyles'
var moment = require('moment');
var Tick = require('tick-tock');
var tock = new Tick();
var socket = io();



class ContentCards extends React.Component {

    constructor(props) {
        super(props);
        socket.emit('client ready', {first: 'client_ready'});
        socket.on('add alert', (data) => {
            props.onAddAlert(data);
        });
        socket.on('remove alert', (data) => {
            console.log('remove alert data:');
            console.log(data);
            props.onRemoveAlert(data);

            // loop through services and set their last available time to null if
            // they don't have any outstanding alerts. This will zero their downtime.
        //    const services = this.props._state.services;
        //    const alerts = this.props._state.alerts;
        //
        //    for (var i = 0; i  < services.length; i++) {
        //        const service = services[i].service;
        //        const serviceAlerts = alerts.filter( (curr) => curr.alert.entity === service);
        //        if (serviceAlerts.length == 0) {
        //            props.onUpdateServiceDowntime(service, null)
        //        }
        //    }
        });

        // set the current time in the state to be updated every second
        tock.setInterval('clock', () => props.onUpdateTime(moment.utc().valueOf()), '1 second');
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Services Health Dashboard"
                    showMenuIconButton={false}
                    style={appbarStyles.container}
                />
                <VisibleServicesTable/>
                <VisibleAlertsTable/>
            </div>
        )
    }
}
export default ContentCards;