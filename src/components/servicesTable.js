/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const ServicesTable = ({services, onChange}) => (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHeaderColumn>Service</TableHeaderColumn>
                <TableHeaderColumn>Availability</TableHeaderColumn>
                <TableHeaderColumn>Downtime</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody>
            {services.map( service =>
                <TableRow key={service.service}>
                    <TableRowColumn>{service.service}</TableRowColumn>
                    <TableRowColumn>{service.availability}</TableRowColumn>
                    <TableRowColumn>{service.downtime}</TableRowColumn>
                </TableRow>
            )}
        </TableBody>
    </Table>
);

export default ServicesTable