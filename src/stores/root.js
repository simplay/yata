import TodoStore from "./todo"

class RootStore {
    constructor() {
        this.todoStore = new TodoStore(this);
    }
}

let instance = window.store = new RootStore()
export default instance
