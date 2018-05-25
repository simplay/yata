import React, { Component } from "react";
import { inject, observer } from "mobx-react";

class TodoRow extends Component {
    render() {
        let todo = this.props.todo;
        let title = `${todo.title}`
        return (
            <li> {title} </li>
        )
    }
}

@inject("todoStore") @observer
class TodoView extends Component {
    componentDidMount() {
        this.props.todoStore.loadTodos();
    }

    render() {
        let todos = this.props.todoStore.todos;
        return (
            <div>
                <h1> Todo List</h1>
                { todos.map(todo => <TodoRow key={todo.id} todo={todo}/>) }
            </div>
        )
    }
}

export default TodoView;
