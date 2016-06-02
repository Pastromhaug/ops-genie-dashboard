/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';


const ServicesTable = ({services, onChange}) => (
    <div>
        <FlatButton label="Default" onClick={() => onChange('hey2', "042342", "23%")} />
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
    </div>
);

export default ServicesTable