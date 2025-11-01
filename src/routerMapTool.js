/* 与路由的配置方式相同，若你的组件相关文件特别大，应考虑使用异步加载 */
import analysis from "./components/analysis";

import basemapCtrlWidget from "./widgets/baseMapCtrl/basemapCtrlWidget";
import legendWidget from "./widgets/legend/legendWidget";
import bookmarkWidget from "./widgets/bookmark/bookmarkWidget";
import overviewWidget from "./widgets/overview/overviewWidget";
import shadowWidget from "./widgets/shadow/shadowWidget";
import mapCtrlWidget from "./widgets/mapCtrl/mapCtrlWidget";

export default [
  {
    path: "mapCtrl",
    name: "地图控制",
    symbol: "ios-build",
    compoment: mapCtrlWidget,
    props: { mapId: "mapTest" }
  },
  {
    path: "analysis",
    name: "分析",
    symbol: "md-analytics",
    compoment: analysis,
    props: { mapId: "mapTest" }
  },
  {
    path: "layersLegend",
    name: "图层列表",
    symbol: "ios-photos",
    compoment: legendWidget,
    props: { mapId: "mapTest" }
  },
  {
    path: "changeBmap",
    name: "底图",
    symbol: "md-globe",
    compoment: basemapCtrlWidget,
    props: { mapId: "mapTest" }
  },
  {
    path: "bookmark",
    name: "书签",
    symbol: "ios-bookmarks",
    compoment: bookmarkWidget,
    props: { mapId: "mapTest" }
  },
  {
    path: "overview",
    name: "鹰眼视图",
    symbol: "md-eye",
    compoment: overviewWidget,
    props: { mapId: "mapTest" }
  },
  {
    path: "shadow",
    name: "日照阴影",
    symbol: "md-sunny",
    compoment: shadowWidget,
    props: { mapId: "mapTest" }
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
