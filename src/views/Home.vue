<!--Home page-->
<template>
  <div class="home">
    <div class="home-content" onselectstart="return false">
      <!-- 左侧路由 -->
      <div class="home-route home-route-left disappear" ref="route_left">
        <keep-alive>
          <router-view name="left" :key="$route.path" />
        </keep-alive>
        <div class="home-route-toggle home-route-left-toggle" @click="toggleRoute('route_left')">
          <a-icon class="home-route-toggle-icon" type="left" />
        </div>
      </div>
      <!-- 顶部路由 -->
      <div class="home-center">
        <div class="home-route home-route-top disappear" ref="route_top">
          <keep-alive>
            <router-view name="top" />
          </keep-alive>
          <div class="home-route-toggle home-route-top-toggle" @click="toggleRoute('route_top')">
            <a-icon class="home-route-toggle-icon" type="up" />
          </div>
        </div>
        <div class="home-map">
          <!-- <mapTool class="home-map-tool fright"></mapTool> -->
        </div>
        <!-- 底部路由 -->
        <div class="home-route home-route-bottom disappear" ref="route_bottom">
          <keep-alive>
            <router-view name="bottom" />
          </keep-alive>
          <div class="home-route-toggle home-route-bottom-toggle" @click="toggleRoute('route_bottom')">
            <a-icon class="home-route-toggle-icon" type="down" />
          </div>
        </div>
      </div>
      <!-- 右侧路由 -->
      <div class="home-route home-route-right disappear" ref="route_right">
        <keep-alive>
          <router-view name="right" />
        </keep-alive>
        <div class="home-route-toggle home-route-right-toggle" @click="toggleRoute('route_right')">
          <a-icon class="home-route-toggle-icon" type="right" />
        </div>
      </div>
      <!-- 不可见的路由，只执行逻辑 -->
      <div class="unvisibleroute">
        <keep-alive>
          <router-view name="unvisible" />
        </keep-alive>
      </div>
    </div>
    <!-- 导航栏 -->
    <homeNav></homeNav>
    <!-- 地图 -->
    <basemap @mapLoaded="maploaded"></basemap>
  </div>
</template>

