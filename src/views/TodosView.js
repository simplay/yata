import React, { Component } from "react";
import { inject, observer} from "mobx-react";
import { List, Grid } from "semantic-ui-react"
import AddTodo from "../components/todos/AddTodo"
import TodoItem from "../components/todos/TodoItem"

@inject("todoStore") @observer
class TodosView extends Component {
    componentDidMount() {
        this.props.todoStore.loadTodos();
    }

    render() {
        let todos = this.props.todoStore.todos;
        return (
            <div>
                <Grid centered>
                    <Grid.Row>
                        <AddTodo />
                    </Grid.Row>
                    <Grid.Row>
                        <List
                            divided
                            inverted
                            size='large'
                            style={{width:"60%"}}
                        >
                            { todos.map(todo => <TodoItem key={todo.id} todo={todo}/>) }
                        </List>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default TodosView;
