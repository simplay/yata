import {
    getTodos,
    getIncompleteTodos,
    getCompletedTodos,
    createTodo,
    destroyTodo,
    updateTodo
} from "../api/todos"
import { observable, action, computed } from "mobx"

class TodoStore {
    @observable todos = [];
    @observable activeTodo = null;

    constructor(root) {
        this.root = root;
    }

    @computed
    get config() {
        return this.root.authenticationStore.authToken;
    }

    @action loadTodos() {
        return getTodos(this.config).then(res => {
            this.todos = res.data;
        });
    }

    @action loadIncompleteTodos() {
        return getIncompleteTodos(this.config).then(res => {
            this.todos = res.data;
        });
    }

    @action loadCompletedTodos() {
        return getCompletedTodos(this.config).then(res => {
            this.todos = res.data;
        });
    }

    @action
    setActiveTodo(todo) {
        this.activeTodo = todo;
    }

    @action
    updateActiveTodo(activeTodo, todoParams) {
        return updateTodo(activeTodo.id, todoParams, this.config).then(res => {
            this.todos = res.data;
        })
    }

    @action
    disableActiveTodo() {
        this.activeTodo = null;
    }

    @action
    saveTodo(params) {
        return createTodo(params, this.config).then(res => {
            this.todos = res.data;
        })
    }

    @action
    deleteTodo(todo) {
        return destroyTodo(todo.id, this.config).then(res => {
          this.todos = res.data;
        })
    }
}

export default TodoStore;
