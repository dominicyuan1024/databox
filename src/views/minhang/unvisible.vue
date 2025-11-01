<template>
  <div style=""></div>
</template>

<script>
import { airports, airportsLoad, closeLayer, areasFade, areasRecover, cameraToLayer, areas, highlightAreaFeature, clearHighlightAreaFeature } from "../../components/map/layer.js";
import { fw } from "../../sdk/index.js";
export default {
  // props:['isClose'],
  name: "yxTree",
  watch: {},
  methods: {
    areasClick(name) {
      name === "" ? closeLayer(airports) : airportsLoad(name);
    }
  },
  created() {},
  mounted() {},
  activated() {
    cameraToLayer(areas);
    fw.eventCtrl.on("areasClick", this.areasClick);
    areasRecover();
    highlightAreaFeature("白蛇区");
    airportsLoad();
  },
  deactivated() {
    fw.eventCtrl.remove("areasClick", this.areasClick);
    closeLayer(airports);
    areasFade();
    clearHighlightAreaFeature();
  }
};
</script>

<style scoped></style>
