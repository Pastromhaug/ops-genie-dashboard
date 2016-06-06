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
var moment = require('moment');

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
        socket.emit('client event', {first: 'clientevent'});
        socket.on('init alerts', (data) => {
            for (var i = 0; i < data.alerts.length; i++) {
                var newAlert = data.alerts[i];
                newAlert['username'] = newAlert['source'];
                const newAlert = {alert: newAlert, action: 'Create'};
                props.onAddAlert(newAlert);
            }
            socket.on('server event', (data) => {
                props.onAddAlert(data);
            });
            socket.on('update alert', (data) => {
                console.log('update alert data:');
                console.log(data);
                props.onUpdateAlert(data);
            });
        });
        console.log(moment.utc().valueOf());
        console.log(moment.utc(moment.utc().valueOf()).format('ddd M/D HH:mm'));
        props.onUpdateTime(moment.utc().valueOf());
        this.timeDiff = this.timeDiff.bind(this);


    }

    render() {
        let {_state, onAddAlert, onUpdateService, onUpdateAlert} = this.props;
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
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Service</TableHeaderColumn>
                                <TableHeaderColumn>Availability</TableHeaderColumn>
                                <TableHeaderColumn>Downtime</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {_state.services.map(service =>
                                <TableRow key={service.service}>
                                    <TableRowColumn>{service.service}</TableRowColumn>
                                    <TableRowColumn>{service.availability}</TableRowColumn>
                                    <TableRowColumn>{service.downtime}</TableRowColumn>
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
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Service</TableHeaderColumn>
                                <TableHeaderColumn>Timestamp UTC</TableHeaderColumn>
                                <TableHeaderColumn>Elapsed Time</TableHeaderColumn>
                                <TableHeaderColumn>Message</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {_state.alerts.map(_alert =>
                                <TableRow>
                                    <TableRowColumn>{_alert.alert.status}</TableRowColumn>
                                    <TableRowColumn>
                                        {moment.utc(_alert.alert.createdAt / 1000000).format('ddd M/D HH:mm')}
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        {this.timeDiff(_state.current_time, _alert.alert.createdAt / 1000000)}
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
        const a = moment.utc(current_time);
        const b = moment.utc(alert_time);

        const days = a.diff(b, 'days');
        const hours  = a.diff(b, 'hours') % 24;
        const minutes =  a.diff(b, 'minutes') % 60;
        const seconds =  a.diff(b, 'seconds') % 60;

        var time = '';
        time += hours + ':' + minutes + ':' + seconds;
        if (days > 0) {
            time = days + 'd ' + time;
        }
        return time;
    }
}

export default ContentCards;
