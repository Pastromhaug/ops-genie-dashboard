/**
 * Created by perandre on 6/7/16.
 */
import React from 'react';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cardHeaderStyles, cardStyles} from '../styles/contentCardsStyles';
import {timeDiff} from '../js/timeUtil';
var moment = require('moment');

class AlertsTable extends React.Component {
    render() {
        return (
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
                        {this.props._state.alerts.map(_alert =>
                            <TableRow key={_alert.alert.id + _alert.alert.alias}>
                                <TableRowColumn>{_alert.alert.entity}</TableRowColumn>
                                <TableRowColumn>
                                    {moment.utc(_alert.alert.createdAt / 1000000).format('ddd M/D HH:mm')}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {timeDiff(this.props._state.times.current_time, _alert.alert.createdAt / 1000000)}
                                </TableRowColumn>
                                <TableRowColumn>{_alert.alert.message}</TableRowColumn>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </Card>
        )
    }
}

export default AlertsTable

