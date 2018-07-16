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
        switch(this.root.navigationStore.filter) {
            case 'all':
                return this.loadAllTodos();
            case 'incomplete':
                return this.loadIncompleteTodos();
            case 'completed':
                return this.loadCompletedTodos();
            default:
                return this.loadAllTodos();
        }
    }

    @action loadAllTodos() {
        return getTodos(this.config).then(res => {
            this.todos.replace(res.data);
        });
    }

    @action loadIncompleteTodos() {
        return getIncompleteTodos(this.config).then(res => {
            this.todos.replace(res.data);
        });
    }

    @action loadCompletedTodos() {
        return getCompletedTodos(this.config).then(res => {
            this.todos.replace(res.data);
        });
    }

    @action
    setActiveTodo(todo) {
        this.activeTodo = todo;
    }

    @action
    updateActiveTodo(activeTodo, todoParams) {
        const filter = this.root.navigationStore.filter;
        return updateTodo(activeTodo.id, todoParams, filter, this.config).then(res => {
            this.todos = res.data;
        })
    }

    @action
    disableActiveTodo() {
        this.activeTodo = null;
    }

    @action
    saveTodo(params) {
        const filter = this.root.navigationStore.filter;
        return createTodo(params, filter, this.config).then(res => {
            this.todos = res.data;
        })
    }

    @action
    deleteTodo(todo) {
        return destroyTodo(todo.id, this.config).then(res => {
            this.loadTodos();
        })
    }
}

export default TodoStore;
