import { performAuthentication } from "../api/authentication"
import { observable, action, computed} from "mobx"

class AuthenticationStore {
    @observable config = {}
    @observable success = false

    constructor(root) {
        this.root = root;
    }

    @computed
    get authToken() {
        return {headers: {'Authorization': this.config.auth_token}};
    }

    @action
    authenticate(credentials) {
        performAuthentication(credentials).then(res => {
            this.config = res.data;
            this.success = true;

        }).catch(error => {
            this.success = false;
        });
    }
}

export default AuthenticationStore;
