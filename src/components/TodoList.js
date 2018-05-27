import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { List, Segment, Grid, Container, Item, Button, Checkbox, Form, Input } from 'semantic-ui-react'

@inject("todoStore") @observer
class TodoItem extends React.Component {
    handleClick = (event) => {
      let todoId = this.props.todo.id;
      this.props.todoStore.deleteTodo(todoId);
    }

    render() {
        let todo = this.props.todo;
        return (
            <Segment inverted>
                <List.Item>
                <List.Content>
                  <List.Header as='a'>{todo.title}</List.Header>
                  <Button color="red" onClick={this.handleClick}> Delete </Button>
                </List.Content>
              </List.Item>
            </Segment>

        )
    }
}

@inject("todoStore") @observer
class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };
    }

    handleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let todoParams = {title: this.state.title};
        this.props.todoStore.saveTodo(todoParams);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Input onChange={this.handleChange}
                                size="medium"
                                style={{minWidth:"30em"}}
                                placeholder='New Todo...' />
                </Form.Group>
            </Form>
        )
    }
}

@inject("todoStore") @observer
class TodoList extends React.Component {
    componentDidMount() {
        this.props.todoStore.loadTodos();
    }

    render() {
        let todos = this.props.todoStore.todos;
        return (
            <div>
                <Container>
                    <Grid centered>
                        <AddTodo />
                    </Grid>
                </Container>
                <List divided inverted relaxed>
                    { todos.map(todo => <TodoItem key={todo.id} todo={todo}/>) }
                </List>
            </div>
        )
    }
}

export default TodoList;
