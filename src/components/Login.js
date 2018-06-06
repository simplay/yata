import React, { Component } from "react";
import { inject, observer} from "mobx-react";
import {
    Redirect
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

export default Login;
