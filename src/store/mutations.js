import * as Types from './mutation-types'

const mutations = {
  [Types.ADD_TODO] (state, title) {
    state.todos.push({id: Date.now(), title, isFinished: false})
  },
  [Types.CHANGE_MODE] (state, mode) {
    state.mode = mode
  },
  [Types.DELETE_TODO] (state, id) {
    state.todos = state.todos.filter(item => item.id !== id)
  },
  [Types.SELECTED] (state, flag) {
    state.todos.forEach(item => {
      item.isFinished = flag
    })
  }
}
export default mutations
