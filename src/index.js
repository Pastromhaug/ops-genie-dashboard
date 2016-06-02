/**
 * Created by perandre on 2/23/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import mainReducer from './reducers/index'
// Components
import Content from './components/content';
require('./styles/general.css');

const services = [
    {
        service: "Content",
        availability: '99.5%',
        downtime: '0:05'
    },
    {
        service: "DMH",
        availability: '92.5%',
        downtime: '0:00'
    },
    {
        service: "Insights",
        availability: '100%',
        downtime: '0:00'
    },
    {
        service: "Recommendations",
        availability: '99.3%',
        downtime: '0:02'
    }
];

const alerts = [
    "hey",
    "thre",
    'fjdk;as',
    'kffasdj',
    'me'
];



let store = createStore(mainReducer);


class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Content services={services} alerts={alerts} store={store}/>
            </MuiThemeProvider>
        )
    }
}

class Routing extends React.Component {
    render() {
        return (
            <Router history = {browserHistory}>
                <Route path="/" component = {App}/>
            </Router>
        )
    };
}

ReactDOM.render(<Routing/>, document.getElementById('main'));
