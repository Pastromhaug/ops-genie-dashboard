/**
 * Created by perandre on 6/2/16.
 */

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';


const AlertsList = ({alerts, onAddAlert}) => (
    <div>
        <FlatButton label="Default" onClick={() => onAddAlert('hey2')} />
        <List>
            {alerts.map( alert =>
                <ListItem primaryText={alert} key={alert}/>
            )}
        </List>
    </div>
);


export default AlertsList
