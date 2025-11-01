<!-- 首页 水路 -->
<template>
  <div class="board">
    <div class="tit">
      <mainTitle icon="img_sl">水路建设</mainTitle>
    </div>
    <div class="content">
      <div class="row">
        <div class="colum">
          <div class="subtitbox"><subTitle>建设项目</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart1"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox"><subTitle>开工情况</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart2"></vEcharts>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="colum">
          <div class="subtitbox"><subTitle>概预算总投资</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart3"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox"><subTitle>航道等级</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart4"></vEcharts>
          </div>
        </div>
      </div>
      <div class="subtitbox"><subTitle>形象进度</subTitle></div>
      <div class="row">
        <div class="colum">
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart5"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart6"></vEcharts>
          </div>
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
      areas: ["青龙区", "白虎区", "玄武区", "朱雀区", "鲲鹏区", "荒牛区", "玉兔区", "天狗区", "白蛇区", "合计"],
      // charts: ["chart1", "chart2", "chart3", "chart4", "chart5", "chart6"],
      currentArea: "合计"
    };
  },
  computed: {
    chart1() {
      const data = {
        values: [
          { value: this.randomNum(this.currentArea), name: "国家航道", color: "#882AF6" },
          { value: this.randomNum(this.currentArea), name: "地方航道", color: "#00B5DD" },
          { value: this.randomNum(this.currentArea), name: "专用航道", color: "#6CFFC7" }
        ]
      };
      const option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          position: [0, 0],
          extraCssText: "min-width:0;min-height:0;width:0;height:0;background:rgba(0,0,0,0);",
          formatter(params) {
            return `
                      <div style= "display:inline-block;padding:0.4em;border-radius:2px,color:#fff;background:rgba(255,255,255,.3)">
                      ${params.data.name}: ${params.data.value}
                      </div>
                      `;
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          orient: "horizontal",
          bottom: 0,
          textStyle: {
            color: "#67FFFF"
          }
        },
        series: [
          {
            name: "航道",
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            minAngle: 10,
            label: {
              show: false,
              position: "center"
            },
            data: data.values.map(item => {
              return { ...item, itemStyle: { color: item.color } };
            })
          }
        ]
      };

      return option;
    },
    chart2() {
      const scale = 1000;
      const val1 = this.randomNum(this.currentArea);
      const val2 = this.randomNum(this.currentArea);
      const val3 = this.randomNum(this.currentArea);
      const oritotal = this.randomNum(this.currentArea) * 10;
      const data = {
        values: [
          { value: val1 * scale, orivalue: val1, name: "国家航道", total: scale * oritotal, oritotal: oritotal, sydLabel: "" },
          { value: val2 * scale, orivalue: val2, name: "地方航道", total: scale * oritotal, oritotal: oritotal, sydLabel: "" },
          { value: val3 * scale, orivalue: val3, name: "专用航道", total: scale * oritotal, oritotal: oritotal, sydLabel: "" }
        ]
      };
      const option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          containLabel: true
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          orient: "horizontal",
          bottom: 0,
          textStyle: {
            color: "#54B5FF"
          }
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#67FFFF",
                fontSize: 16,
                fontWeight: "bold"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: data.values.map(item => item.name)
          }
        ],
        series: [
          {
            name: "已开工",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: [40, 0, 40, 0],
                color: new window.echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#0862B5"
                  },
                  {
                    offset: 1,
                    color: "#00FFFF"
                  }
                ])
              }
            },
            barWidth: "34%",
            data: data.values.map(item => ({ name: item.label, value: item.value })),
            label: {
              normal: {
                color: "#fff",
                show: true,
                position: "insideLeft",
                offset: [13, 1],
                textStyle: {},
                formatter: function(a) {
                  const dataitem = data.values[a.dataIndex];
                  const notYet = dataitem.oritotal - dataitem.orivalue;
                  return `已开工 ${dataitem.orivalue} 个  未开工 ${notYet}个`;
                }
              }
            }
          },
          {
            name: "未开工",
            type: "bar",
            barWidth: "34%",
            barGap: "-100%",
            data: data.values.map(item => item.total),
            itemStyle: {
              normal: {
                color: "#882AF6",
                barBorderRadius: [40, 0, 40, 0]
              }
            },
            label: {
              normal: {
                color: "#67FFFF",
                show: true,
                position: "top",
                textStyle: {},
                formatter: function(a) {
                  const dataitem = data.values[a.dataIndex];
                  return dataitem.sydLabel;
                }
              }
            }
          }
        ]
      };
      return option;
    },
    chart3() {
      const data = {
        name: ["概算总投资", "开累完成"],
        values: [
          { total: 122.3971, value: this.randomNum(this.currentArea), name: "国家航道" },
          { total: 125.4, value: this.randomNum(this.currentArea), name: "地方航道" },
          { total: 0, value: 0, name: "专用航道" }
        ]
      };
      const option = {
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "30%",
          containLabel: true
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          orient: "vertical",
          right: 0,
          top: 0,
          textStyle: {
            color: "#54B5FF"
          }
        },
        xAxis: {
          type: "category",
          data: data.values.map(item => item.name),
          axisLine: {
            lineStyle: {
              color: "#3170C0"
            }
          },
          axisLabel: {
            color: "#4EA3E4"
          }
        },
        yAxis: {
          type: "value",
          name: "亿元",
          nameTextStyle: {
            color: "#4EA3E4",
            align: "left"
          },
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
        series: [
          {
            name: data.name[0],
            data: data.values.map(item => item.total),
            type: "bar",
            backgroundStyle: {
              color: "rgba(0, 0, 0, 0.8)"
            },
            barWidth: "35%",
            itemStyle: { color: "#214EC1" }
          },
          {
            name: data.name[1],
            zlevel: 1,
            data: data.values.map(item => item.value),
            type: "bar",
            backgroundStyle: {
              color: "rgba(0, 220, 0, 0.8)"
            },
            barWidth: "35%",
            itemStyle: {
              color: new window.echarts.graphic.LinearGradient(
                0,
                0,
                1,
                1,
                [
                  {
                    offset: 0,
                    color: "#D5FF68" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#6DFFD4" // 100% 处的颜色
                  }
                ],
                false
              )
            },
            barGap: "-80%",
            label: {
              normal: {
                color: "#fff",
                show: true,
                position: [0, "-16px"],
                textStyle: {},
                formatter: function(a, b) {
                  const dataitem = data.values[a.dataIndex];
                  const { value, total } = dataitem;
                  let percent = ((value / total) * 100).toFixed(2);
                  percent = percent + "" === "NaN" ? 0 : percent;
                  return `${percent}%`;
                }
              }
            }
          }
        ]
      };
      return option;
    },
    chart4() {
      const data = {
        values: [
          { value: this.randomNum(this.currentArea), name: "I", color: "#fff" },
          { value: this.randomNum(this.currentArea), name: "II", color: "#BEE7FF" },
          { value: this.randomNum(this.currentArea), name: "III", color: "#93E0F8" },
          { value: this.randomNum(this.currentArea), name: "IV", color: "#02C5F7" },
          { value: this.randomNum(this.currentArea), name: "V", color: "#00ADFF" },
          { value: this.randomNum(this.currentArea), name: "VI", color: "#027EE7" },
          { value: this.randomNum(this.currentArea), name: "VII", color: "#124CC0" }
        ]
      };
      data.total = data.values.reduce((res, nex) => {
        return res + nex.value;
      }, 0);
      const option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          show: true,
          trigger: "item",
          position: [20, 0],
          extraCssText: "min-width:0;min-height:0;width:0;height:0;background:rgba(0,0,0,0);",
          formatter(params) {
            return `
                      <div style= "display:inline-block;padding:0.4em;border-radius:2px,color:#fff;background:rgba(255,255,255,.3)">
                      ${params.data.name}: ${params.data.value}
                      </div>
                      `;
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          orient: "vertical",
          right: 0,
          top: "center",
          textStyle: {
            color: "#54B5FF"
          },
          data: data.values.map(item => item.name)
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["45%", "60%"],
            radius: ["20%", "60%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            data: data.values.map(item => {
              return { ...item, itemStyle: { color: item.color } };
            }),
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "outside",
                  color: "#ddd",
                  formatter: function(params) {
                    if (params.value === 0) return "";
                    const total = data.total;
                    const value = Number(params.value);
                    const percent = ((value / total) * 100).toFixed(2);
                    return `${params.name}级\n${percent}%`;
                  }
                },
                labelLine: {
                  length: 3,
                  length2: 4,
                  show: true,
                  color: "#00ffff"
                }
              }
            }
          }
        ]
      };
      return option;
    },
    chart5() {
      const data = {
        values: [
          { total: 150, value: this.randomNum(this.currentArea), label: "清礁量（m³）", name: "清礁工程:" },
          { total: 150, value: this.randomNum(this.currentArea), label: "疏浚量（m³）", name: "疏浚工程:" },
          { total: 150, value: this.randomNum(this.currentArea), label: "长度（公里）", name: "筑坝工程:" },
          { total: 150, value: this.randomNum(this.currentArea), label: "航标数量（座）", name: "航标工程:" },
          { total: 150, value: this.randomNum(this.currentArea), label: "航道标牌及安全标志牌（座）", name: "" }
        ]
      };
      const option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          containLabel: true
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#309BFF",
                fontSize: 16,
                fontWeight: "bold"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: data.values.map(item => item.name)
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#99D7FF"
              },
              formatter: function(value) {
                const num = Number(value);
                return num.toFixed(2) + "%";
              }
            },
            data: data.values.map(item => (item.value / item.total) * 100)
          }
        ],
        series: [
          {
            name: "yet",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new window.echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#0093FF"
                  },
                  {
                    offset: 1,
                    color: "#4CFD8D"
                  }
                ])
              }
            },
            barWidth: "20%",
            data: data.values.map(item => ({ name: item.label, value: item.value })),
            label: {
              normal: {
                color: "#b3ccf8",
                show: true,
                position: [0, "-16px"],
                textStyle: {},
                formatter: function(a, b) {
                  return a.name;
                }
              }
            }
          },
          {
            name: "total",
            type: "bar",
            barWidth: "20%",
            barGap: "-100%",
            data: data.values.map(item => item.total),

            itemStyle: {
              normal: {
                color: "#214488",
                barBorderRadius: 30
              }
            }
          }
        ]
      };
      return option;
    },
    chart6() {
      const data = {
        values: [
          { total: 150, value: this.randomNum(this.currentArea), label: "土石方开挖（m³）", name: "" },
          { total: 150, value: this.randomNum(this.currentArea), label: "土石方回填（m³）", name: "" },
          { total: 150, value: this.randomNum(this.currentArea), label: "开挖工程（m³）", name: "基地工程:" },
          { total: 150, value: this.randomNum(this.currentArea), label: "填筑工程（m³）", name: "" },
          { total: 150, value: this.randomNum(this.currentArea), label: "砌筑工程（m³）", name: "" }
        ]
      };
      const option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "10%",
          containLabel: true
        },
        xAxis: {
          show: false,
          type: "value"
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#309BFF",
                fontSize: 16,
                fontWeight: "bold"
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: data.values.map(item => item.name)
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#99D7FF"
              },
              formatter: function(value) {
                const num = Number(value);
                return num.toFixed(2) + "%";
              }
            },
            data: data.values.map(item => (item.value / item.total) * 100)
          }
        ],
        series: [
          {
            name: "yet",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                color: new window.echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#0093FF"
                  },
                  {
                    offset: 1,
                    color: "#4CFD8D"
                  }
                ])
              }
            },
            barWidth: "20%",
            data: data.values.map(item => ({ name: item.label, value: item.value })),
            label: {
              normal: {
                color: "#b3ccf8",
                show: true,
                position: [0, "-16px"],
                textStyle: {},
                formatter: function(a, b) {
                  return a.name;
                }
              }
            }
          },
          {
            name: "total",
            type: "bar",
            barWidth: "20%",
            barGap: "-100%",
            data: data.values.map(item => item.total),
            itemStyle: {
              normal: {
                color: "#214488",
                barBorderRadius: 30
              }
            }
          }
        ]
      };
      return option;
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
    randomNum(area) {
      const index = this.areas.findIndex(item => item === area);
      return Math.floor((Math.random() + 0.1) * 10 * (index + 1));
    },
    areasClick(name) {
      this.currentArea = name === "" ? "合计" : name;
    }
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
  height: 33%;
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
}
</style>
