<!--  -->
<template>
<div class="app-container">

    <h2>创建一个实例</h2>
    <p>
        当创建一个 Vue 实例时，你可以传入一个选项对象,
    </p>
    <pre>
          选项 / 数据 data props propsData computed methods watch
  
          选项 / DOM el template render renderError 
  
          选项 / 生命周期钩子 beforeCreate created beforeMount mounted beforeUpdate
           updated activated deactivated beforeDestroy destroyed errorCaptured 
  
          选项 / 资源 directives filters components 
  
          选项 / 组合 parent mixins extends provide / inject 
  
          选项 / 其它 name delimiters functional model inheritAttrs comments
      </pre>
    <p>你还需要明白所有的 Vue 组件都是 Vue 实例，并且接受相同的选项对象 (一些根实例特有的选项除外)。</P>
    <br>

    <h2>数据与方法</h2>
    <p>当一个 Vue 实例被创建时，它将 data 对象中的所有的属性加入到 Vue 的响应式系统中</p>
    <div>{{message}}</div>
    <el-input v-model="message" style="width: 300px;"></el-input>
    <p>除了数据属性，Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来。</p>
    <pre>
        例如：

        实例属性 vm.$data vm.$props vm.$el vm.$options vm.$parent vm.$root 
        vm.$children vm.$slots vm.$scopedSlots vm.$refs vm.$isServer vm.$attrs vm.$listeners

        实例方法 / 数据 vm.$watch vm.$set vm.$delete

        实例方法 / 事件 vm.$on vm.$once vm.$off vm.$emit

        实例方法 / 生命周期 vm.$mount vm.$forceUpdate vm.$nextTick vm.$destroy
      </pre>

    <h2>生命周期图示</h2>
    <div style="margin:0 auto;">
        <img src="./lifecycle.png" alt="" style="width:50%;">
    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            message :"lifecycle------",
        }
    },
    beforeCreate: function () {
        console.group('beforeCreate 创建前状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
        console.log("%c%s", "color:red", "data   : " + this.$data); //undefined 
        console.log("%c%s", "color:red", "message: " + this.message)
    },
    created: function () {
        console.group('created 创建完毕状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化 
        console.log("%c%s", "color:red", "message: " + this.message); //已被初始化
    },
    beforeMount: function () {
        console.group('beforeMount 挂载前状态===============》');
        console.log("%c%s", "color:red", "el     : " + (this.$el)); //已被初始化
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化  
        console.log("%c%s", "color:red", "message: " + this.message); //已被初始化  
    },
    mounted: function () {
        console.log(this)
        console.group('mounted 挂载结束状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
        console.log("%c%s", "color:red", "message: " + this.message); //已被初始化 
    },
    beforeUpdate: function () {
        console.group('beforeUpdate 更新前状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.message);
    },
    updated: function () {
        console.group('updated 更新完成状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.message);
    },
    beforeDestroy: function () {
        console.group('beforeDestroy 销毁前状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.message);
    },
    destroyed: function () {
        console.group('destroyed 销毁完成状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.message)
    }

}
</script>

<style lang="scss" scoped>

</style>
