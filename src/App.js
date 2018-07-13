import React, { Fragment } from "react";
import { observer, inject } from "mobx-react";
import Navigation from "./components/layout/Navigation"
import Sidebar from "./components/layout/Sidebar"
import Pager from "./components/layout/Pager"
import LoginView from "./views/LoginView"

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
