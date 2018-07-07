import React from "react";
import { inject, observer} from "mobx-react";
import {
    List,
    Segment,
    Button,
    Header
} from "semantic-ui-react"
import { Flex, Box } from "reflexbox"
import TodoDetails from "./TodoDetails"

@inject("todoStore") @observer
class TodoItem extends React.Component {
    state = {
        isHovered: false
    };

    handleDeleteClick = (event) => {
        let activeTodo = this.props.todo;
        this.props.todoStore.deleteTodo(activeTodo);
        event.stopPropagation();
    }

    handleSegmentClick = (event) => {
        this.props.todoStore.setActiveTodo(this.props.todo);
    }

    handleHoverOn = (event) => {
        this.setState({
            isHovered: true
        });
    }

    handleHoverOff = (event) => {
        this.setState({
            isHovered: false
        });
    }

    getTodoItemStyle = () => {
        let todoStyle = {
            marginBottom: "5px",
            marginTop: "5px",
            border: "3px solid"
        };
        todoStyle["color"] = this.state.isHovered ? "purple" : "black";
        return todoStyle;
    }

    render() {
        let todo = this.props.todo;
        return (
            <div>
                <TodoDetails todo={this.props.todo}/>
            <Segment
                className="inverted"
                size="large"
                style={this.getTodoItemStyle()}
                onMouseEnter={this.handleHoverOn}
                onMouseLeave={this.handleHoverOff}
                onClick={this.handleSegmentClick}
            >
                <List.Item>
                    <List.Content>
                        <Flex justify="space-between">
                            <Box>
                                <List.Header style={{color: "white"}}>
                                    {todo.title}
                                </List.Header>
                            </Box>
                            <Box>
                                <Button
                                    color="red"
                                    onClick={this.handleDeleteClick}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Flex>
                    </List.Content>
                </List.Item>
            </Segment>
            </div>
        )
    }
}

export default TodoItem;
