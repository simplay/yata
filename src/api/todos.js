import api from './base'

export function getTodos() {
    return api.get(`todos/`)
}

export function getTodo(todoId) {
    return api.get(`todos/${todoId}`)
}
