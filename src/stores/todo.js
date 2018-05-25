import { getTodos } from "../api/todos"
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
}

export default TodoStore;
