import api from "./base"

export function getTodos() {
    return api.get(`todos/`);
}

export function getTodo(todoId) {
    return api.get(`todos/${todoId}`);
}

export function createTodo(params) {
  return api.post(`todos/`, { todo: params });
}

export function destroyTodo(todoId) {
  return api.delete(`todos/${todoId}`);
}
