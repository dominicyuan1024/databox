<!-- 大标题 -->
<template>
  <div class="maintitle img_bg">
    <p :class="icon" class="icon fullbg"></p>
    <p class="text">
      <slot></slot>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    }
  },
  components: {},
  data() {
    return {};
  },

  computed: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style scoped>
.maintitle {
  display: flex;
  height: 78px;
  background-size: 200px;
  background-repeat: no-repeat;
  background-position: 60px 10px;
}
.text {
  color: #fff;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 10px;
}
.icon {
  width: 78px;
  height: 78px;
}
</style>
