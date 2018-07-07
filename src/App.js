import React, { Fragment } from "react";
import { observer, inject } from "mobx-react";
import "./App.css";
import Pager from "./views/Pager"
import LoginView from "./views/LoginView"
import LogoutButton from "./components/LogoutButton"

@inject("authenticationStore")
@observer
class App extends React.Component {
    render() {
        return (
            <Fragment>
                <LogoutButton
                    authStore={this.props.authenticationStore}
                 />
                { this.props.authenticationStore.isAuthenticated ? (
                    <div className="App">
                        <div id="content">
                           <Pager />
                        </div>
                    </div>
                )
                    : <LoginView />
                }
            </Fragment>
        );
    }
}

export default App;
