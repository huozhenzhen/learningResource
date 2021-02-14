<template>
  <div>
    <div>name:{{ test }}--------------------{{ testVal }}</div>
    <el-input v-model="xx"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "myChild",
  props: ["test"],
  computed: {
    testVal() {
      return this.test;
    },
    xx: {
      get() {
        return this.test;
      },
      set(val) {
        console.log(val)
        return val;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
