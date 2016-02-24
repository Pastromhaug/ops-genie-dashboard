/**
 * Created by perandre on 2/23/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Message from './components/message';

class App extends React.Component {
    render() {
        return (
            <div>
                <Message/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('main'));
