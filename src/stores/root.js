import TodoStore from "./todo"
import AuthenticationStore from "./authentication"

class RootStore {
    constructor() {
        this.todoStore = new TodoStore(this);
        this.authenticationStore = new AuthenticationStore(this);
    }
}

let instance = window.store = new RootStore()
export default instance
