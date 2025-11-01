<!-- 水运建设 -->
<template>
  <div class="board">
    <div class="tit">
      <mainTitle icon="img_sl">水路概况</mainTitle>
    </div>
    <div class="content">
      <div class="row">
        <div class="colum">
          <div class="subtitbox">
            <subTitle>建设项目</subTitle>
          </div>
          <div class="chartbox">
            <p class="bt">
              合计
              <span>5</span>个
            </p>
            <div class="jsxm-container">
              <div class="dw">
                <img src="../../assets/imgs/shuiyun/1.png" alt />
                <p class="wz1">港口</p>
                <p class="wz2">4个</p>
              </div>
              <div class="dw">
                <img src="../../assets/imgs/shuiyun/1.png" alt />
                <p class="wz1">航道</p>
                <p class="wz2">1个</p>
              </div>
              <div class="dw">
                <img src="../../assets/imgs/shuiyun/1.png" alt />
                <p class="wz1">航标</p>
                <p class="wz2">0个</p>
              </div>
              <div class="dw">
                <img src="../../assets/imgs/shuiyun/1.png" alt />
                <p class="wz3">
                  航运
                  <br />枢纽
                </p>
                <p class="wz2">0个</p>
              </div>
            </div>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox">
            <subTitle>开工情况</subTitle>
          </div>
          <div class="chartbox">
            <p class="bt">
              已开工
              <span>2</span>个，未开工 <span>3</span>个
            </p>
            <vEcharts width="100%" height="100%" :option="chart2"></vEcharts>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="colum">
          <div class="subtitbox">
            <subTitle>技术等级</subTitle>
          </div>
          <div class="chartbox">
            <p class="bt">
              共
              <span>5</span>个技术等级
            </p>
            <vEcharts width="100%" height="100%" :option="chart3"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox">
            <subTitle>概（估）算总投资</subTitle>
          </div>
          <div class="chartbox">
            <p class="bt">
              合计：
              <span>40.5771</span>亿元
            </p>
            <vEcharts width="100%" height="100%" :option="chart4"></vEcharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storeIndex from "./store.js";
