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
