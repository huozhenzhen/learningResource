<!--  -->
<template>
<div class="app-container">
    <h2>概述</h2>
    <p>Vue.js 使用了基于 HTML 的模板语法， 允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据(借鉴angular)</p>
    <p>在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统， Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少</p>
    <br>
    <h2>插值</h2>
    <div>Message: {{ msg }}</div>
    <div v-once>这个将不会改变: {{ msg }}</div>
    <el-input v-model="msg" style="width: 300px;"></el-input>
    <p>Using mustaches: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    <div>
        <a v-bind:[attributeName]="'url'"> link </a>
    </div>
    <div>
        <a v-on:[eventName]="doSomething"> link </a>
    </div>
    <br>

    <h2>指令</h2>

    <h4>v-if/v-else/v-else-if</h4>
    <h4>v-show</h4>
    <p>v-show是简单的样式切换，v-if是修改dom结构，一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好</p>
    <p>在 template 元素上使用 v-if 条件渲染分组</p>

    <h4>v-for</h4>
    <div v-for="item in items" v-bind:key="item.id">
        {{item.text}}
    </div>

    <h4>v-model</h4>
    <p>你可以用 v-model 指令在表单 input、textarea 及 select 元素上创建双向数据绑定</p>
    <p>-------修饰符lazy(不会立即改变，focus和enter的时候改变)</p>
    <i>{{msg1}}</i>
    <input v-model.lazy="msg1">
    <p>-------修饰符number</p>
    <p>这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。 如果这个值无法被 parseFloat() 解析，则会返回原始的值。</p>
    <input v-model.number="age" type="number">
    <input v-model="age1" type="number">
    <p>-------修饰符trim</p>
    <p>如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：</p>
    <input v-model.trim="msg">

    <h4>v-on</h4>
    <p>可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。</p>

    <button style="margin-bottom:20px" v-on:click="warn('Form cannot be submitted yet.', $event)">Submit</button>
    <div style="margin-left:30px;">
        <b>事件修饰符</b>
        <p>在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点， 但vue提倡关注数据，不关注dom。所以更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。 为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。</p>
        <p>.stop .prevent .capture .self .once .passive</p> 
        <div v-on:click="outer">
            <!-- 阻止单击事件继续传播 -->
            <a v-on:click="inner">stop-</a>
            <br>
            <br>
            <a v-on:click.stop="inner">stop+</a>
            <br>
            <br>
            <a v-on:click="inner"  href="#">stop.prevent-</a>
            <br>
            <br>

            <!-- 修饰符可以串联 -->
            <a v-on:click.stop.prevent="inner"  href="#">stop.prevent+</a>
            <br>
            <br>

            <!-- 只有修饰符 -->
            <a v-on:click.stop.prevent  href="#">只有stop.prevent+</a>
            <br>
            <br>
            <!-- 添加事件监听器时使用事件捕获模式 -->
            <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
            <div v-on:click.capture="capture">capture</div>
            <br>
            <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
            <!-- 即事件不是从内部元素触发的 -->
            <div v-on:click.self="inner">do</div>
            <br>
            <!-- 点击事件将只会触发一次 -->
            <a v-on:click.once="once">once</a>
            <br>
            <br>
        </div>
        <b>按键修饰符</b>
         <div>
            <!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
            <input v-on:keyup.enter="submit">
         </div>
        <div>
            <input v-on:keyup.13="submit">
        </div>
        <p>同理：.enter .tab .delete (捕获“删除”和“退格”键) .esc .space .up .down .left .right</p>
        <b>系统修饰键</b>
        <p> .ctrl .alt .shift .meta </p> 
        <b>鼠标按钮修饰符</b>
        <p>.left .right .middle</p>
    </div>


</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
    components: {},
    data() {
        return {
            msg: 'eee',
            age: "10",
            age1: '11',
            msg1: 'change',
            rawHtml: '<span style="color:#f00;">kkkkkkk</span>',
            attributeName: 'href',
            eventName: 'click',
            items: [{
                    id: 0,
                    text: '蔬菜'
                },
                {
                    id: 1,
                    text: '奶酪'
                },
                {
                    id: 2,
                    text: '随便其它什么人吃的东西'
                }
            ]
        }
    },
    computed: {},
    watch: {
        age(val) {
            console.log(val)
        },
        age1(val) {
            console.log(val)
        }
    },
    methods: {
        doSomething() {
            alert('222');
        },
        warn: function (message, event) {
            // 现在我们可以访问原生事件对象
            if (event) {
                event.preventDefault()
            }
            alert(message)
        },
        outer(){
            console.log("outer")
        },
        inner(){
            console.log("inner")
        },
        once(){
            console.log("once")
        },
        capture(){
            console.log('capture')
        },
        submit() {
            console.log('submit')
        }
    },
    created() {},
    mounted() {},
    destroyed() {}
}
</script>

<style lang="scss" scoped>

</style>
