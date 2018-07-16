import React from 'react'
import { inject } from "mobx-react"
import { Header, Button, Icon } from "semantic-ui-react"

class SidebarItem extends React.Component {
    render() {
        return (
            <div className="sidebar-item">
                <Button
                    color="black"
                    onClick={this.props.handleClick}
                >
                    <Icon className={this.props.iconName} />
                    {this.props.label}
                </Button>
            </div>
        )
    }
}

@inject("navigationStore")
@inject("todoStore")
class Sidebar extends React.Component {
    loadAllTodos = (event) => {
        this.props.navigationStore.updateFilter('all');
        this.props.todoStore.loadTodos();
    }

    loadCompletedTodos = (event) => {
        this.props.navigationStore.updateFilter('completed');
        this.props.todoStore.loadTodos();
    }

    loadIncompleteTodos = (event) => {
        this.props.navigationStore.updateFilter('incomplete');
        this.props.todoStore.loadTodos();
    }

    render() {
        return (
            <div id="sidebar">
                <Header
                    as='h3'
                    inverted
                >
                    Filters
                </Header>
                <SidebarItem
                    label="All"
                    iconName="home"
                    handleClick={this.loadAllTodos}
                />
                <SidebarItem
                    label="Incomplete"
                    iconName="clipboard list"
                    handleClick={this.loadIncompleteTodos}
                />
                <SidebarItem
                    label="Done"
                    iconName="clipboard check"
                    handleClick={this.loadCompletedTodos}
                />
                <Header
                    as='h3'
                    inverted
                >
                    Labels
                </Header>
            </div>
        );
    }
};

export default Sidebar;
