<!-- 公路 底部 -->
<template>
  <div class="gonglu_bottom">
    <ul class="list">
      <li class="item" v-for="item in selectors" :key="item.id">
        <label class="label"> {{ item.label }}：</label>
        <div class="formbox">
          <a-select v-model="item.value" style="width: 100%">
            <a-select-option v-for="opt in item.options" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </a-select-option>
          </a-select>
        </div>
      </li>
      <li class="item">
        <label class="label"> </label>
        <div class="formbox"><button class="btn" @click="search">查询</button><button class="btn" @click="reset">重置</button></div>
      </li>
    </ul>
  </div>
</template>

<script>
import storeGongLu from "./store.js";
// 项目类型
const _xmlx = [
  { label: "全部", value: "-1" },
  { label: "高速公路", value: "1,2" },
  { label: "国高", value: "1" },
  { label: "地高", value: "2" },
  { label: "国省干道", value: "4,5" },
  { label: "国道", value: "4" },
  { label: "省道", value: "5" }
];
//   项目状态
const _xmzt = [{ label: "全部", value: "-1" }, { label: "已开工", value: "8" }, { label: "已通车", value: "10" }];
// 规划期
const _ghq = [{ label: "全部", value: "全部" }, { label: "“十三五”", value: "“十三五”" }];
// 综合查询
const _zhcx = [{ label: "2020年必须通车的项目", value: "2020年必须通车的项目" }, { label: "2022年可以通车的项目", value: "2022年可以通车的项目" }, { label: "建投", value: "建投" }];

export default {
  components: {},
  data() {
    return {
      selectors: [
        // { id: "ghq", value: _ghq[0].value, options: _ghq, label: "规划期" },
        // { id: "qy", value: _qy[0].value, options: _qy, label: "区域" },
        { id: "xmlx", value: _xmlx[0].value, options: _xmlx, label: "项目类型" },
        { id: "xmzt", value: _xmzt[0].value, options: _xmzt, label: "项目状态" }
        // { id: "zhcx", value: _zhcx[0].value, options: _zhcx, label: "综合查询" }
      ]
    };
  },

  computed: {},
  created() {},
  mounted() {
    this.search();
  },
  destroyed() {},
  methods: {
    ...storeGongLu.mapActions(["fetch_projlist"]),
    search() {
      const form = this.selectors.reduce((res, item) => {
        res[item.id] = item.value;
        return res;
      }, {});
      const params = {
        projectTypes: form.xmlx,
        projectClassify: form.xmzt
      };
      this.fetch_projlist(params);
    },
    reset() {
      this.selectors.forEach(item => (item.value = item.options[0].value));
    }
  }
};
</script>
<style>
.gonglu_bottom .ant-select-selection {
  background: rgba(78, 177, 229, 0.3);
  color: #fff;
  border-color: rgba(78, 177, 229, 1);
}
.gonglu_bottom .ant-select-selection .ant-select-arrow {
  color: rgba(78, 177, 229, 1);
}
</style>
<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 50%;
  display: flex;
  align-items: center;
  padding: 0 2em 0 3em;
}
.label {
  width: 5em;
  padding: 1em 0;
  text-align: right;
  flex-shrink: 0;
}
.formbox {
  flex-grow: 1;
}
.btn {
  background: rgba(78, 177, 229, 0.3);
  box-shadow: none;
  border: 1px solid rgba(78, 177, 229, 1);
  border-radius: 4px;
  padding: 0.3em 1em;
  color: inherit;
}
.btn + .btn {
  margin-left: 1.3em;
}
</style>
