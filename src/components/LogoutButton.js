import React from "react";
import { observer, inject } from "mobx-react";
import { Button, Icon } from "semantic-ui-react"

@inject("authenticationStore")
@observer
class AuthButton extends React.Component {
    handleClick = (event) => {
        this.props.authenticationStore.signout(
            () => window.history.pushState(null, null, "/")
        );
    }

    render() {
        return (
            <div id="signout-button">
                { this.props.authenticationStore.isAuthenticated ? (
                <Button.Group floated="right">
                    <Button
                        onClick={this.handleClick}
                        color="black"
                    >
                        <Icon name='sign out' />
                        Sign out
                    </Button>
                </Button.Group>
                )
                    : null
                }
            </div>
        );
    }
}

export default AuthButton;
