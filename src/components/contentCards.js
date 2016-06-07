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
        this.newDowntimeOnRemove.bind(this);
        this.newDowntimeOnAdd.bind(this);
        socket.emit('client ready', {first: 'client_ready'});
        socket.on('add alert', (data) => {
            var aliases = props._state.alerts.map( (curr) => curr.alert.alias);
            var new_alias = data.alert.alias;
            if (aliases.indexOf(new_alias) == -1) {
                props.onAddAlert(data);
                var new_downtime = this.newDowntimeOnAdd(data.alert.entity, data.alert.createdAt/1000000);
                props.onUpdateServiceDowntime(data.alert.entity, new_downtime);
            }
        });
        socket.on('remove alert', (data) => {
            console.log('remove alert data:');
            console.log(data);
            props.onRemoveAlert(data);
            var new_downtime = this.newDowntimeOnRemove(data.alert.entity);
            props.onUpdateServiceDowntime(data.alert.entity, new_downtime);

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

    newDowntimeOnRemove(entity) {
        var this_entity = this.props._state.alerts.filter( (curr) => curr.alert.entity == entity);
        if (this_entity.length == 0) {
            return null;
        }
        var this_service = this.props._state.services.filter( (curr) => curr.service == entity)[0];
        return this_service.last_time_available;
    }

    newDowntimeOnAdd(entity, created_at) {
        var this_service = this.props._state.services.filter( (curr) => curr.service == entity)[0];
        var old_downtime = this_service.last_time_available;
        if (old_downtime == null) return created_at;
        else if (created_at < old_downtime ) return created_at;
        else return old_downtime;
    }
}
export default ContentCards;