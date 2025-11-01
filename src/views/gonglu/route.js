import gaosugonglu_left from "./gaosugonglu/left.vue";
import gaosugonglu_right from "./gaosugonglu/right.vue";
import gaosugonglu_bottom from "./gaosugonglu/bottom.vue";
import guoshenggandao_left from "./guoshenggandao/left.vue";
import guoshenggandao_right from "./guoshenggandao/right.vue";
import guoshenggandao_bottom from "./guoshenggandao/bottom.vue";
import nongcungonglu_left from "./nongcungonglu/left.vue";
import nongcungonglu_right from "./nongcungonglu/right.vue";

export default [
  {
    path: "/gaosugonglu",
    name: "/gaosugonglu",
    group: "公路建设",
    label: "高速公路",
    components: {
      left: gaosugonglu_left,
      right: gaosugonglu_right,
      bottom: gaosugonglu_bottom
    }
  },
  {
    path: "/guoshenggandao",
    name: "/guoshenggandao",
    group: "公路建设",
    label: "国省干道",
    components: {
      left: guoshenggandao_left,
      right: guoshenggandao_right,
      bottom: guoshenggandao_bottom
    }
  },
  {
    path: "/nongcungonglu",
    name: "/nongcungonglu",
    group: "公路建设",
    label: "农村公路",
    components: {
      left: nongcungonglu_left,
      right: nongcungonglu_right
    }
  }
];
