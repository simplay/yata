import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Grid, Container, Item, Button, Checkbox, Form, Input } from 'semantic-ui-react'

@inject("todoStore") @observer
class TodoItem extends React.Component {
    handleClick = (event) => {
      let todoId = this.props.todo.id;
      this.props.todoStore.deleteTodo(todoId);
    }

    render() {
        let todo = this.props.todo;
        return (
          <Item>
              <Item.Content>
                  <Item.Header> {todo.title} </Item.Header>
                  <Item.Description> {todo.description} </Item.Description>
                  <Button color="red" onClick={this.handleClick}> Delete </Button>
              </Item.Content>
          </Item>
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
                <Item.Group>
                    { todos.map(todo => <TodoItem key={todo.id} todo={todo}/>) }
                </Item.Group>
            </div>
        )
    }
}

export default TodoList;
