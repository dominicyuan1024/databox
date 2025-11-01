<!-- 公路 右侧 -->
<template>
  <div class="right">
    <div class="top">
      <div class="subtitbox"><subTitle>建设项目</subTitle></div>
      <div class="allbox">
        <span class="all">{{ listData.length }}个</span>
      </div>
    </div>
    <div class="bot">
      <ul>
        <li :class="{ showall: curShowMore.ProjectId === item.ProjectId }" class="item" v-for="item in listData" :key="item.ProjectId">
          <p class="content" v-for="(v, k) in listDataMap" :key="k">
            <span>{{ v }}</span>
            <span>{{ item[k] }}</span>
          </p>
          <span class="more" @click="showMore(item)">
            <a-icon :type="curShowMore.ProjectId === item.ProjectId ? 'up' : 'down'" />
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import storeGongLu from "./store.js";
export default {
  components: {},
  data() {
    return {
      curShowMore: {},
      listDataMap: {
        ProjectName: "项目名称：",
        Mileage: "建设规模(km)：",
        BudgetInvestment: "概算投资(亿元)：",
        PlanTrafficMonth: "计划通车时间：",
        ProjectStatusCn: "项目状态：",
        ProjectNatureCn: "建设性质："
      }
    };
  },

  computed: {
    ...storeGongLu.mapState(["projList"]),
    listData() {
      return this.projList || [];
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    showMore(data) {
      if (data.ProjectId === this.curShowMore.ProjectId) {
        this.curShowMore = {};
        return;
      }
      this.curShowMore = { ...data };
    }
  }
};
</script>
<style scoped>
.right {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.top {
  flex-shrink: 0;
}
.bot {
  flex-grow: 1;
  overflow-y: auto;
}
.all {
  background: RGBA(78, 177, 229, 0.3);
  box-shadow: none;
  border: 1px solid RGBA(78, 177, 229, 1);
  border-radius: 4px;
  padding: 0.3em 2em;
  color: inherit;
}
.allbox {
  margin: 1.5em 0;
}
.item {
  background: RGBA(78, 177, 229, 0.3);
  border: 1px solid RGBA(78, 177, 229, 1);
  border-radius: 4px;
  padding: 1em 2em;
  line-height: 1.7;
  overflow: hidden;
  position: relative;
  height: 4.9em;
  transition: all 0.2s;
}
.item.showall {
  height: 12.5em;
}
.item + .item {
  margin-top: 1em;
}
.content {
  display: flex;
  overflow: hidden;
}
.more {
  position: absolute;
  bottom: 0;
  right: 0;
  background: RGBA(78, 177, 229, 0.3);
  border: 1px solid;
  transform: translateY(50%);
  width: 3em;
  height: 3em;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding-top: 0.3em;
  color: RGBA(78, 177, 229, 1);
}
</style>
