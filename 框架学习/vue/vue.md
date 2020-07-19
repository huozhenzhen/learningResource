## VUE 规范篇
- 编写vue使用的插件
  - 代码格式化插件推荐使用Prettier Formatter；
  - 高亮自动补全使用 Vetur
***
- 事件名推荐使用 kebab-case，而非 camelCase 或者 PascalCse,这是事件监听器在模板中对大小写不敏感，全部会转化为小写。

```v
//bad
    this.$emit('myEvent')
    <my-component @myevent="doSomething"><my-component>

//good
    this.$emit('my-event')
    <my-component @my-event="doSomething"><my-component>

```
***
- Prop 名大小写,ES6 中我们使用 camelCase，模板中使用 kebab-case

```v
//bad
    props: {
        'greeting-text': String
    }
    <WelcomeMessage greetingText="hi"/>
//good
    props: {
        greetingText: String
    }
    <WelcomeMessage greeting-text="hi"/>
```
***
- 组件名为至少两个单词，这样做为了防止和 html 本身得元素名称冲突

```v
//bad
    Vue.component('todo', {
        // ...
    })
//good
    Vue.component('todo-item', {
    // ...
    })
```
***
- prop 定义尽可能详细，避免错误数据进入组件

```v
//bad
    props: ['status']
//good
    props: {
         status: {
        type: String,
        required: true,
        validator: function (value) {
        return [
            'syncing',
            'synced',
            'version-conflict',
            'error'
        ].indexOf(value) !== -1
    }
  }
}
```
***
- 为 v-for 设置键值必要,总是用 key 配合 v-for。因为 vue 会惰性渲染，不加会造成一些不可预知得错误。

```v
//bad
    <ul>
        <li v-for="todo in todos">
            {{ todo.text }}
        </li>
    </ul>
//good
    <ul>
        <li
            v-for="todo in todos"
            :key = ""todo.id
        >
            {{ todo.text }}
        </li>
    </ul>
```
***
- 避免 v-if 和 v-for 用在一起，这里主要为了在重新渲染得时候，避免重复遍历整个列表

```v
//bad
    <ul>
        <li
            v-for="user in users"
            v-if="user.isActive"
            :key="user.id"
        >
            {{ user.name }}
        </li>
    </ul>
//good
    <ul>
        <li
            v-for="user in activeUsers"
            :key="user.id"
        >
            {{ user.name }}
        </li>
    </ul>
    computed: {
        activeUsers: function () {
            return this.users.filter(function (user) {
                return user.isActive
            })
        }
    }
```
***
- 业务开发中为组件样式设置作用域，理论上来说除了全局样式。局部样式不许删除是 scoped。这会造成你的样式覆盖其他人

```v
//bad
    <template>
        <button class="btn btn-close">X</button>
    </template>
    <style>
    .btn-close {
        background-color: red;
    }
    </style>

//good
    <template>
        <button class="button button-close">X</button>
    </template>
    <!-- 使用 `scoped` attribute -->
    <style scoped>
    .button {
    border: none;
        border-radius: 2px;
    }

    .button-close {
        background-color: red;
    }
    </style>
```
***
- 插件、混入等不考虑作为对外公共 API 的自定义私有属性使用 \$\_ 前缀。避免和其他开发人员冲突。

```v
//bad
    var myGreatMixin = {
     // ...
        methods: {
            update: function () {
            // ...
            }
        }
    }
//good
    var myGreatMixin = {
        // ...
        methods: {
            $_myGreatMixin_update: function () {
            // ...
            }
        }
    }
```
***
- 紧密耦合的组件名,和父组件紧密耦合的子组件应该以父组件名作为前缀命名,尽可能一眼看明白。

```v
//bad
    components/
    |- TodoList.vue
    |- TodoItem.vue
    |- TodoButton.vue
//good
    components/
    |- TodoList.vue
    |- TodoListItem.vue
    |- TodoListItemButton.vue
```
***
- 当组件定义多个属性时，每个属性都应该一行

```v
//bad
    <MyComponent foo="a" bar="b" baz="c"/>
//good
    <MyComponent
        foo="a"
        bar="b"
        baz="c"
    />
```
***
- 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法。

```v
//bad
<template>
    {{
        fullName.split(' ').map(function (word) {
            return word[0].toUpperCase() + word.slice(1)
        }).join(' ')
    }}
</template>
//good
<template>
    {{ normalizedFullName }}
</template>
// 复杂表达式已经移入一个计算属性
computed: {
  normalizedFullName: function () {
    return this.fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }
}

```
***
- 组件/实例的选项应该有统一的顺序。常用的需要有印象。方便别人查你的代码。

```

副作用 (触发组件外的影响)v
el

全局感知 (要求组件以外的知识)
name
parent

组件类型 (更改组件的类型)
functional

模板修改器 (改变模板的编译方式)
delimiters
comments

模板依赖 (模板内使用的资源)
components
directives
filters

组合 (向选项里合并属性)
extends
mixins

接口 (组件的接口)
inheritAttrs
model
props/propsData

本地状态 (本地的响应式属性)
data
computed

事件 (通过响应式事件触发的回调)
watch

生命周期钩子 (按照它们被调用的顺序)
beforeCreate
created
beforeMount
mounted
beforeUpdate
updated
activated
deactivated
beforeDestroy
destroyed

非响应式的属性 (不依赖响应系统的实例属性)
methods

渲染 (组件输出的声明式描述)
template/render
renderError
```
***
- 元素（组件）的attribute的顺序,常用的需要有印象。方便别人查你的代码。

```
定义 (提供组件的选项)

is
列表渲染 (创建多个变化的相同元素)

v-for
条件渲染 (元素是否渲染/显示)

v-if
v-else-if
v-else
v-show
v-cloak
渲染方式 (改变元素的渲染方式)

v-pre
v-once
全局感知 (需要超越组件的知识)

id
唯一的 attribute (需要唯一值的 attribute)

ref
key
双向绑定 (把绑定和事件结合起来)

v-model
其它 attribute (所有普通的绑定或未绑定的 attribute)

事件 (组件事件监听器)
v-on

内容 (覆写元素的内容)
v-html
v-text
```
***
- method的方法命名
```
    method 自定义方法命名
    动宾短语（good：jumpPage、openCarInfoDialog）（bad：go、nextPage、show、open、login）

    ajax 方法以 get、post 开头，以 data 结尾（good：getListData、postFormData,patchFormData）（bad：takeData、confirmData、getList、postForm）

    事件方法以 on 开头（onTypeChange、onUsernameInput）

    尽量使用常用单词开头（set、get、open、close、jump）

    驼峰命名（good: getListData）（bad: get_list_data、getlistData）
```
