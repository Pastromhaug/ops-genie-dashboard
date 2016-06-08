/**
 * Created by perandre on 5/2/16.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';
import VisibleServicesTable from './visibleServicesTable';
import VisibleAlertsTable from './visibleAlertsTable';
import {appbarStyles} from '../styles/contentCardsStyles'
import {serv, cli} from '../constants/ioConstants';
import {SERVICES_TRACKED, AVAILABILITY_DAYS} from '../constants/appConstants';
import {calcAvailabiliyTime, calcCurrentTime} from '../js/timeUtil';
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
        this.initServiceDowntime.bind(this);
        this.onTick.bind(this);

        // set the current time in the state to be updated every second
        props.onUpdateTime(calcCurrentTime());
        tock.setInterval('clock', () => this.onTick(), '1 second');

        socket.on( cli.ADD_ALERT, (data) => {
            this.addAlertHelper(data);
        });
        socket.on( cli.REMOVE_ALERT, (data) => {
            this.removeAlertHelper(data);
        });

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
        this.props.onUpdateTime(calcCurrentTime());
        this.props.onUpdateAvailabilityIntervals(this.props._state.times.availability_time);
    }

    initServiceAvailabilities() {
        socket.on(cli.CLOSED_ALERT, (data) => {
            console.log(cli.CLOSED_ALERT);
            console.log(data);
        });
        socket.on(cli.UPDATED_AFTER_ALERTS, (data) => {
            console.log(data);
            data.map( (aler) => {
                socket.emit(serv.CLOSED_ALERT, {id: aler.id, message: cli.CLOSED_ALERT})
            })
        });
        var availability_time = calcAvailabiliyTime();
        socket.emit(serv.UPDATED_AFTER_ALERTS,
            {
                message: cli.UPDATED_AFTER_ALERTS,
                updatedAfter: availability_time*1000000
            }
        );
    }


    initServiceDowntime() {
    }

    removeAlertHelper(data) {
        console.log('remove alert data:');
        console.log(data);
        this.props.onRemoveAlert(data);
        var data_entity = data.alert.entity;
        if (SERVICES_TRACKED.indexOf(data_entity) != -1) {
            var new_downtime = this.newDowntimeOnRemove(data.alert.entity);
            this.props.onUpdateServiceDowntime(data.alert.entity, new_downtime);
        }
    }

    addAlertHelper(data) {
        console.log('add alert data:');
        console.log(data);
        var aliases = this.props._state.alerts.map( (curr) => curr.alert.alias);
        var new_alias = data.alert.alias;
        var entity = data.alert.entity;
        this.props.onAddAlert(data);
        if (aliases.indexOf(new_alias) == -1 && SERVICES_TRACKED.indexOf(entity) != -1) {
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