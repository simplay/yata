import React, { Component } from "react";
import { observer, Provider, inject } from "mobx-react";
import rootStore from "./stores/root"
import "./App.css";
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {
    RouterStore,
    syncHistoryWithStore
} from 'mobx-react-router';

import {
  Redirect
} from 'react-router-dom'


const ProtectedRoute = ({ authStore: authStore, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        authStore.isAuthenticated
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)

class AuthButton extends React.Component {
    handleClick = (event) => {
        this.props.authStore.signout(
            () => this.props.history.push('/')
        );
    }

    render() {
        return (
            <div>
                {
                    this.props.authStore.isAuthenticated
                    ? <button onClick={this.handleClick}>Sign out</button>
                    : null
                }
                <br />
                <br />
            </div>
        );
    }
}

@observer
class App extends Component {
    constructor(props) {
        super(props);
        this.browserHistory = createBrowserHistory();
        this.routingStore = new RouterStore();
        this.history = syncHistoryWithStore(this.browserHistory, this.routingStore);
    }

    render() {
        return (
            <Provider rootStore={rootStore}
                      todoStore={rootStore.todoStore}
                      authenticationStore={rootStore.authenticationStore}
                      routing={this.routingStore}>
                <Router history={this.history}>
                    <div className="App">
                        <AuthButton authStore={rootStore.authenticationStore} history={this.history}/>
                        <Route path="/" component={Login}/>
                        <ProtectedRoute path='/todos'
                                        component={TodoList}
                                        authStore={rootStore.authenticationStore} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
