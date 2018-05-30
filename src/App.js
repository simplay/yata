import React, { Component } from "react";
import { observer, Provider } from "mobx-react";
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

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

class Login extends React.Component {
    state = {
        redirectToReferrer: false,
        enteredPassword: ""
    }

    hasValidPasswordEntered = () => {
        return process.env.REACT_APP_LOGIN_PASSWORD === this.state.enteredPassword;
    }

    login = () => {
        fakeAuth.authenticate(() => {
            this.setState(() => ({
                redirectToReferrer: this.hasValidPasswordEntered()
            }))
        })
    }

    handleChange = (event) => {
        this.setState({ enteredPassword: event.target.value });
        console.log(this.state.enteredPassword)
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/todos' } }
        const redirectToReferrer = this.state.redirectToReferrer;

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            <div>
                <p>You must log in to view the page</p>
                <input type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    onChange={this.handleChange}
                    required/>
                <button onClick={this.login}>Log in</button>
            </div>
        )
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        fakeAuth.isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} />
    )} />
)

const AuthButton = withRouter(({ history }) => (
    fakeAuth.isAuthenticated ? (
        <p>
            Welcome! <button onClick={() => {
                fakeAuth.signout(() => history.push('/'))
            }}>Sign out</button>
    </p>
    ) : (
        <p>You are not logged in.</p>
    )
))

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
                      routing={this.routingStore}>
                <Router history={this.history}>
                    <div className="App">
                        <AuthButton/>
                        <Route path="/" component={Login}/>
                        <PrivateRoute path='/todos' component={TodoList} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
