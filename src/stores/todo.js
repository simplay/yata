import { getTodos, createTodo, destroyTodo } from "../api/todos"
import { observable, action } from "mobx"

class TodoStore {
    @observable todos = [];
    @observable activeTodo = null;

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
    setActiveTodo(todo) {
        this.activeTodo = todo;
    }

    @action
    disableActiveTodo() {
        this.activeTodo = null;
    }

    @action
    saveTodo(params) {
        createTodo(params).then(res => {
            this.todos = res.data;
        })
    }

    @action
    deleteTodo(todoId) {
        destroyTodo(todoId).then(res => {
          this.todos = res.data;
        })
    }
}

export default TodoStore;
