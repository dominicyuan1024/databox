<!-- 水运建设底部 -->
<template>
  <div class="indexbottom">
    <div class="blk">
      <table>
        <thead>
          <tr>
            <th>项目名称</th>
            <th>项目类型</th>
            <th>项目状态</th>
            <th>建设性质</th>
            <th>技术等级</th>
            <th>概算总投资<br />(亿元）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.xmmc }}</td>
            <td>{{ item.xmlx }}</td>
            <td>{{ item.xmzt }}</td>
            <td>{{ item.xmxz }}</td>
            <td>{{ item.jsdj }}</td>
            <td>{{ item.gsztz }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      tableData: [
        {
          xmmc: "青龙江色库区（龙头段）高等级航道建设工程",
          xmlx: "港口工程",
          xmzt: "前期",
          xmxz: "新建",
          jsdj: "I级",
          gsztz: "4.4"
        },
        {
          xmmc: "白虎江中游库区航运基础设施综合建设二期工程",
          xmlx: "港口工程",
          xmzt: "前期",
          xmxz: "新建",
          jsdj: "II级",
          gsztz: "9.7"
        },
        {
          xmmc: "朱雀江244界碑至临沧港四级航道建设工程",
          xmlx: "航道工程",
          xmzt: "在建",
          xmxz: "新建",
          jsdj: "IV级",
          gsztz: "22.3971"
        },
        {
          xmmc: "共工江溪洛渡至水富高等级航道建设工程",
          xmlx: "港口工程",
          xmzt: "前期",
          xmxz: "新建",
          jsdj: "I级",
          gsztz: "4.08"
        },
        {
          xmmc: "女娲江中游库区航运基础设施综合建设一期工程",
          xmlx: "港口工程",
          xmzt: "在建",
          xmxz: "新建",
          jsdj: "II级",
          gsztz: ""
        }
      ]
    };
  },

  computed: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
<style scoped>
.indexbottom {
  display: flex;
  padding: 0 1em;
  color: #93daff;
  height: 100%;
}
.blk {
  width: 100%;
  padding: 0.2em;
}
table {
  width: 90%;
  height: 100%;
  font-size: 12px;
  margin-left: 5%;
  margin-right: 5%;
  color: rgba(255, 255, 255, 0.65);
}
thead {
  background-color: RGBA(0, 255, 255, 0.25);
}
thead > tr {
  height: 26pt;
}
tbody > tr {
  height: 10pt;
}
th,
td {
  text-align: center;
}
td {
  border-bottom: 1px solid RGBA(0, 255, 255, 0.25);
}
</style>
