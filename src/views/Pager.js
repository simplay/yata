import React from "react";
import { inject, observer } from "mobx-react"
import TodosView from "./TodosView"
import LoginView from "./LoginView"

const routingTable = {
    todos: { view: () => <TodosView />},
    login: { view: () => <LoginView />}
}

@inject("navigationStore")
@observer
class Pager extends React.Component {
    render() {
        const navigationStore = this.props.navigationStore;
        const route = routingTable[navigationStore.currentView.name];
        if (route == null) {
            this.props.navigationStore.showIndex();
        }
        return (
            route ? route.view() : 'No view available!'
        );
    }
}

export default Pager;
