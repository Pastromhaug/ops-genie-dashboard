/**
 * Created by perandre on 6/7/16.
 */
import React from 'react';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cardHeaderStyles, cardStyles} from '../styles/contentCardsStyles';
import {timeDiff, displayUnixTime} from '../js/timeUtil';

class AlertsTable extends React.Component {
    render() {
        var state = this.props._state;
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
                        {state.alerts.map( (_alert) => {
                            var alert = _alert.alert;
                            var color;
                            var severity = alert.details.severity;
                            if (severity === 'risk' || severity === 'Risk') color = 'rgb(255, 255, 230)';
                            else color = 'rgb(255, 230, 230)';
                            return(
                            <TableRow key={alert.id + alert.alias} style={{backgroundColor: color}}>
                                <TableRowColumn>{alert.entity}</TableRowColumn>
                                <TableRowColumn>
                                    {displayUnixTime(alert.createdAt / 1000000)}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {timeDiff(state.times.current_time, alert.createdAt / 1000000)}
                                </TableRowColumn>
                                <TableRowColumn>{alert.message}</TableRowColumn>
                            </TableRow>
                            )})
                        }
                    </TableBody>
                </Table>
            </Card>
        )
    }
}

export default AlertsTable

