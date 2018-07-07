import { observable, action } from "mobx"

class NavigationStore {
    @observable currentView = { name: '', id: null };

    routes = [
        { name: 'Todos', funct: this.showTodos.bind(this), key: 'todos' },
        { name: 'Login', funct: this.showLogin.bind(this), key: 'login' }
    ];

    constructor(root) {
        this.root = root;
    }

    @action showIndex() {
        this.showTodos();
    }

    @action showTodos() {
        this.currentView = { name: 'todos', id: null }
        window.history.pushState(null, null, "/todos")
    }

    @action showLogin() {
        this.currentView = { name: 'login', id: null }
    }
}

export default NavigationStore;
