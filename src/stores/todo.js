import { getTodos, createTodo } from "../api/todos"
import { observable, action } from "mobx"

class TodoStore {
    @observable todos = [];

    constructor(root) {
        this.root = root;
    }

    @action
    loadTodos() {
        getTodos().then(res => {
            this.todos = res.data;
        })
    }

    @action
    saveTodo(params) {
        createTodo(params).then(res => {
            this.todos = res.data;
        })
    }
}

export default TodoStore;
