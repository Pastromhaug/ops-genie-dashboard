/**
 * Created by perandre on 6/7/16.
 */
import React from 'react';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cardHeaderStyles, cardStyles, tableRow, tables} from '../styles/contentCardsStyles';
import {timeDiff, calcAvailabilityPercent, calcSummedAvailabilityIntervals} from '../js/timeUtil';

var serviceTable = Object.assign({},tables);
serviceTable.width='400';

class ServicesTable extends React.Component {
    render() {
        var state = this.props._state;
        var current_time = state.times.current_time;
        return (
            <Card style={cardStyles.container}>
                <CardHeader
                    title="Services"
                    style={cardHeaderStyles.container}
                />
                <Table style={serviceTable}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn style={{width:100}}>Service</TableHeaderColumn>
                            <TableHeaderColumn style={{width:100}}>Availability</TableHeaderColumn>
                            <TableHeaderColumn style={{width:100}}>Total Downtime</TableHeaderColumn>
                            <TableHeaderColumn >Current Downtime</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {state.services.map( (service) => {
                            var color;
                            if (service.last_time_available == null) color = 'rgb(200,225,200';
                            else color = 'rgb(285, 210, 210)';
                            var this_row = Object.assign({}, tableRow);
                            this_row.backgroundColor = color;
                            return (
                            <TableRow key={service.service} style={this_row}>
                                <TableRowColumn style={{width:100}}>{service.service}</TableRowColumn>
                                <TableRowColumn style={{width:100}}>
                                    {calcAvailabilityPercent(service, current_time)}
                                </TableRowColumn>
                                <TableRowColumn style={{width:100}}>
                                    {timeDiff(calcSummedAvailabilityIntervals(service, current_time), 0)}
                                </TableRowColumn>
                                <TableRowColumn style={{width:100}}>
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
