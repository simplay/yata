import React from 'react'
import { Header, Button, Icon } from "semantic-ui-react"

class SidebarItem extends React.Component {
    render() {
        return (
            <div className="sidebar-item">
                <Button
                    color="black"
                >
                    <Icon name={this.props.iconName} />
                    {this.props.label}
                </Button>
            </div>
        )
    }
}

class Sidebar extends React.Component {
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
                />
                <SidebarItem
                    label="Incomplete"
                    iconName="clipboard list"
                />
                <SidebarItem
                    label="Done"
                    iconName="clipboard check"
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
