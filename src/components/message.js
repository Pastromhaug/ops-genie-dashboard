/**
 * Created by perandre on 2/24/16.
 */
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
require('../styles/components/message.css');

class Message extends React.Component {

    render() {
        return (
            <div className="vd-message">
                <RaisedButton label="Default" />
            </div>
        );
    }
}

export default Message;

