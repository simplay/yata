import api from "./base"

export function getTodos(config) {
    return api.get(`todos/`, config);
}

export function getTodo(todoId, config) {
    return api.get(`todos/${todoId}`, config);
}

export function createTodo(params, config) {
  return api.post(`todos/`, { todo: params }, config);
}

export function destroyTodo(todoId, config) {
  return api.delete(`todos/${todoId}`, config);
}

export function updateTodo(todoId, todoParams, config) {
  return api.patch(`todos/${todoId}`, {todo: todoParams}, config);
}
