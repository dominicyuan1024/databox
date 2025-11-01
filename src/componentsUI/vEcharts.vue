// 图表组件
<template>
  <div :style="cssStyle" class="v-echart">
    <div ref="chart" class="v-echart-container"></div>
    <iframe ref="resizer" class="v-echart-resizer"></iframe>
  </div>
</template>

<script>
import { setTimeout } from "timers";
let _echarts;
export default {
  components: {},
  props: {
    id: [String, Number],
    option: Object,
    width: [String, Number],
    height: [String, Number],
    resizable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {
    cssStyle() {
      return { width: this.width, height: this.height };
    }
  },
  watch: {
    option() {
      if (!this.$chart) return;
      this.$chart.setOption(this.option);
    },
    resizable(val) {
      if (!this.$chart) return;
      if (val) {
        this.resizeListnener();
      } else {
        this.resizeRemover();
      }
    }
  },
  methods: {
    chartInit() {
      this.$chart = _echarts.init(this.$refs.chart);
      this.option && this.$chart.setOption(this.option);
      this.$emit("inited", this.id, this.$chart);
    },
    resizeHandle() {
      if (this.$resizeTimer) clearTimeout(this.$resizeTimer);
      this.$resizeTimer = setTimeout(() => {
        this.$chart && this.$chart.resize();
        this.$emit("resize");
      }, 400);
    },
    resizeListnener() {
      // 容器尺寸变化监听,节流 400 毫秒
      this.$refs.resizer.contentWindow.window.document.body.onresize = () => {
        this.resizeHandle();
      };
    },
    resizeRemover() {
      clearTimeout(this.$resizeTimer);
      this.$refs.resizer.contentWindow.window.document.body.onresize = null;
    }
  },
  created() {},
  mounted() {
    this.resizable && this.resizeListnener();
    // 初始化echarts,延迟一个轮询执行
    if (!_echarts) _echarts = window.echarts;
    if (!_echarts) return console.error("无法找到 echarts 对象，请确认 echarts 代码是否加载成功！");
    setTimeout(this.chartInit, 0);
  },
  activated() {
    this.resizable && this.resizeListnener();
  },
  beforeDestroy() {}
};
</script>

<style>
.v-echart {
  position: relative;
}
.v-echart,
.v-echart-container {
  width: 100%;
  height: 100%;
  display: "inline-block";
}
.v-echart-container > div {
  min-width: 50%;
  min-height: 50%;
}
.v-echart-resizer {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background: #f00;
  z-index: -1000;
  opacity: 0;
}
</style>
