<template>
  <div class="app-container">
    <h2>vue是什么</h2>
    <ul>
      <li>一套用于构建用户界面的渐进式框架</li>
      <li>单文件组件</li>
      <li>组件系统和数据绑定</li>
      <li>虚拟dom</li>
      <li>结合vue生态，Vue 也完全能够为复杂的单页应用提供驱动</li>
    </ul>
    <br>
    <h2>声明式渲染</h2>
    <div>{{message}}</div>
    <br>
    <h2>条件与循环</h2>
    <ol>
      <li v-for="todo in todos">
        {{ todo.text }}
      </li>
    </ol>
    <br>
    <h2>处理用户输入</h2>
    <div>{{message}}</div>
    <button v-on:click="reverseMessage">反转消息</button>
    
    <h2>组件化应用构建</h2>
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </div>
</template>

<script>
import todoItem from './item';


export default {
  components:{ todoItem},
  name: 'start',
  data() {
    return {
      message: 'Hello Vue!',
      todos: [
        { text: '学习 JavaScript' },
        { text: '学习 Vue' },
        { text: '整个牛项目' }
      ],
      isActive: true,
      groceryList: [
      { id: 0, text: '蔬菜' },
      { id: 1, text: '奶酪' },
      { id: 2, text: '随便其它什么人吃的东西' }
    ]
    }
  },
 
  computed: {
   
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    },
     toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
  }
}
</script>
