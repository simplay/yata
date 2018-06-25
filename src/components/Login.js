import React, { Component } from "react";
import { inject, observer} from "mobx-react";
import {
    Button,
    Form,
    Grid,
    Header,
    Segment
} from "semantic-ui-react"

import {
    Redirect
} from "react-router-dom"

@inject("authenticationStore")
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
        const { from } = this.props.location.state || { from: { pathname: "/todos" } }

        if (this.props.authenticationStore.isAuthenticated) {
            return <Redirect to={from} />
        }

        return (
            <div className="login-form">
                <Grid textAlign="center" verticalAlign="middle">
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h1" color="black" textAlign="center">
                            YATA
                        </Header>
                        <Form size="large">
                            <Segment stacked>
                                <Form.Input
                                    fluid icon="user"
                                    id="inputEmail"
                                    iconPosition="left"
                                    placeholder="Email"
                                    onChange={this.handleEmailChange}
                                />
                                <Form.Input
                                    id="inputPassword"
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Password"
                                    onChange={this.handlePasswordChange}
                                    type="password"
                                />
                                <Button
                                    color="black"
                                    fluid size="large"
                                    onClick={this.handleClick}
                                >
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default Login;
