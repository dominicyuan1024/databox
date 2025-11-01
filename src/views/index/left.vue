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
          <div class="subtitbox"><subTitle>开工情况</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart2"></vEcharts>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="colum">
          <div class="subtitbox"><subTitle>形象进度</subTitle></div>
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
          <div class="subtitbox"><subTitle>建设里程</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart5"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox"><subTitle>概预算总投资</subTitle></div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart6"></vEcharts>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storeIndex from "./store.js";
import { fw } from "../../sdk/index.js";
import { initCamera } from "../../components/map/map.js";
import { areasFade, areasRecover, clearHighlightAreaFeature } from "../../components/map/layer.js";
export default {
  components: {},
  data() {
    return {
      areas: ["青龙区", "白虎区", "玄武区", "朱雀区", "鲲鹏区", "荒牛区", "玉兔区", "天狗区", "白蛇区", "合计"],
      currentArea: "合计"
    };
  },
  computed: {
    ...storeIndex.mapState(["gonglu_xxjd", "gonglu_kzxgc", "gonglu_jsxm", "gonglu_kgqk", "gonglu_jslc", "gonglu_gysztz"]),
    chart1() {
      const GgPrjCount = this.randomNum(this.currentArea);
      const DgPrjCount = this.randomNum(this.currentArea);
      const GdPrjCount = this.randomNum(this.currentArea);
      const SdPrjCount = this.randomNum(this.currentArea);
      const TotalMileage = this.randomNum(this.currentArea);
      const wclc = this.randomNum(this.currentArea);
      const data = {
        label: ["高速公路\n$data个", "国省干道\n$data个", "农村公路\n$data公里"],
        values: [
          [{ value: GgPrjCount, name: "国高", unit: "个", color: "#1E90FF" }, { value: DgPrjCount, name: "地高", unit: "个", color: "#5CFFFF" }],
          [{ value: GdPrjCount, name: "国道", unit: "个", color: "#1F6AFF" }, { value: SdPrjCount, name: "省道", unit: "个", color: "#52FF98" }],
          [{ value: TotalMileage, name: "总里程", unit: "公里", color: "#1F6AFF" }, { value: wclc, name: "完成里程", unit: "公里", color: "#E9B51B" }]
        ]
      };
      data.label.forEach((item, idx, arr) => {
        const num = data.values[idx].reduce((res, item) => res + item.value, 0);
        arr[idx] = arr[idx].replace("$data", num);
      });
      const centerTop = "40%";
      const raidus = [30, 40];
      const option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "40%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          position: ["30%", 0],
          extraCssText: "min-width:0;min-height:0;width:0;height:0;background:rgba(0,0,0,0);",
          formatter(params) {
            return `
                      <div style= "display:inline-block;padding:0.4em;border-radius:2px,color:#fff;background:rgba(255,255,255,.3)">
                      ${params.data.name}: ${params.data.value} ${params.data.unit}
                      </div>
                      `;
          }
        },
        legend: {
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          orient: "horizontal",
          bottom: 40,
          textStyle: {
            color: "#67FFFF"
          }
        },
        series: [
          {
            name: "航道",
            type: "pie",
            center: ["16%", centerTop],
            radius: raidus,
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: data.label[0],
              position: "center",
              textStyle: {
                color: "#66FFFF"
              }
            },
            data: data.values[0].map(item => {
              return { ...item, itemStyle: { color: item.color } };
            })
          },
          {
            name: "航道",
            type: "pie",
            center: ["49%", centerTop],
            radius: raidus,
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: data.label[1],
              position: "center",
              textStyle: {
                color: "#66FFFF"
              }
            },
            data: data.values[1].map(item => {
              return { ...item, itemStyle: { color: item.color } };
            })
          },
          {
            name: "航道",
            type: "pie",
            center: ["82%", centerTop],
            radius: raidus,
            avoidLabelOverlap: false,
            label: {
              show: true,
              formatter: data.label[2],
              position: "center",
              textStyle: {
                color: "#66FFFF"
              }
            },
            data: data.values[2].map(item => {
              return { ...item, itemStyle: { color: item.color } };
            })
          }
        ]
      };

      return option;
    },
    chart2() {
      const GsglSydkgPrjCount = this.randomNum(this.currentArea);
      const GsglWkgPrjCount = this.randomNum(this.currentArea);
      const GsgdYkgPrjCount = this.randomNum(this.currentArea);
      const GsgdSydkgPrjCount = this.randomNum(this.currentArea);
      const data = {
        values: [
          { value: GsglWkgPrjCount, oriTotal: 100, oriValue: GsglWkgPrjCount, name: "高速公路", total: 100, sydLabel: `试验段开工：高速${GsglSydkgPrjCount}个` },

          { value: GsgdYkgPrjCount, oriTotal: 100, oriValue: GsgdYkgPrjCount, name: "国省干道", total: 100, sydLabel: `试验段开工：国省道${GsgdSydkgPrjCount}个` },

          { value: 0, oriValue: 0, name: "农村公路", oriTotal: 0, total: 0, sydLabel: "" }
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
          show: false,
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
                  const notYet = dataitem.oriTotal - dataitem.oriValue;
                  return `已开工 ${dataitem.oriValue} 个  未开工 ${notYet}个`;
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
        values: [
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "路基挖方", name: "路基工程:" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "路基填方", name: "" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "桩基", name: "桥梁工程:" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "墩柱", name: "" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "梁板预制", name: "" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "梁板安装", name: "" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "主洞掘进", name: "隧道工程:" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "二次衬砌", name: "" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "路面基层", name: "路面工程:" },
          { total: 1000, value: this.randomNum(this.currentArea) * 10, label: "路面上面层", name: "" }
        ]
      };
      data.values = data.values.map(item => {
        const target = this.gonglu_xxjd.find(gl => gl.name === item.label);
        if (!target) return item;
        const scale = item.total / target.designValue;
        return { ...item, value: target.finishValue * scale, label: `${target.name}(${target.unit})` };
      });
      const option = {
        grid: {
          left: 185,
          right: 50,
          bottom: "0%",
          top: "10%",
          containLabel: false
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
              margin: 110,
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
              show: true
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
                barBorderRadius: 2,
                color: new window.echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#003FA1"
                  },
                  {
                    offset: 1,
                    color: "#60B7F8"
                  }
                ])
              }
            },
            barWidth: "36%",
            data: data.values.map(item => ({ name: item.label, value: item.value })),
            label: {
              align: "left",
              offset: [-100, 0],
              color: "#b3ccf8",
              show: true,
              position: "left",
              distance: 1,
              textStyle: {},
              formatter: function(a, b) {
                return a.name;
              }
            }
          },
          {
            name: "total",
            type: "bar",
            barWidth: "36%",
            barGap: "-100%",
            data: data.values.map(item => item.total),
            itemStyle: {
              normal: {
                barBorderRadius: 2,
                color: "#00219C"
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
            { value: this.randomNum(this.currentArea), name: "特大桥", color: "#3700BF" },
            { value: this.randomNum(this.currentArea), name: "大桥", color: "#0C7FFF" },
            { value: this.randomNum(this.currentArea), name: "特长隧道", color: "#00C0B3" },
            { value: this.randomNum(this.currentArea), name: "长隧道", color: "#E0D996" }
          ],
          [{ value: this.randomNum(this.currentArea), name: "桥梁（座）", color: "#326CCA" }, { value: this.randomNum(this.currentArea), name: "隧道（处）", color: "#00839B" }]
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
          show: true,
          trigger: "item",
          position: ["50%", 10],
          extraCssText: "min-width:0;min-height:0;width:60px;height:0;background:rgba(0,0,0,0);",
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
            radius: ["48%", "60%"],
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
            radius: "45%",
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
      const { GgTotalMileage, DgTotalMileage, GdTotalMileage, SdTotalMileage, GgTotalMileageNot = 0, DgTotalMileageNot = 0, GdTotalMileageNot = 0, SdTotalMileageNot = 0 } = this.gonglu_jslc;
      const data = {
        values: [
          { total: 100, value: this.randomNum(this.currentArea), name: "国高" },
          { total: 100, value: this.randomNum(this.currentArea), name: "地高" },
          { total: 100, value: this.randomNum(this.currentArea), name: "国道" },
          { total: 100, value: this.randomNum(this.currentArea), name: "省道" }
        ]
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
                position: ["103%", 2],
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
        name: ["概算总投资", "开累完成"],
        values: [
          { total: 100, value: this.randomNum(this.currentArea), name: "国高" },
          { total: 150, value: this.randomNum(this.currentArea), name: "地高" },
          { total: 200, value: this.randomNum(this.currentArea), name: "国道" },
          { total: 134, value: this.randomNum(this.currentArea), name: "省道" }
        ]
      };
      const option = {
        grid: {
          left: "0%",
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
    }
  },
  created() {},
  activated() {
    this.fetch_data();
    try {
      areasRecover();
      initCamera();
    } catch (error) {
      console.warn(error);
    }
    fw.eventCtrl.on("areasClick", this.areasClick);
  },
  deactivated() {
    areasFade();
    clearHighlightAreaFeature();
    fw.eventCtrl.remove("areasClick", this.areasClick);
  },
  mounted() {},
  destroyed() {},
  methods: {
    ...storeIndex.mapActions(["fetch_data"]),
    randomNum(area) {
      const index = this.areas.findIndex(item => item === area);
      const num = Math.floor(Math.random() * 100);
      return num - index < 0 ? num : num - index;
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
