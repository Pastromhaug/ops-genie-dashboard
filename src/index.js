/**
 * Created by perandre on 2/23/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, browserHistory } from 'react-router';
// Components
import Content from './components/content';
require('./styles/general.css');

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Content/>
            </MuiThemeProvider>
        )
    }
}

class Routes extends React.Component {
    render() {
        return (
            <Router history = {browserHistory}>
                <Route path="/" component = {App}/>
            </Router>
        )
    };
}

ReactDOM.render(<Routes/>, document.getElementById('main'));
