import {todoMode} from '../common/js/mode'
const state = {
  todos: JSON.parse(localStorage.getItem('TODO') || '[]'),
  mode: todoMode.all
}
export default state
