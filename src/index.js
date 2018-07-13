import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'mobx-react'
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import { INSTANCE as rootStore } from './stores/root';
import { startRouter } from './router';


const Root = (
    <Provider
        rootStore={rootStore}
        navigationStore={rootStore.navigationStore}
        todoStore={rootStore.todoStore}
        authenticationStore={rootStore.authenticationStore}
        routing={this.routingStore}
    >
        <App />
    </Provider>
)

startRouter(rootStore.navigationStore);
ReactDOM.render(Root, document.getElementById("root"));
