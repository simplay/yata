import { observable, action } from "mobx"

class NavigationStore {
    @observable currentView = { name: '', id: null };
    @observable filter = 'all'

    routes = [
        { name: 'Todos', funct: this.showTodos.bind(this), key: 'todos' },
        { name: 'Login', funct: this.showLogin.bind(this), key: 'login' }
    ];

    constructor(root) {
        this.root = root;
    }

    @action showIndex() {
        if (this.root.authenticationStore.isAuthenticated) {
            this.showTodos();
        } else {
            this.showLogin();
        }
    }

    @action showTodos() {
        this.currentView = { name: 'todos', id: null }
        window.history.pushState(null, null, "/todos")
    }

    @action showLogin() {
        if (this.root.authenticationStore.isAuthenticated) {
            this.showTodos()
            window.history.pushState(null, null, "/todos")
        } else {
            this.currentView = { name: 'login', id: null }
        }
    }

    @action updateFilter(filter) {
        this.filter = filter;
    }
}

export default NavigationStore;
