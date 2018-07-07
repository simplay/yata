import { performAuthentication } from "../api/authentication"
import { observable, action, computed} from "mobx"

class AuthenticationStore {
    @observable config = {}
    @observable isAuthenticated = false;

    constructor(root) {
        this.root = root;
        this.config = JSON.parse(localStorage.getItem("config")) || {}
        this.isAuthenticated = JSON.parse(localStorage.getItem("success")) || false
    }

    @computed
    get authToken() {
        return {
            headers: {"Authorization": this.config.auth_token}
        };
    }

    @action
    authenticate(credentials) {
        return performAuthentication(credentials).then(res => {
            this.config = res.data;
            this.isAuthenticated = true;
            localStorage.setItem("config", JSON.stringify(this.config));
            localStorage.setItem("success", true);
            this.root.navigationStore.showTodos();
        }).catch(error => {
            console.log("error")
        });
    }

    @action
    signout(callback) {
        this.config = {};
        this.isAuthenticated = false;
        localStorage.clear();
        setTimeout(callback, 100)
    }
}

export default AuthenticationStore;
