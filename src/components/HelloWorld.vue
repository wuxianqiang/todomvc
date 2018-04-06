<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <span>全选择/不全选</span>
      <input type="checkbox" name="selectAll" v-model="flag">
      <input type="text" name="title" v-model="title" @keyup.enter="addOne">
    </div>
    <div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div  v-if="cur!==item" @dblclick="changeCur(item)">
            <input type="checkbox" name="isFinished" v-model="item.isFinished">
            <span>{{item.title}}</span>
            <button @click="deleteTodo(item.id)">删除</button>
          </div>
          <div>
            <input type="text" v-model="item.title" v-if="cur===item" @blur="clearCur" />
          </div>
        </li>
      </ul>
    </div>
    <div>
      <span v-if="count">{{count}}个任务</span>
      <button @click="modeType(0)">看全部</button>
      <button @click="modeType(1)">待完成</button>
      <button @click="modeType(2)">已完成</button>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapGetters} from 'vuex'
import {todoMode} from '../common/js/mode'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'todos',
      title: '',
      cur: ''
    }
  },
  computed: {
    list () {
      if (this.mode === todoMode.all) {
        return this.todos
      }
      if (this.mode === todoMode.finish) {
        return this.finishTodos
      }
      if (this.mode === todoMode.finished) {
        return this.finishedTodos
      }
    },
    count () {
      return this.finishTodos.length
    },
    flag: {
      get () {
        return this.count === 0
      },
      set (val) {
        this.selected(val)
      }
    },
    ...mapGetters(['todos', 'mode', 'finishTodos', 'finishedTodos'])
  },
  methods: {
    addOne () {
      this.addTodo(this.title)
      this.title = ''
    },
    modeType (num) {
      if (num === todoMode.all) {
        this.changeMode(todoMode.all)
      }
      if (num === todoMode.finish) {
        this.changeMode(todoMode.finish)
      }
      if (num === todoMode.finished) {
        this.changeMode(todoMode.finished)
      }
    },
    changeCur (cur) {
      this.cur = cur
    },
    clearCur () {
      this.cur = ''
    },
    ...mapMutations({
      addTodo: 'ADD_TODO',
      changeMode: 'CHANGE_MODE',
      deleteTodo: 'DELETE_TODO',
      selected: 'SELECTED'
    })
  },
  watch: {
    todos: {
      deep: true,
      handler (val) {
        localStorage.setItem('TODO', JSON.stringify(val))
      }
    }
  }
}
</script>

<style scoped>
ul,
li {
  list-style: none;
}
* {
  margin: 0;
  padding: 0;
}
</style>
