<!-- 小标题 -->
<template>
  <div class="subtitle">
    <p class="bef"><slot>我是标题</slot></p>
    <p class="aft fullbg img_bk2"><i class="trag fullbg img_bk1"></i></p>
  </div>
</template>

<script>
export default {
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
.subtitle {
  display: flex;
  color: #fff;
  font-size: 1.2em;
  font-weight: bold;
  display: flex;
  align-items: flex-end;
  padding: 10px 0;
  padding-right: 14px;
  line-height: 1;
}
.bef {
  border-left: 3px solid #fff;
  padding: 0 5px;
  flex-shrink: 0;
}
.aft {
  flex-grow: 1;
  height: 1px;
  margin-bottom: 3px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.trag {
  width: 10px;
  height: 6px;
  display: inline-block;
  margin-bottom: 4px;
}
</style>
