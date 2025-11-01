<!-- 首页底部 -->
<template>
  <div class="indexbottom">
    <div class="blk">
      <mainTitle icon="img_mh">民航建设</mainTitle>
      <div class="content">
        <div class="item">
          <p class="info">统计民航<br />在建项目</p>
          <p class="info">
            <span class="big"> {{ currentAreaData.airportBuilding }}</span
            ><span class="unit">个</span>
          </p>
        </div>
        <div class="item">
          <p class="info">
            已通航<span class="big"> {{ currentAreaData.airportOpen }}</span
            ><span class="unit">个</span>
          </p>
          <p class="info">
            未开工<span class="big"> {{ currentAreaData.airportNotOpen }}</span
            ><span class="unit">个</span>
          </p>
        </div>
      </div>
    </div>
    <div class="blk">
      <mainTitle icon="img_tl">铁路建设</mainTitle>
      <div class="content">
        <div class="item">
          <p class="info">统计铁路<br />建设项目</p>
          <p class="info">
            <span class="big"> {{ currentAreaData.railwayBuilding }}</span
            ><span class="unit">个</span>
          </p>
        </div>
        <div class="item">
          <p class="info">
            已通车<span class="big"> {{ currentAreaData.railwayOpen }}</span
            ><span class="unit">个</span>
          </p>
          <p class="info">
            未开工<span class="big"> {{ currentAreaData.railwayNotOpen }}</span
            ><span class="unit">个</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fw } from "../../sdk/index.js";
export default {
  components: {},
  data() {
    return {
      areaData: [
        { areaName: "青龙区", airportBuilding: 4, airportOpen: 3, airportNotOpen: 1, railwayBuilding: 4, railwayOpen: 3, railwayNotOpen: 1 },
        { areaName: "白虎区", airportBuilding: 7, airportOpen: 5, airportNotOpen: 2, railwayBuilding: 8, railwayOpen: 6, railwayNotOpen: 2 },
        { areaName: "玄武区", airportBuilding: 3, airportOpen: 2, airportNotOpen: 1, railwayBuilding: 5, railwayOpen: 4, railwayNotOpen: 1 },
        { areaName: "朱雀区", airportBuilding: 9, airportOpen: 7, airportNotOpen: 2, railwayBuilding: 6, railwayOpen: 5, railwayNotOpen: 1 },
        { areaName: "鲲鹏区", airportBuilding: 2, airportOpen: 1, airportNotOpen: 1, railwayBuilding: 3, railwayOpen: 2, railwayNotOpen: 1 },
        { areaName: "荒牛区", airportBuilding: 6, airportOpen: 4, airportNotOpen: 2, railwayBuilding: 7, railwayOpen: 5, railwayNotOpen: 2 },
        { areaName: "玉兔区", airportBuilding: 5, airportOpen: 3, airportNotOpen: 2, railwayBuilding: 9, railwayOpen: 7, railwayNotOpen: 2 },
        { areaName: "天狗区", airportBuilding: 8, airportOpen: 6, airportNotOpen: 2, railwayBuilding: 10, railwayOpen: 8, railwayNotOpen: 2 },
        { areaName: "白蛇区", airportBuilding: 1, airportOpen: 1, airportNotOpen: 0, railwayBuilding: 2, railwayOpen: 1, railwayNotOpen: 1 },
        { areaName: "合计", airportBuilding: 45, airportOpen: 32, airportNotOpen: 13, railwayBuilding: 54, railwayOpen: 41, railwayNotOpen: 13 }
      ],
      currentArea: "合计"
    };
  },

  computed: {
    currentAreaData() {
      return this.areaData.find(item => item.areaName === this.currentArea);
    }
  },
  created() {},
  mounted() {},
  activated() {
    fw.eventCtrl.on("areasClick", this.areasClick);
  },
  deactivated() {
    fw.eventCtrl.remove("areasClick", this.areasClick);
  },
  destroyed() {},
  methods: {
    areasClick(name) {
      this.currentArea = name === "" ? "合计" : name;
    }
  }
};
</script>
<style scoped>
.indexbottom {
  display: flex;
  padding: 0 1em;
  color: #93daff;
}
.blk {
  width: 50%;
  padding: 0.2em;
}
.content {
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
  line-height: 1.2;
}
.item {
  display: flex;
  align-items: center;
  padding: 0 1em;
}
.item:nth-child(2) {
  flex-direction: column;
  border-left: 1px solid;
}
.big {
  font-size: 2em;
  margin-left: 0.5em;
}
.unit {
  font-size: 0.7em;
  margin-left: 3px;
}
</style>
