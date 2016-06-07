/**
 * Created by perandre on 6/7/16.
 */
import React from 'react';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {cardHeaderStyles, appbarStyles, cardStyles} from '../styles/contentCardsStyles';
import {timeDiff} from '../js/componentCardsUtil';

class ServicesTable extends React.Component {
    render() {
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
                            <TableHeaderColumn>Downtime</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.props._state.services.map(service =>
                            <TableRow key={service.service}>
                                <TableRowColumn>{service.service}</TableRowColumn>
                                <TableRowColumn>{service.availability}</TableRowColumn>
                                <TableRowColumn>
                                    {timeDiff(this.props._state.times.current_time, service.last_time_available)}
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        )
    }
}

export default ServicesTable

