import React, { Component } from "react";
import { observer, Provider, inject } from "mobx-react";
import rootStore from "./stores/root"
import { Header, Container } from "semantic-ui-react"
import "./App.css";
import TodoList from "./components/TodoList";
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {
    RouterStore,
    syncHistoryWithStore
} from 'mobx-react-router';

import {
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

@inject('authenticationStore')
@observer
class Login extends React.Component {
    state = {
        enteredPassword: "",
        enteredEmail: ""
    }

    handleClick = (event) => {
        let authStore = this.props.authenticationStore;
        let credentials = {
            "email": this.state.enteredEmail,
            "password": this.state.enteredPassword
        }
        authStore.authenticate(credentials);
    }

    handleEmailChange = (event) => {
        this.setState({ enteredEmail: event.target.value });
    }

    handlePasswordChange = (event) => {
        this.setState({ enteredPassword: event.target.value });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/todos' } }

        if (this.props.authenticationStore.isAuthenticated) {
            return <Redirect to={from} />
        }

        return (
            <div>
                <h1>YATA</h1>
                <input type="text"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email"
                    onChange={this.handleEmailChange}
                    required/>
                <br />
                <input type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
                    required/>
                <br />
                <br />
                <button onClick={this.handleClick}>Log in</button>
            </div>
        )
    }
}

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
