/**
 * Created by perandre on 5/2/16.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import VisibleServicesTable from './visibleServicesTable';
import VisibleAlertsTable from './visibleAlertsTable';
import {appbarStyles} from '../styles/contentCardsStyles'
import {serv, cli} from '../constants/ioConstants'
var moment = require('moment');
var Tick = require('tick-tock');
var tock = new Tick();
var socket = io();



class ContentCards extends React.Component {

    constructor(props) {
        super(props);
        this.newDowntimeOnRemove.bind(this);
        this.newDowntimeOnAdd.bind(this);
        this.addAlertHelper.bind(this);
        this.removeAlertHelper.bind(this);
        this.initServiceAvailabilities.bind(this);
        this.onTick.bind(this);

        socket.on( cli.ADD_ALERT, (data) => {
            this.addAlertHelper(data);
        });
        socket.on( cli.REMOVE_ALERT, (data) => {
            this.removeAlertHelper(data);
        });
        // set the current time in the state to be updated every second
        tock.setInterval('clock', () => this.onTick(), '1 second');
        this.initServiceAvailabilities();
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

    onTick() {
        this.props.onUpdateTime(moment.utc().valueOf());
        this.props.onUpdateAvailabilityIntervals(this.props._state.times.availability_time);
    }

    initServiceAvailabilities() {
        var data = {

        }
    }

    removeAlertHelper(data) {
        console.log('remove alert data:');
        console.log(data);
        this.props.onRemoveAlert(data);
        var new_downtime = this.newDowntimeOnRemove(data.alert.entity);
        this.props.onUpdateServiceDowntime(data.alert.entity, new_downtime);
    }

    addAlertHelper(data) {
        console.log('add alert data:');
        console.log(data);
        var aliases = this.props._state.alerts.map( (curr) => curr.alert.alias);
        var new_alias = data.alert.alias;
        if (aliases.indexOf(new_alias) == -1) {
            this.props.onAddAlert(data);
            var new_downtime = this.newDowntimeOnAdd(data.alert.entity, data.alert.createdAt/1000000);
            this.props.onUpdateServiceDowntime(data.alert.entity, new_downtime);
        }
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