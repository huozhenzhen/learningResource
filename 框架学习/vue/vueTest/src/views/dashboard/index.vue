<template>
  <div class="dashboard-container">
    <div class="dashboard-text" @click="handleClick">name: {{ name }}</div>
    <my-child :test="testPP"></my-child>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import myChild from "./child";

export default {
  name: "Dashboard",
  data() {
    return {
      testPP: "11111111111",
    };
  },
  components: { myChild },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    handleClick(){
      this.testPP = '222222222222'
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