<script>
import basemap from "../components/map/basemap.vue";
// import mapTool from "../components/mapTool.vue";
import homeNav from "../components/homeNav.vue";
export default {
  name: "Home",
  components: {
    basemap,
    // mapTool,
    homeNav
  },
  data() {
    return {};
  },
  methods: {
    maploaded() {},
    //打开关闭路由
    toggleRoute(routeName) {
      this.$refs[routeName].classList.toggle("close");
    },
    //路由动画逻辑
    routeAnimate(to, suddenly) {
      //获取当前路由的配置项
      let compomentOption;
      let routes = this.$router.options.routes;
      to.matched.forEach(match => {
        routes = routes.find(r => r.name === match.name);
        compomentOption = routes.components || {};
        routes = routes.children;
      });
      //隐藏所有路由
      let hiddingPromise = Object.keys(this.$refs).reduce((result, key) => {
        if (key.indexOf("route_") < 0) return result;
        let $ref = this.$refs[key];
        let handle;
        if ($ref.classList.contains("disappear")) return result;
        $ref.classList.add("disappear");
        let pro = new Promise(rs => {
          $ref.addEventListener(
            "transitionend",
            (handle = () => {
              $ref.removeEventListener("transitionend", handle);
              rs();
            })
          );
          suddenly && rs(); //如果不做过渡
        });
        result.push(pro);
        return result;
      }, []);
      //路由渲染,路由弹出
      hiddingPromise = hiddingPromise.length ? hiddingPromise : [Promise.resolve()];
      return Promise.all(hiddingPromise).then(() => {
        Object.keys(compomentOption).forEach(routeName => {
          if (!compomentOption[routeName] || !this.$refs[`route_${routeName}`]) return;
          this.$refs[`route_${routeName}`].classList.remove("disappear", "close");
        });
      });
    },
    //路由全局事件监听
    routeListenerOn() {
      if (this.$listening) return;
      this.$root.$on("isShowRoute", (routeNameArr, isShowArr) => {
        if (!(routeNameArr instanceof Array) || !routeNameArr.length) return console.error("isShowRoute 事件的第一参数必须是长度大于1的路由名称数组！");
        routeNameArr.forEach((name, index) => {
          let action = isShowArr[index] ? "remove" : "add";
          let routeRefName = "route_" + name;
          let routeRef = this.$refs[routeRefName];
          if (!routeRef) return console.error(`名称未 ${name} 的路由不存在！`);
          routeRef.classList[action]("close");
        });
      });
      this.$listening = true;
    },
    //路由全局事件取消
    routeListenerOff() {
      this.$root.$off("isShowRoute");
      this.$listening = false;
    }
  },
  created() {
    //刷新页面回到根路由
    this.$router.replace("/index");
  },
  mounted() {
    //路由动画
    this.$route.matched.length > 1 && this.routeAnimate(this.$route, true).catch(err => console.error(err));
    this.$router.beforeEach((to, from, next) => {
      if (to.matched[0].name !== "home") return next();
      this.routeAnimate(to, from.matched[0].name !== "home")
        .then(() => {
          next();
        })
        .catch(err => {
          next();
          console.error(err);
        });
    });
    //路由事件监听
    this.routeListenerOn();
  },
  beforeDestroy() {
    this.routeListenerOff();
  },
  activated() {
    this.routeListenerOn();
  },
  deactivated() {
    this.routeListenerOff();
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  background-size: 100% 100%;
}
.home-content {
  display: flex;
  width: 100%;
  height: 100%;
}
.home-center {
  display: flex;
  flex-grow: 1;
  width: calc(100% - var(--routerLeft-width) - var(--routerRight-width));
  flex-direction: column;
  height: 100%;
  position: relative;
}
.home-map {
  flex-grow: 1;
  position: relative;
}
.home-map-tool {
  margin-right: 1rem;
  margin-top: 1rem;
  text-align: center;
  position: absolute;
  right: 0;
  z-index: 1;
}

.home-route {
  position: relative;
  transform: scale(1);
  z-index: 1;
  background: var(--route-bg);
  /* padding: 1rem var(--route-bg-stop-width); */
  padding-bottom: 0;
  transition: all 0.5s ease;
  /* overflow: hidden; */
}
.home-route-bottom {
  height: var(--routerBottom-height);
  padding-top: var(--route-bg-stop-width);
  background: linear-gradient(
    to right,
    var(--route-bg-stop1),
    var(--route-bg-stop0) var(--route-bg-stop-width),
    var(--route-bg),
    var(--route-bg-stop0) calc(100% - var(--route-bg-stop-width)),
    var(--route-bg-stop1)
  );
}
.home-route-top {
  height: var(--routerTop-height);
  position: absolute;
  width: calc(100% - 4rem);
  margin: 0 2rem;
  padding: 0 4rem;
  background: none;
  transform-origin: 0 0;
}
.home-route-top::before {
  content: "";
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  border: 4rem solid var(--route-bg-top);
  border-left: 7rem solid transparent;
  border-right: 7rem solid transparent;
  border-bottom: none;
  z-index: -1;
}
.home-route-left {
  width: var(--routerLeft-width);
  padding-right: var(--route-bg-stop-width);
  background: linear-gradient(to left, var(--route-bg-stop1), var(--route-bg-stop0) var(--route-bg-stop-width), var(--route-bg));
}
.home-route-right {
  width: var(--routerRight-width);
  padding-right: 0;
  padding-left: var(--route-bg-stop-width);
  background: linear-gradient(to right, var(--route-bg-stop1), var(--route-bg-stop0) var(--route-bg-stop-width), var(--route-bg));
}
.home-route-left.close {
  /* margin-left: calc(var(--route-bg-stop-width) - var(--routerLeft-width)); */
  margin-left: calc(0% - var(--routerLeft-width));
}
.home-route-right.close {
  /* margin-right: calc(var(--route-bg-stop-width) - var(--routerRight-width)); */
  margin-right: calc(0% - var(--routerRight-width));
}
.home-route-bottom.close {
  /* height: 0; */
  /* margin-bottom: calc(var(--route-bg-stop-width) - var(--routerBottom-height)); */
  transform: translateY(calc(var(--routerBottom-height) - var(--route-bg-stop-width)));
  padding-bottom: 0;
}
.home-route-top.close {
  /* height: 0; */
  transform: scaleY(0);
}
.home-route-left.disappear {
  margin-left: calc(0% - var(--routerLeft-width));
}
.home-route-right.disappear {
  margin-right: calc(0% - var(--routerRight-width));
}
.home-route-top.disappear {
  /* height: 0; */
  transform: scaleY(0);
}
.home-route-bottom.disappear {
  /* margin-bottom: calc(0rem - var(--routerBottom-height)); */
  transform: translateY(calc(var(--routerBottom-height)));
}

.home-route-toggle {
  color: var(--font-color-header);
  position: absolute;
  z-index: 2;
  width: var(--route-bg-stop-width);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.home-route-left-toggle {
  right: calc(0rem - var(--route-bg-stop-width));
  top: 0;
}
.home-route-right-toggle {
  left: calc(0rem - var(--route-bg-stop-width));
  top: 0;
}
.home-route-bottom-toggle {
  width: 100%;
  top: 0;
  left: 0;
  height: var(--route-bg-stop-width);
}
.home-route-top-toggle {
  width: 100%;
  left: 0;
  bottom: 0;
  display: none;
  height: var(--route-bg-stop-width);
}
.home-route-toggle-icon {
  opacity: 0;
  font-size: 1.8rem;
}
.home-route.close .home-route-toggle-icon,
.home-route:hover .home-route-toggle-icon {
  opacity: 0.1;
}
.home-route-toggle:hover .home-route-toggle-icon {
  opacity: 1;
  color: var(--font-color-normal);
}
.home-route.close .home-route-toggle-icon {
  transform: rotate(180deg);
}
.unvisibleroute {
  width: 0;
  height: 0;
  overflow: hidden;
}
</style>
