import React, { Component } from "react";

class AuthButton extends React.Component {
    handleClick = (event) => {
        this.props.authStore.signout(
            () => window.history.pushState(null, null, "/")
        );
    }

    render() {
        return (
            <div>
                { this.props.authStore.isAuthenticated ? (
                    <button onClick={this.handleClick}>Sign out</button>
                )
                    : null
                }
                <br />
                <br />
            </div>
        );
    }
}

export default AuthButton;
