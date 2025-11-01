import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import indexRouter from "./views/index/route.js";
import gongluRouter from "./views/gonglu/route.js";
import tieluRouter from "./views/tielu/route.js";
import shuiyunRouter from "./views/shuiyun/route.js";
import minhangRouter from "./views/minhang/route.js";

Vue.use(Router);
export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [indexRouter, ...gongluRouter, shuiyunRouter, tieluRouter, minhangRouter]
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "./views/About.vue")
  // }
];
export default new Router({
  routes: routes
});