import { rivers, riversLoad, closeLayer } from "../../components/map/layer.js";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...storeIndex.mapState(["gonglu_xxjd", "gonglu_kzxgc", "gonglu_jsxm", "gonglu_kgqk", "gonglu_jslc", "gonglu_gysztz"]),

    chart2() {
      const data = {
        values: [
          [{ value: 3, name: "未开工", color: "#0C7FFF" }, { value: 2, name: "已开工", color: "#00FFFF" }],
          [{ value: 3, name: "未开工", color: "#0C7FFF" }, { value: 2, name: "已开工", color: "#00FFFF" }]
        ]
      };
      const option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          show: false
        },
        series: [
          {
            name: "",
            type: "pie",
            startAngle: 180,
            hoverAnimation: false, //鼠标移入变大
            tooltip: {
              show: false
            },
            center: ["50%", "50%"],
            radius: ["48%", "60%"],
            avoidLabelOverlap: false,

            label: {
              normal: {
                position: "inner",
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderColor: "RGBA(37, 45, 56)",
                borderWidth: 8
              }
            },
            data: data.values[0].map(item => {
              return { ...item, itemStyle: { color: item.color } };
            })
          },
          {
            name: "",
            type: "pie",
            startAngle: 180,
            center: ["50%", "50%"],
            radius: "46%",
            avoidLabelOverlap: false,
            hoverAnimation: false, //鼠标移入变大
            tooltip: {
              show: false
            },
            itemStyle: {
              normal: {
                borderColor: "RGBA(37, 45, 56)",
                borderWidth: 8,
                label: {
                  show: true,
                  position: "inside",
                  color: "#fff",
                  verticalAlign: "middle",
                  padding: [7, 0, 0, 0],
                  formatter: function(params) {
                    return `${params.name}\n${params.value}个`;
                  }
                }
              }
            },
            data: data.values[1].map(item => {
              return { ...item, itemStyle: { color: item.color } };
            })
          }
        ]
      };
      return option;
    },
    chart3() {
      const data = [
        {
          value: 33310.12,
          name: "邮件营销"
        },
        {
          value: 234.88,
          name: "联盟广告"
        },
        {
          value: 13544444.44,
          name: "视频广告"
        },
        {
          value: 1.0,
          name: "搜索引擎"
        },
        {
          value: 310.12,
          name: "测试文案1"
        }
      ];
      // data.values = data.values.map(item => {
      //   const target = this.gonglu_xxjd.find(gl => gl.name === item.label);
      //   if (!target) return item;
      //   const scale = item.total / target.designValue;
      //   return { ...item, value: target.finishValue * scale, label: `${target.name}(${target.unit})` };
      // });
      const option = {
        color: ["#BEE7FF", "#8CE2FD", "#00C5F7", "#027EE7", "#027EE7"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        toolbox: {
          show: true
        },
        legend: {
          show: false
        },
        series: [
          {
            name: "技术等级",
            type: "pie",
            radius: ["20%", "60%"],
            hoverAnimation: false, //鼠标移入变大
            tooltip: {
              show: false
            },
            itemStyle: {
              show: false,
              borderColor: "#fff",
              borderWidth: 2
            },
            label: {
              color: "#fff"
            },
            data: [{ value: 5, name: "Ⅰ级" }, { value: 13, name: "Ⅱ级" }, { value: 17, name: "Ⅲ级" }, { value: 25, name: "Ⅳ级" }, { value: 40, name: "Ⅴ级" }]
          }
        ]
      };
      return option;
    },
    chart4() {
      const data = {
        values: [{ value: 0, name: "其他" }, { value: 0, name: "航运" }, { value: 18.18, name: "港口" }, { value: 0, name: "航标" }, { value: 22.39, name: "航道" }]
      };
      const option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "20%",
          top: "20%",
          containLabel: true
        },
        legend: {
          show: false
        },
        xAxis: {
          show: true,
          type: "value",
          name: "（亿元）",
          nameTextStyle: {
            color: "#50A0FF",
            align: "right"
          },
          min: "0",
          max: "50",
          axisLine: {
            lineStyle: {
              color: "#3170C0"
            }
          },
          axisLabel: {
            color: "#4EA3E4"
          },
          splitLine: {
            lineStyle: {
              color: "#323C76"
            }
          }
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            // offset: 10,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#309BFF",
                fontSize: 16
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              // onZero:false,
              lineStyle: {
                color: "#3170C0"
              }
            },
            data: data.values.map(item => item.name)
          }
        ],
        series: [
          {
            name: "建设里程",
            type: "bar",
            barWidth: "30%",
            data: data.values.map(item => item.value),
            label: {
              normal: {
                color: "#fff",
                show: true,
                position: ["103%", 2],
                textStyle: {},
                formatter: `{c}亿元`
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: [0, 30, 30, 0],
                color: new window.echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#023AAA"
                  },
                  {
                    offset: 1,
                    color: "#00FFFF"
                  }
                ])
              }
            }
          }
        ]
      };
      return option;
    }
  },
  created() {},
  activated() {
    this.fetch_data();
    riversLoad();
  },
  deactivated() {
    // this.$root.$emit("closeLayer", rivers);
    closeLayer(rivers);
  },
  mounted() {},
  destroyed() {},
  methods: {
    ...storeIndex.mapActions(["fetch_data"])
  }
};
</script>
<style scoped>
.board {
  height: 100%;
  /* background: #00f; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.tit {
  flex-shrink: 0;
}
.content {
  /* background: #fff; */
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.row {
  height: 50%;
  /* background: #000; */
  display: flex;
  overflow: hidden;
}
.colum {
  width: 50%;
  flex-grow: 1;
  /* background: #333; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.subtitbox {
  flex-shrink: 0;
}
.chartbox {
  flex-grow: 1;
  height: 100%;
  /* background: #999; */
  position: relative;
}
.bt {
  width: 80%;
  height: 10%;
  border: 1px solid #66ffff;
  color: #66ffff;
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
  position: absolute;
  left: 10%;
}
span {
  font-size: 22px;
}
.jsxm-container {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 18%;
  /* margin-bottom: 18%; */
  position: absolute;
  left: 10%;
}
.dw {
  position: relative;
  /* font-size: 10px; */
}
img {
  width: 80%;
  height: 100%;
}
.wz1 {
  position: absolute;
  left: 4%;
  top: 30%;
  font-size: 12px;
  color: #66ffff;
}
.wz2 {
  position: absolute;
  left: 50%;
  top: 22%;
  color: #5cffff;
}
.wz3 {
  position: absolute;
  left: 4%;
  top: 12%;
  font-size: 12px;
  color: #66ffff;
}
</style>
