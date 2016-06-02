/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import {List, ListItem} from 'material-ui/List';


const AlertsList = ({alerts, onChange}) => (
    <List>
        {alerts.map( alert =>
            <ListItem primaryText={alert} key={alert}/>
        )}
    </List>
);

export default AlertsList
