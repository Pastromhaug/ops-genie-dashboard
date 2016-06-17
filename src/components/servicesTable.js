/**
 * Created by perandre on 6/7/16.
 */
import React from 'react';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cardHeaderStyles, cardStyles} from '../styles/contentCardsStyles';
import {timeDiff, calcAvailabilityPercent, calcSummedAvailabilityIntervals} from '../js/timeUtil';

class ServicesTable extends React.Component {
    render() {
        var state = this.props._state;
        var current_time = state.times.current_time
        return (
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
                            <TableHeaderColumn>Total Downtime</TableHeaderColumn>
                            <TableHeaderColumn>Current Downtime</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {state.services.map( (service) => {
                            var color;
                            if (service.last_time_available == null) color = 'rgb(200,225,200';
                            else color = 'rgb(285, 210, 210)';
                            return (
                            <TableRow key={service.service} style={{backgroundColor: color}}>
                                <TableRowColumn>{service.service}</TableRowColumn>
                                <TableRowColumn >
                                    {calcAvailabilityPercent(service, current_time)}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {timeDiff(calcSummedAvailabilityIntervals(service, current_time), 0)}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {timeDiff(current_time, service.last_time_available)}
                                </TableRowColumn>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
            </Card>
        )
    }
}

export default ServicesTable
