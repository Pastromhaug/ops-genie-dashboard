/**
 * Created by perandre on 5/2/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import $ from 'jquery';
import {SERVICES_TRACKED} from '../constants/constants';
var moment = require('moment');
var Tick = require('tick-tock')
    , tock = new Tick();


var socket = io();


const cardHeaderStyles = {
    container: {
        backgroundColor: 'rgb(232,232,232)'
    }
};

const cardStyles = {
    container: {
        margin: '16px',
        marginBottom: '32px'
    }
};

const appbarStyles = {
    container: {
        marginBottom: '48px',
        textAlign: 'center',
        backgroundColor: '#a3c1a3'
    }
};


class ContentCards extends React.Component {

    constructor(props) {
        super(props);
        socket.emit('client ready', {first: 'client_ready'});

        // add all the alerts that already exist when opening the page
        socket.on('init alerts', (data) => {
            for (var i = 0; i < data.alerts.length; i++) {
                const newAlert = {alert: data.alerts[i], action: 'Create'};
                console.log('add 1:');
                console.log(newAlert);
                props.onAddAlert(newAlert);
            }

            // creating or closing (adding or removing) an alert from the dashboard
            socket.on('new alert', (data) => {

                // closing (removing) analert
                if (data.action === 'Close') {
                    console.log('remove:');
                    console.log(data);
                    props.onRemoveAlert(data);

                    // loop through services and set their last available time to null if
                    // they don't have any outstanding alerts. This will zero their downtime.
                    const services = this.props._state.services;
                    const alerts = this.props._state.alerts;

                    for (var i = 0; i  < services.length; i++) {
                        const service = services[i].service;
                        const serviceAlerts = alerts.filter( (curr) => curr.alert.entity === service);
                        if (serviceAlerts.length == 0) {
                            props.onUpdateServiceDowntime(service, null)
                        }
                    }
                }

                // opening (adding) a new alert
                else if (data.action === 'Create') {
                    // when creating an alert we don't have the right field names yet to update services
                    // downtime and availability. So we wait till the 'update alert' to change services.
                    console.log('add 2:');
                    console.log(data);
                    props.onAddAlert(data);
                }
                else {
                    console.log('ERROR,received alert neither Close nor Create');
                    console.log(data);
                }

            });

            // updating an existing alert on the dashboard with additional essential information
            socket.on('update alert', (data) => {
                console.log('update:');
                console.log(data);
                // Now we have the fields (Entity) we need to update the services, so we do that here instead
                // of when the alert first arrives
                var entity = data.alert.entity;
                if ( typeof entity === 'undefined' || typeof entity === null || entity === "") {
                    data.alert.entity = 'NO ENTITY ASSIGNED';
                }
                else if (SERVICES_TRACKED.indexOf(entity) == -1) {
                    data.alert.entity += ' (UNKNOWN ENTITY)';
                }
                else {
                    const newTime = data.alert.createdAt / 1000000;
                    const services = this.props._state.services;
                    const thisService = services.filter( (curr) => curr.service === entity )[0];
                    if (thisService.last_time_available == null || thisService.last_time_available > newTime) {
                        props.onUpdateServiceDowntime(entity, newTime);
                    }
                }
                props.onUpdateAlert(data);
            });

            // for each alert, fi
            socket.emit('query')

        });

        // set the current time in the state to be updated every second
        tock.setInterval('clock', () => props.onUpdateTime(moment.utc().valueOf()), '1 second');

        // bind helper functions to 'this'
        this.timeDiff = this.timeDiff.bind(this);


    }

    render() {
        let {_state, onAddAlert, onUpdateServiceDowntime, onUpdateAlert} = this.props;
        return (
            <div>
                <AppBar
                    title="Services Health Dashboard"
                    showMenuIconButton={false}
                    style={appbarStyles.container}
                />
                <Card style={cardStyles.container}>
                    <CardHeader
                        title="Services"
                        style={cardHeaderStyles.container}
                    />
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Service</TableHeaderColumn>
                                <TableHeaderColumn>Availability</TableHeaderColumn>
                                <TableHeaderColumn>Downtime</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {_state.services.map(service =>
                                <TableRow key={service.service}>
                                    <TableRowColumn>{service.service}</TableRowColumn>
                                    <TableRowColumn>{service.availability}</TableRowColumn>
                                    <TableRowColumn>
                                        {this.timeDiff(_state.times.current_time, service.last_time_available)}
                                    </TableRowColumn>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Card>

                <Card style={cardStyles.container}>
                    <CardHeader
                        title="Alerts"
                        style={cardHeaderStyles.container}
                    />
                    <Table>
                        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                            <TableRow>
                                <TableHeaderColumn>Service</TableHeaderColumn>
                                <TableHeaderColumn>Timestamp UTC</TableHeaderColumn>
                                <TableHeaderColumn>Elapsed Time</TableHeaderColumn>
                                <TableHeaderColumn>Message</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                            {_state.alerts.map(_alert =>
                                <TableRow key={_alert.alert.id + _alert.alert.alias}>
                                    <TableRowColumn>{_alert.alert.entity}</TableRowColumn>
                                    <TableRowColumn>
                                        {moment.utc(_alert.alert.createdAt / 1000000).format('ddd M/D HH:mm')}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {this.timeDiff(_state.times.current_time, _alert.alert.createdAt / 1000000)}
                                    </TableRowColumn>
                                    <TableRowColumn>{_alert.alert.message}</TableRowColumn>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
                </Card>
            </div>
        )
    }



    timeDiff(current_time, alert_time) {
        if (alert_time == null) {
            return 'available'
        }

        const a = moment.utc(current_time);
        const b = moment.utc(alert_time);

        var days = a.diff(b, 'days');
        var hours  = a.diff(b, 'hours') % 24;
        var minutes =  a.diff(b, 'minutes') % 60;
        var seconds =  a.diff(b, 'seconds') % 60;

        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        if (seconds < 10) seconds = '0' + seconds;

        var time = '';
        time += hours + ':' + minutes + ':' + seconds;
        if (days > 0) {
            time = days + 'd ' + time;
        }
        return time;
    }
}

export default ContentCards;
