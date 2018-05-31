import { getTodos, createTodo, destroyTodo, updateTodo } from "../api/todos"
import { observable, action } from "mobx"

class TodoStore {
    @observable todos = [];
    @observable activeTodo = null;
    @observable config = {};

    constructor(root) {
        this.root = root;
        this.config = {
            headers: {'Authorization': ""}
        }
    }

    @action
    loadTodos() {
        getTodos(this.config).then(res => {
            this.todos = res.data;
        });
    }

    @action
    setActiveTodo(todo) {
        this.activeTodo = todo;
    }

    @action
    updateActiveTodo(activeTodo, todoParams) {
      updateTodo(activeTodo.id, todoParams, this.config).then(res => {
          this.todos = res.data;
      })
    }

    @action
    disableActiveTodo() {
        this.activeTodo = null;
    }

    @action
    saveTodo(params) {
        createTodo(params, this.config).then(res => {
            this.todos = res.data;
        })
    }

    @action
    deleteTodo(todo) {
        destroyTodo(todo.id, this.config).then(res => {
          this.todos = res.data;
        })
    }
}

export default TodoStore;
