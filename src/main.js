import Vue from "vue";
import router from "./router.js";
import store from "./store.js";
import App from "./App.vue";
import "./componentsUI/register.js";
import axios from "axios";
Vue.prototype.$http = axios;
import { fw } from "./sdk/index.js";
import { Input, Button, Select, Spin, Icon, Form, Message } from "ant-design-vue";
[Input, Button, Select, Spin, Icon, Form, Message].forEach(comp => Vue.use(comp));
window.initPickedAirports = () => {
  const view = fw.mapCtrl.getView("mapTest"); // 若 mapId 不是这个，请改成你的 id
  if (!view) {
    console.warn("view not found");
    return;
  }

  // 存放你点选的经纬度
  window.__pickedAirports = window.__pickedAirports || [];

  // 尝试转 WGS84，经纬度；若不可用则用原坐标
  function toWGS84(pt) {
    try {
      const sr = pt && pt.spatialReference;
      const wkid = sr && (sr.wkid || sr.latestWkid);
      if (wkid === 4326) return { lon: pt.x, lat: pt.y };
      if ((wkid === 3857 || wkid === 102100) && fw.esri.webMercatorUtils) {
        const g = fw.esri.webMercatorUtils.webMercatorToGeographic(pt);
        return { lon: g.x, lat: g.y };
      }
      // 简单兜底：直接返回原值
      return { lon: pt.x, lat: pt.y };
    } catch (e) {
      return { lon: pt.x, lat: pt.y };
    }
  }

  if (window.__clickHandler) window.__clickHandler.remove();
  window.__clickHandler = view.on("click", e => {
    const p = e.mapPoint;
    const { lon, lat } = toWGS84(p);
    const item = { lon: +lon.toFixed(6), lat: +lat.toFixed(6) };
    window.__pickedAirports.push(item);

    console.log("[Picked]", item, "total:", window.__pickedAirports.length, "raw:", { x: p.x, y: p.y, wkid: p.spatialReference && (p.spatialReference.wkid || p.spatialReference.latestWkid) });
    // 也打印成 GeoJSON 坐标格式 [lng,lat]
    console.log("GeoJSON coord:", [item.lon, item.lat]);
  });

  console.log("Click to pick points. Array:", "__pickedAirports", "Stop with:", "__clickHandler.remove()");
};
//路由切换 loading
// router.beforeEach((to, from, next) => {
//   Vue.prototype.$Loading.start();
//   next();
// });
// router.afterEach(() => {
//   Vue.prototype.$Loading.finish();
// });
// import "animate.css/animate.min.css";
import "./assets/normalize.css";
import "./assets/rem.css";
import "./assets/omp.css";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
