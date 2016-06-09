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
import {calcAvailabiliyTime, calcCurrentTime, min} from '../js/timeUtil';
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
        this.updateDowntime.bind(this);

        // set the current time in the state to be updated every second
        props.onUpdateTime(calcCurrentTime());
        tock.setInterval('clock', () => this.onTick(), '1 second');

        socket.on( cli.ADD_ALERT, (data) => {
            this.addAlertHelper(data);
        });
        socket.on( cli.REMOVE_ALERT, (data) => {
            this.removeAlertHelper(data);
            props.onAddAlertToAvailability(data);
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
        this.updateDowntime();

    }

    updateDowntime() {
        var services = this.props._state.services;
        for (var i = 0; i < services.length; i++){
            var service = services[i].service;
            var last_time = moment.utc(services[i].last_time_available);
            var intervals = services[i].availabilityIntervals;

            for (var j = 0; j < intervals.length; j++){
                var interval = intervals[j];
                if (interval.start.isBefore(last_time) && interval.end.isAfter(last_time)){
                    this.props.onUpdateServiceDowntime(service, interval.start.valueOf());
                    break;
                }
            }
        }
    }

    initServiceAvailabilities() {
        socket.on(cli.CLOSED_ALERT, (data) => {
            var severity = data.alert.details.severity;
            if (severity !== 'risk' && severity !== 'Risk'){
                this.props.onAddAlertToAvailability(data);
            }
        });
        var availability_time = calcAvailabiliyTime();
        socket.emit(serv.UPDATED_AFTER_ALERTS,
            {
                message: cli.CLOSED_ALERT,
                updatedAfter: availability_time*1000000
            }
        );
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

        var severity = data.alert.details.severity;
        if (severity !== 'risk' && severity !== 'Risk') {
            if (aliases.indexOf(new_alias) == -1 && SERVICES_TRACKED.indexOf(entity) != -1) {
                var new_downtime = this.newDowntimeOnAdd(data.alert.entity, data.alert.createdAt / 1000000);
                this.props.onUpdateServiceDowntime(data.alert.entity, new_downtime);
            }
        }
    }

    newDowntimeOnRemove(entity) {
        var this_entity = this.props._state.alerts.filter( (curr) => {
            var severity = curr.alert.details.severity;
            return (curr.alert.entity == entity && severity !== 'risk' && severity !== 'Risk');
        });
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