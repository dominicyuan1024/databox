import Vue from "vue";
/*
    echarts图表组件
    使用详情查看 ./vTab_demo.vue
    <vEcharts width="100%" height="8.7rem" :option="chartOption"></vEcharts>
*/
import vEcharts from "../componentsUI/vEcharts.vue";
Vue.component("vEcharts", vEcharts);
import rtitle from "./rtitle.vue";
Vue.component("rtitle", rtitle);
import subTitle from "./subTitle.vue";
Vue.component("subTitle", subTitle);
import mainTitle from "./mainTitle.vue";
Vue.component("mainTitle", mainTitle);
