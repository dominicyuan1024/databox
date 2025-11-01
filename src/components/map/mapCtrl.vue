<template>
  <div style="display:none"></div>
</template>

<script>
import config from "../../app.config";
import axios from "axios";
import { fw } from "../../sdk/index.js";

export default {
  components: {},
  data() {
    return {
      glInfo: []
    };
  },
  watch: {},
  created() {},
  computed: {},
  mounted() {
    this.getData();

    this.$root.$on("showLayer", layerName => {
      this.showLayer(layerName);
    });

    this.$root.$on("closeLayer", layerName => {
      this.closeLayer(layerName);
    });
  },
  destroyed() {},
  methods: {
    getData() {
      let that = this;
      axios.get("/data/roadConstruction_prjList.json").then(res => {
        that.glInfo = res.data.data;
      });
    },
    showLayer(type) {
      let that = this;
      const mapId = config.mapConfigs[0].id;

      let queryConfig = {};
      queryConfig.returnGeometry = true;
      queryConfig.outFields = [];

      if (type === "高速公路") {
        queryConfig.where = "GSLX='国家高速'OR GSLX='省级高速'";
      }

      if (type === "国省干道") {
        queryConfig.where = "XMID=153";
      }

      fw.queryUtils.queryFromServer("ways", queryConfig).then(function(res) {
        // console.log(res);
        let features = res.features;
        for (let i = 0; i < res.features.length; i++) {
          let feature = features[i];
          for (let n = 0; n < that.glInfo.length; n++) {
            let item = that.glInfo[n];
            if (item.ProjectName === feature.attributes.XMMC) {
              let content = `<p>项目名称：{XMMC}</p> <p>建设规模(KM)：${item.Mileage}</p> <p>概算投资(亿元)：${item.BudgetInvestment}</p> <p>计划通车时间：${item.PlanTrafficMonth}</p> <p>项目状态：${
                item.ProjectStatusCn
              }</p> <p>建设性质：${item.ProjectNatureCn}</p>`;
              feature.popupTemplate = {
                title: type,
                content: content
              };
            }
          }
        }
        fw.cameraCtrl.toGra(mapId, res.features);
        let searthLayer = fw.layerCtrl.createGraphicsLayer(mapId, "searthLayer");
        searthLayer.graphics.addMany(res.features);
      });
    },
    closeLayer(layerName) {
      const mapId = config.mapConfigs[0].id;
      let view = fw.mapCtrl.getView(mapId);
      let name = layerName ? layerName : "searthLayer";
      fw.layerCtrl.closeLayer(mapId, name);
      view.popup.visible = false;
    }
  },
  activated() {},
  deactivated() {
    const mapId = config.mapConfigs[0].id;

    // fw.layerCtrl.closeLayer(mapId, "searchResultLayer");
  }
};
</script>

<style scoped></style>
