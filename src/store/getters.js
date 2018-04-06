export const todos = state => state.todos
export const mode = state => state.mode
export const finishTodos = state => {
  return state.todos.filter(item => !item.isFinished)
}
export const finishedTodos = state => {
  return state.todos.filter(item => item.isFinished)
}
