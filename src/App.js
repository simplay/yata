import React, { Fragment } from "react";
import { observer, inject } from "mobx-react";
import "./App.css";
import Pager from "./views/Pager"
import Navigation from "./components/Navigation"
import LoginView from "./views/LoginView"
import LogoutButton from "./components/LogoutButton"

@inject("authenticationStore")
@observer
class App extends React.Component {
    render() {
        const contentStyle = {
            gridArea: "main",
            paddingTop: "20px",
            paddingRight: "20px",
            paddingLeft: "20px",
            overflowY: "auto"
        }

        return (
            <Fragment>
                { this.props.authenticationStore.isAuthenticated ? (
                    <div className="App">
                        <Navigation />
                        <div
                            id="content"
                            style={contentStyle}
                        >
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
