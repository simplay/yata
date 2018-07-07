import { Router } from 'director/build/director';
import { autorun } from 'mobx';

export function startRouter(store) {
    const routes = {
        "/todos/": () => {store.showTodos()},
        "/login/": () => {store.showLogin()}
    };

    // update state on url change
    new Router(routes).configure({
        notfound: () => store.showIndex(),
        html5history: true
    }).init();

    // update url on state changes
    autorun(() => {
        let path = store.currentPath;
        if (path !== window.location.pathname)
            window.history.pushState(null, null, path)
    })

}
