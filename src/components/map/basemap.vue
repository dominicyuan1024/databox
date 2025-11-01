<!-- 底图 -->
<template>
  <div class="mapsBox" :class="'mode' + mode">
    <div v-for="item in mapConfig" :key="item.id" class="map">
      <div v-show="!item.isloaded" class="map-loading">
        <a-Spin> </a-Spin>
      </div>
      <div class="map-content" :id="item.id"></div>
    </div>
    <!-- <mapCtrl></mapCtrl> -->
  </div>
</template>

<script>
import Config from "../../app.config.js";
import { addLayer } from "./map.js";
import { fw } from "../../sdk/index.js";
// import mapCtrl from "./mapCtrl";
export default {
  components: {
    // mapCtrl
  },
  props: {},
  data() {
    return {
      mapConfig: [],
      mode: "1", // "1" | "1-3" | "4" | "2" | "5"
      loadend: false,
      linkId: "baseMap_links_@#$@#"
    };
  },
  watch: {
    mode() {
      this.renderMap();
    }
  },
  methods: {
    renderMap() {
      // fw.mapLinkage.removeAll(this.linkId);
      let mapconfigs = [];
      if (this.mode === "1") {
        mapconfigs = this.mapConfig.slice(0, 1);
      } else if (this.mode === "2") {
        mapconfigs = this.mapConfig.slice(0, 2);
      } else if (this.mode === "1-3" || this.mode === "4") {
        mapconfigs = this.mapConfig.slice(0, 2);
      } else if (this.mode === "5") {
        mapconfigs = this.mapConfig;
      }
      let loadedMap = mapconfigs.filter(item => item.isloaded);
      // 判断显示的地图个数，如果是两个，创建联动
      if (loadedMap.length > 1) {
        let loadedMapIds = loadedMap.map(item => item.id);
        fw.mapLinkage.createLink(this.linkId, loadedMapIds);
      }
      mapconfigs.forEach(item => {
        if (item.isloaded) return;
        fw.mapCtrl
          .createMap(item.id, item)
          .then(() => {
            // res.camera = {
            //   heading: 0, // face due east
            //   tilt: 0, // looking from a bird's eye view
            //   position: {
            //     x: 102.27927,
            //     y: 24.57025099,
            //     z: 25512548,
            //     spatialReference: { wkid: 4326 }
            //   }
            // };
            console.log("debug", "emit mapLoaded");
            this.$set(item, "isloaded", true);
            this.$emit("mapLoaded", item);
            // 判断显示的地图个数，如果是两个，创建联动，如果大于两个，添加联动
            let loadedMap = mapconfigs.filter(item => item.isloaded);
            if (loadedMap.length === 2) {
              let loadedMapIds = loadedMap.map(item => item.id);
              fw.mapLinkage.createLink(this.linkId, loadedMapIds);
            } else if (loadedMap.length > 2) {
              fw.mapLinkage.addToLink(this.linkId, item.id);
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    },
    //初始化引擎
    initSDK() {
      return fw.mainCtrl.init(Config.sdk);
    },
    //创建地图
    createMap() {
      //加载自定义服务资源
      let serverConfig = Config.serverConfigs;
      fw.serverCtrl.addConfig(serverConfig);
      this.renderMap();
    }
  },
  created() {
    this.$root.$on("mapModeChange", mode => {
      setTimeout(() => {
        this.mode = mode;
      }, 0);
    });
    this.mapConfig = Config.mapConfigs;
  },
  mounted() {
    this.initSDK()
      .then(() => {
        return this.createMap();
      })
      .catch(err => {
        console.error(err);
      });
    this.$on("mapLoaded", addLayer);
  },
  beforeDestroy() {
    this.$root.$off("mapModeChange");
    this.$off("mapLoaded", addLayer);
  }
};
</script>

<style lang="css">

.mapsBox {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  position: fixed;
  background: var(--basemap-bg);
  left: 0;
  top: 0;
}
.mapsBox > .map {
  height: 50%;
  position: relative;
  transition: width 0.5s, height 0.5s;
}
.mapsBox .map-content {
  height: 100%;
  transition: opacity 0.5s;
}
.mapsBox.mode4 > .map {
  width: 50%;
}
.mapsBox.mode4 > .map:nth-of-type(1) {
  border-right: 1px solid rgba(71, 113, 240, 0.4);
  border-bottom: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode4 > .map:nth-of-type(2) {
  border-left: 1px solid rgba(71, 113, 240, 0.4);
  border-bottom: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode4 > .map:nth-of-type(3) {
  border-right: 1px solid rgba(71, 113, 240, 0.4);
  border-top: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode4 > .map:nth-of-type(4) {
  border-left: 1px solid rgba(71, 113, 240, 0.4);
  border-top: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode1-3 > .map {
  width: 33.33333333333%;
}
.mapsBox.mode1-3 > .map:nth-of-type(1) {
  width: 100%;
  flex-shrink: 5;
  border-bottom: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode1-3 > .map:nth-of-type(2) {
  border-right: 1px solid rgba(71, 113, 240, 0.4);
  border-top: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode1-3 > .map:nth-of-type(3) {
  border-left: 1px solid rgba(71, 113, 240, 0.4);
  border-right: 1px solid rgba(71, 113, 240, 0.4);
  border-top: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode1-3 > .map:nth-of-type(4) {
  border-left: 1px solid rgba(71, 113, 240, 0.4);
  border-top: 1px solid rgba(71, 113, 240, 0.4);
}

.mapsBox.mode5 > .map {
  width: 33.33333333333333333333333333333333333333333333333333%;
}
.mapsBox.mode5 > .map:nth-of-type(1) {
  width: 66.6666666666666666666666666666666666666666666666666%;
  flex-shrink: 5;
  border-right: 1px solid rgba(71, 113, 240, 0.4);
  border-bottom: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode5 > .map:nth-of-type(2) {
  border-bottom: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode5 > .map:nth-of-type(3) {
  border-right: 1px solid rgba(71, 113, 240, 0.4);
}
.mapsBox.mode5 > .map:nth-of-type(4) {
  border-right: 1px solid rgba(71, 113, 240, 0.4);
}

.mapsBox.mode1 > .map:not(:first-of-type) {
  /*display: none;*/
  position: absolute;
  z-index: -100;
  width: 100%;
  height: 100%;
}
.mapsBox.mode1 > .map:first-of-type {
  width: 100%;
  height: 100%;
  border: none;
}
.mapsBox.mode2 > .map {
  position: absolute;
  z-index: -100;
  width: 100%;
  height: 100%;
}
.mapsBox.mode2 > .map:nth-of-type(1),
.mapsBox.mode2 > .map:nth-of-type(2) {
  position: relative;
  z-index: 0;
  width: 50%;
  height: 100%;
  border: none;
}
.mapsBox.mode2 > .map:nth-of-type(1) {
  border-right: 2px solid rgba(71, 113, 240, 0.4);
}
.mapsBox .map-loading {
  background: rgba(0,0,0,0.3);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 100000;
}
.mapsBox .map-loading .spin-icon {
  animation: ani-spin 1s linear infinite;
}
@keyframes ani-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
