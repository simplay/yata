import React, { Component } from "react";
import { observer, Provider } from "mobx-react";
import rootStore from "./stores/root"
import { Header, Container } from "semantic-ui-react"
import "./App.css";
import TodoList from "./components/TodoList";
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

@observer
class App extends Component {
    constructor(props) {
        super(props);
        this.browserHistory = createBrowserHistory();
        this.routingStore = new RouterStore();
        this.history = syncHistoryWithStore(this.browserHistory, this.routingStore);
    }
    render() {
        return (
            <Provider rootStore={rootStore}
                      todoStore={rootStore.todoStore}
                      routing={this.routingStore}>
                <Router history={this.history}>
                    <div className="App">
                        <Route path="/todos" component={TodoList} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
