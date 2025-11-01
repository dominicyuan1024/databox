import left from "./left.vue";
import right from "./right.vue";
import bottom from "./bottom.vue";

export default {
  path: "index",
  name: "index",
  label: "首页",
  components: {
    left: left,
    right: right,
    bottom: bottom
  }
};
