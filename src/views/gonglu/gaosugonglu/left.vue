<!-- 首页 公路 -->
<template>
  <div class="board">
    <div class="tit">
      <mainTitle icon="img_gl">公路建设</mainTitle>
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
          <div class="subtitbox"><subTitle>项目状态</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart2"></vEcharts>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="colum">
          <div class="subtitbox"><subTitle>建设里程</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart3"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox"><subTitle>控制性工程完成情况</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart4"></vEcharts>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="colum">
          <div class="subtitbox"><subTitle>概预算总投资</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart5"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox"><subTitle>资金到位汇总</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart6"></vEcharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storeIndex from "../../index/store.js";
import { motorway, motorwayLoad, closeLayer } from "../../../components/map/layer.js";

export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...storeIndex.mapState(["gonglu_jsgm", "gonglu_xxjd", "gonglu_kzxgc", "gonglu_jsxm", "gonglu_kgqk", "gonglu_jslc", "gonglu_gysztz"]),
    chart1() {
      const { GgPrjCount, DgPrjCount, SswTotalPrjCount } = this.gonglu_jsgm;
      const center = ["50%", "50%"];
      const data = [
        {
          name: "国高",
          value: GgPrjCount,
          color: "#003BB0"
        },
        { name: "地高", value: DgPrjCount, color: "#F17221" },
        { name: "十三五", value: SswTotalPrjCount, color: "#E0D996" },
        { name: "互联互通", value: 0, color: "#0C7FFF" }
      ];
      const option = {
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          textStyle: {
            color: "#50C5FF"
          },
          right: "center",
          top: "center"
          // data: legendData
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          containLabels: true
        },
        series: [
          {
            type: "pie",
            center: center,
            radius: ["60%", "67%"],
            hoverAnimation: false,
            minAngle: 10,
            startAngle: 100,
            label: {
              formatter: "{c}个"
            },
            data: data.slice(0, 2).map(item => {
              return { name: item.name, value: item.value, itemStyle: { color: item.color } };
            })
          },
          {
            type: "pie",
            startAngle: -80,
            radius: ["75%", "82%"],
            center: center,
            hoverAnimation: false,
            minAngle: 10,
            label: {
              formatter: "{c}个"
            },
            data: data.slice(2).map(item => {
              return { name: item.name, value: item.value, itemStyle: { color: item.color } };
            })
          }
        ]
      };
      return option;
    },
    chart2() {
      const { GgPrjCount, DgPrjCount, GsglYtcPrjCount, WtcPrjCount = 0 } = this.gonglu_jsgm;
      const data = [
        { value: GgPrjCount, name: "国高", color: "#91D9E3" },
        { value: DgPrjCount, name: "地高", color: "#0C7FFF" },
        { value: GsglYtcPrjCount, name: "已通车", color: "#16D7E3" },
        { value: WtcPrjCount, name: "未通车", color: "#326CCA" }
      ];
      const center = ["40%", "50%"];
      const option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{b}: {c}"
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          orient: "vertical",
          right: 10,
          textStyle: {
            color: "#54B5FF"
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            startAngle: 180,
            center: center,
            radius: ["68%", "78%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            minAngle: 10,
            label: {
              show: false,
              position: "center"
            },
            data: data.slice(0, 2).map(item => {
              return { name: item.name, value: item.value, itemStyle: { color: item.color } };
            })
          },
          {
            name: "",
            type: "pie",
            startAngle: 180,
            center: center,
            radius: "57%",
            avoidLabelOverlap: false,
            hoverAnimation: false,
            minAngle: 10,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  color: "#fff",
                  verticalAlign: "middle",
                  padding: [7, 0, 0, 0],
                  formatter: function(params) {
                    return params.value + "个";
                  }
                }
              }
            },
            data: data.slice(2).map(item => {
              return { name: item.name, value: item.value, itemStyle: { color: item.color } };
            })
          }
        ]
      };
      return option;
    },
    chart3() {
      const { GgTotalMileage, DgTotalMileage, GgTotalMileageNot = 0, DgTotalMileageNot = 0 } = this.gonglu_jslc;
      const data = {
        values: [{ total: GgTotalMileage, value: 735, name: "国高" }, { total: DgTotalMileage, value: 1051, name: "地高" }]
      };
      const option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
          top: "20%",
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
          show: true,
          type: "value",
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
            barWidth: "26%",
            label: {
              normal: {
                color: "#fff",
                show: true,
                position: "insideRight",
                textStyle: {},
                formatter: "{c}km"
              }
            },
            data: data.values.map(item => item.total),
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
          },
          {
            name: "通车里程",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 30, 30, 0],
                color: "#FF9E00"
              }
            },
            barWidth: "26%",
            data: data.values.map(item => ({ name: item.label, value: item.value })),
            label: {
              normal: {
                color: "#fff",
                show: true,
                position: "insideRight",
                textStyle: {},
                formatter: "{c}km"
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
          [
            { value: 0, name: "特大桥", color: "#3700BF" },
            { value: 0, name: "大桥", color: "#0C7FFF" },
            { value: 0, name: "特长隧道", color: "#00C0B3" },
            { value: 0, name: "长隧道", color: "#E0D996" }
          ],
          [{ value: 0, name: "桥梁（座）", color: "#326CCA" }, { value: 0, name: "隧道（处）", color: "#00839B" }]
        ]
      };
      data.values[0] = data.values[0].map(item => {
        const target = this.gonglu_kzxgc.find(gl => gl.name === item.name);
        if (!target) return item;
        return { ...item, value: target.finishValue };
      });
      data.total = data.values.reduce((res, nex) => {
        return res + nex.value;
      }, 0);
      data.values[1][0].value = data.values[0][0].value + data.values[0][1].value;
      data.values[1][1].value = data.values[0][2].value + data.values[0][3].value;
      const option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          show: false,
          trigger: "item",
          formatter: "{b}: {c}"
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          orient: "vertical",
          left: 10,
          textStyle: {
            color: "#54B5FF"
          },
          data: data.values[0].map(item => item.name)
        },

        series: [
          {
            name: "",
            type: "pie",
            startAngle: 180,
            center: ["60%", "60%"],
            radius: ["68%", "78%"],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              show: false,
              position: "center"
            },
            itemStyle: {
              normal: {
                borderColor: "RGBA(37, 45, 56)",
                borderWidth: 2
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
            center: ["60%", "60%"],
            radius: "65%",
            avoidLabelOverlap: false,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: "RGBA(37, 45, 56)",
                borderWidth: 5,
                label: {
                  show: true,
                  position: "inside",
                  color: "#fff",
                  verticalAlign: "middle",
                  padding: [7, 0, 0, 0],
                  formatter: function(params) {
                    return `${params.name}\n${params.value}`;
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
    chart5() {
      const data = {
        name: ["概算总投资", "开累完成"],
        values: [
          { total: 3268.8804, value: 1882.913, name: "国高" },
          { total: 9717.7261, value: 4585.425, name: "地高" },
          { total: 205.7916, value: 141.9895, name: "国道" },
          { total: 147.3511, value: 74.003, name: "省道" }
        ]
      };
      const option = {
        grid: {
          left: "10%",
          right: "0%",
          bottom: "5%",
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
            barWidth: "35%",
            itemStyle: { color: "#214EC1" }
          },
          {
            name: data.name[1],
            zlevel: 1,
            data: data.values.map(item => item.value),
            type: "bar",
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
                    color: "#FEDEA1" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#9045C8" // 100% 处的颜色
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
                  const percent = ((value / total) * 100).toFixed(2);
                  return `${percent}%`;
                }
              }
            }
          }
        ]
      };
      return option;
    },
    chart6() {
      const data = {
        name: ["概算总投资", "累计资金到位"],
        values: [
          { total: 3268.8804, value: 1882.913, name: "国高" },
          { total: 9717.7261, value: 4585.425, name: "地高" },
          { total: 205.7916, value: 141.9895, name: "国道" },
          { total: 147.3511, value: 74.003, name: "省道" }
        ]
      };
      const option = {
        grid: {
          left: "10%",
          right: "10%",
          bottom: "5%",
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
            barWidth: "35%",
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x1: 0,
                y1: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0066A8"
                  },
                  {
                    offset: 1,
                    color: "#C9DFF3"
                  }
                ]
              }
            }
          },
          {
            name: data.name[1],
            zlevel: 1,
            data: data.values.map(item => item.value),
            type: "bar",
            barWidth: "35%",
            itemStyle: { color: "#BE7DCC" },
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
                  const percent = ((value / total) * 100).toFixed(2);
                  return `${percent}%`;
                }
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
    motorwayLoad();
  },
  deactivated() {
    closeLayer(motorway);
    // this.$root.$emit("closeLayer", motorway);
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
