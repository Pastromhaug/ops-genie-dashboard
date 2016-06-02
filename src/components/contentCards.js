/**
 * Created by perandre on 5/2/16.
 */

import React from 'react';
import AppBar from 'material-ui/AppBar';
import VisibleServicesTable from './visibleServicesTable';
import VisibleAlertsList from './visibleAlertsList';
import {Card,CardHeader, CardTitle} from 'material-ui/Card';


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


class ContentCards extends React.Component() {

    render() {
        return (
            <div>
                <AppBar onClick={onNewAlert('eyyy')}
                        title="Services Health Dashboard"
                        showMenuIconButton={false}
                        style={appbarStyles.container}
                />

                <Card style={cardStyles.container}>
                    <CardHeader
                        title="Status of Services"
                        style={cardHeaderStyles.container}
                    />

                </Card>

                <Card style={cardStyles.container}>
                    <CardHeader
                        title="Alerts"
                        style={cardHeaderStyles.container}
                    />

                </Card>
            </div>
        )
    }
}

export default ContentCards;

//<VisibleServicesTable/>
//<VisibleAlertsList/>