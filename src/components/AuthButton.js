import React, { Component } from "react";

class AuthButton extends React.Component {
    handleClick = (event) => {
        this.props.authStore.signout(
            () => this.props.history.push("/")
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

export default AuthButton;
