import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Item, Button, Checkbox, Form, Input } from 'semantic-ui-react'

class TodoItem extends React.Component {
    render() {
        let todo = this.props.todo;
        let title = `${todo.title}`
        return (
          <Item>
              <Item.Content>
                  <Item.Header> {title} </Item.Header>
                  <Item.Description> Foobar </Item.Description>
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
        let todoParams = {title: this.state.title}
        this.props.todoStore.saveTodo(todoParams);
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Input onChange={this.handleChange} placeholder='New Todo...' />
                    <Form.Button>Submit</Form.Button>
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
                <AddTodo />
                <Item.Group>
                    { todos.map(todo => <TodoItem key={todo.id} todo={todo}/>) }
                </Item.Group>

            </div>
        )
    }
}

export default TodoList;
