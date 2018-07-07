import TodoStore from "./todo"
import AuthenticationStore from "./authentication"
import NavigationStore from "./navigation"

class RootStore {
    constructor() {
        this.navigationStore = new NavigationStore(this);
        this.todoStore = new TodoStore(this);
        this.navigationStore = new NavigationStore(this);
        this.authenticationStore = new AuthenticationStore(this);
    }
}

const INSTANCE = new RootStore();
window.store = INSTANCE;

export default RootStore;
export { INSTANCE }
