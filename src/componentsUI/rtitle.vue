<template>
  <div class="tit">
    <i class="icon fullbg img_index_chuanduo"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {}
};
</script>

<style scoped>
.tit {
  height: 48px;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(90deg, rgba(87, 199, 237, 0.5) 0%, rgba(87, 199, 237, 0) 100%);
  font-size: 1.3125em;
}
.icon {
  display: block;
  width: 1.64rem;
  height: 1.79rem;
  margin: 0 1rem 0 1.43rem;
}
</style>
