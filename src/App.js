import React, { Fragment } from "react";
import { observer, inject } from "mobx-react";
import "./App.css";
import Pager from "./views/Pager"
import Navigation from "./components/Navigation"
import Sidebar from "./components/Sidebar"
import LoginView from "./views/LoginView"
import LogoutButton from "./components/LogoutButton"

@inject("authenticationStore")
@observer
class App extends React.Component {
    render() {
        return (
            <Fragment>
                { this.props.authenticationStore.isAuthenticated ? (
                    <div id="app">
                        <Navigation />
                        <Sidebar />
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
