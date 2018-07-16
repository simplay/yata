import api from "./base"

export function getTodos(config) {
    return api.get(`todos/`, config);
}

export function getIncompleteTodos(config) {
    return api.get(`todos/incomplete`, config);
}

export function getCompletedTodos(config) {
    return api.get(`todos/completed`, config);
}

export function getTodo(todoId, config) {
    return api.get(`todos/${todoId}`, config);
}

export function createTodo(params, filter, config) {
  return api.post(`todos/`, { todo: params, filter: filter}, config);
}

export function destroyTodo(todoId, config) {
  return api.delete(`todos/${todoId}`, config);
}

export function updateTodo(todoId, todoParams, filter, config) {
  return api.patch(`todos/${todoId}`, {todo: todoParams, filter: filter}, config);
}
