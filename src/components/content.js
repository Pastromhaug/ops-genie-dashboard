/**
 * Created by perandre on 5/2/16.
 */

import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import YouTube from 'react-youtube'



const cardHeaderStyles = {
    container: {
        backgroundColor: 'rgb(232,232,232)'
    }
};

const cardStyles = {
    container: {
        margin: '16px'
    }
};

const appbarStyles = {
    container: {
        marginBottom: '32px',
        textAlign: 'center'
    }
};






class Content extends React.Component{
    render() {

        var serviceTableList = this.props.services.map(function(service) {
            return (
                <TableRow key={service.service}>
                    <TableRowColumn>{service.service}</TableRowColumn>
                    <TableRowColumn>{service.availability}</TableRowColumn>
                    <TableRowColumn>{service.downtime}</TableRowColumn>
                </TableRow>
            );
        });

        var alertsList = this.props.alerts.map(function(alert) {
            return (
                <ListItem primaryText={alert}/>
            );
        });

        return(
            <div>
                <AppBar
                    title="Services Health Dashboard"
                    showMenuIconButton={false}
                    style = {appbarStyles.container}
                />
                <Card style={cardStyles.container} >
                    <CardHeader
                        title="Status of Services"
                        style = {cardHeaderStyles.container}
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
                            {serviceTableList};
                        </TableBody>
                    </Table>
                </Card>
                <Card style={cardStyles.container} >
                    <CardHeader
                        title="Alerts"
                        style = {cardHeaderStyles.container}
                    />
                    <List>
                        {alertsList}
                    </List>
                </Card>
            </div>
        )
    };
}

export default Content;