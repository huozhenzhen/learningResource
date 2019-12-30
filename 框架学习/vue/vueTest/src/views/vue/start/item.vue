<template>
  <li>{{ todo.text }}</li>
</template>
<script>
export default {
  name: 'todoItem',
  props: {
     todo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
