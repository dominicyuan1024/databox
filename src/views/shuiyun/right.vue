<!-- 水运建设 -->
<template>
  <div class="board">
    <div class="tit">
      <mainTitle icon="img_sl">单位工程完成情况</mainTitle>
    </div>
    <div class="content">
      <div class="row">
        <div class="colum">
          <div class="subtitbox">
            <subTitle>清礁工程</subTitle>
          </div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart1"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox">
            <subTitle>疏浚工程</subTitle>
          </div>
          <!-- @mouseover="xs1()" @mouseout="yc1()" -->
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart2"></vEcharts>
            <div class="ts1" :style="{ display: xy1 }">
              <p class="p1">疏浚险滩：0%</p>
              <p class="p2">疏浚面积：0%</p>
              <p class="p3">疏浚量：61.09%</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="colum">
          <div class="subtitbox">
            <subTitle>筑坝工程</subTitle>
          </div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart3"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox">
            <subTitle>港口工程</subTitle>
          </div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart4"></vEcharts>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="colum">
          <div class="subtitbox">
            <subTitle>码头工程</subTitle>
          </div>
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart5"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="subtitbox">
            <subTitle>航标工程</subTitle>
          </div>
          <!-- @mouseover="xs2()" @mouseout="yc2()" -->
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart6"></vEcharts>
            <div class="ts2" :style="{ display: xy2 }">
              <p class="p4">航标数量：51.12%</p>
              <p class="p5">航道标牌及安全标志牌：0%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      xy1: "none",
      xy2: "none"
    };
  },
  computed: {
    chart1() {
      var getmyd = [0, 0, 73.4]; //完成度
      // var getmydzd = []; //总完成度100%
      // for (let i = 0; i < getmyd.length; i++) {
      //   getmydzd.push(100);
      // }

      const option = {
        grid: {
          left: "5%",
          right: "5%",
          bottom: "5%",
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
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
            // nameTextStyle:{
            //   align:'left',
            //   verticalAlign:'top'
            // },
            // data: ["清礁险滩（处）", "清礁区（处）", "清礁量（m³）"]
          }
        ],
        series: [
          {
            name: "已开工",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: [50, 0, 50, 0],
                color: new window.echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#005EB4"
                  },
                  {
                    offset: 1,
                    color: "#00FFFF"
                  }
                ])
              }
            },
            label: {
              normal: {
                color: "#00FFFF",
                show: true,
                position: [190, -25],
                textStyle: {},
                formatter: `{c}%`,
                fontWeight: "normal",
                fontSize: 16
              }
            },
            barWidth: "40%",
            data: getmyd
          },
          {
            name: "未开工",
            type: "bar",
            barWidth: "40%",
            barGap: "-100%",
            data: [{ name: "清礁险滩（处）", value: 100 }, { value: 100, name: "清礁区（处）" }, { value: 100, name: "清礁量（m³）" }],
            itemStyle: {
              normal: {
                color: "#214EC1",
                barBorderRadius: [50, 0, 50, 0]
              }
            },
            label: {
              normal: {
                color: "#00FFFF",
                show: true,
                position: [0, -25],
                textStyle: {},
                formatter: `{b}`,
                fontWeight: "normal",
                fontSize: 16
              }
            }
          }
        ]
      };
      return option;
    },
    chart2() {
      const data = {
        values: [
          { value: 33, name: "疏浚险滩（个）", color: "#882AF6" },
          {
            value: 33,
            name: "疏浚面积（m²）",
            color: new window.echarts.graphic.LinearGradient(
              0,
              0,
              1,
              1,
              [
                {
                  offset: 0,
                  color: "#00F9FC" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#005DB4" // 100% 处的颜色
                }
              ],
              false
            )
          },
          {
            value: 33,
            name: "疏浚量（m³）",
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
          }
        ]
      };
      const option = {
        grid: {
          left: "0%",
          right: "0%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%",
          position: ["47%", "50%"],
          backgroundColor: "rgba(98, 107, 120, 0)",
          textStyle: {}
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
            name: "疏浚",
            type: "pie",
            center: ["50%", "40%"],
            radius: ["30%", "50%"],
            // hoverAnimation: false, //鼠标移入变大
            tooltip: {
              show: true
            },
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "outside"
              // formatter: "{b}: {c}%",
              // color: "#fff",
              // fontWeight: "normal",
              // fontSize: "12px"
            },
            // labelLine: {
            //   normal: {
            //     length: 5,
            //     length2: 3,
            //     smooth: true
            //   }
            // },
            data: data.values.map(item => {
              return { ...item, itemStyle: { color: item.color } };
            })
          }
        ]
      };

      return option;
    },
    chart3() {
      const data = {
        name: ["概算总投资", "开累完成"],
        values: [{ total: 0, value: 0, name: "长度(米)" }, { total: 80, value: 75.58, name: "抛石坝体(m³)" }, { total: 49, value: 26.8, name: "扭王字块\n安装(m³)" }]
      };
      const option = {
        grid: {
          left: "0%",
          right: "0%",
          bottom: "10%",
          top: "20%",
          containLabel: true
        },
        legend: {
          show: false
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
            interval: 0,
            color: "#00FFFF"
          }
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          name: "百分比（%）",
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
            show: true,
            interval: "auto",
            formatter: "{value} %",
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
          { total: 500, value: 0, label: "土石方开挖（m³）" },
          { total: 500, value: 0, label: "土石方回填（m³）" },
          { total: 500, value: 0, label: "开挖工程（m³）" },
          { total: 500, value: 0, label: "填筑工程（m³）" },
          { total: 500, value: 0, label: "砌筑工程（m³）" }
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
                color: "#00FFFF",
                fontSize: 10,
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
            data: data.values.map(item => item.label)
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#00FFFF"
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
            barWidth: "40%",
            data: data.values.map(item => ({ name: item.label, value: item.value }))
          },
          {
            name: "total",
            type: "bar",
            barWidth: "40%",
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
    chart5() {
      const data = {
        values: [
          { total: 500, value: 335, label: "土石方工程（m³）" },
          { total: 500, value: 310, label: "填筑工程（m³）" },
          { total: 500, value: 234, label: "砌筑工程（m³）" },
          { total: 500, value: 234, label: "桩基工程（m³）" },
          { total: 500, value: 234, label: "现浇栓工程（m³）" },
          { total: 500, value: 234, label: "钢筋工程（t）" }
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
                color: "#00FFFF",
                fontSize: 10,
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
            data: data.values.map(item => item.label)
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: true,
            axisLabel: {
              textStyle: {
                color: "#00FFFF"
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
            data: data.values.map(item => ({ name: item.label, value: item.value }))
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
      const option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c}%",
          position: ["10%", "50%"],
          backgroundColor: "rgba(98, 107, 120, 0)",
          textStyle: {}
        },
        toolbox: {
          show: true
        },
        legend: {
          type: "plain",
          orient: "vertical",
          align: "left",
          left: "30%",
          top: "60%",
          textStyle: {
            color: "#66FFFF"
          },
          data: ["航标数量（座）", "航道标牌及安全标志牌（座）"]
        },
        series: [
          {
            name: "",
            type: "pie",
            hoverAnimation: false, //鼠标移入变大
            center: ["30%", "30%"],
            radius: ["55%", "56%"],
            tooltip: {
              show: false
            },
            label: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 200, itemStyle: { color: "#1F878B" } },
              { value: 410, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 200, itemStyle: { color: "#1F878B" } },
              { value: 380, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 200, itemStyle: { color: "#1F878B" } },
              { value: 501, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } }
            ]
          },
          {
            type: "pie",
            selectedMode: "single",
            hoverAnimation: false, //鼠标移入变大
            center: ["30%", "30%"],
            radius: ["50%", "54%"],
            legend: {
              orient: "vertical",
              left: "left",
              data: ["iphone3"],
              selected: {
                iphone3: false
                //不想显示的都设置成false
              }
            },
            label: {
              normal: {
                position: "inner",
                show: false
              }
            },
            data: [{ value: 1, itemStyle: { color: "#1BB2B2" } }]
          },
          {
            type: "pie",
            zlevel: 3,
            silent: true,
            hoverAnimation: false, //鼠标移入变大
            center: ["30%", "30%"],
            radius: ["48%", "49%"],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                borderWidth: 10,
                borderColor: "RGBA(38, 46, 57, 0)"
              }
            },
            data: [
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 41, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 38, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 50, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 41, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 38, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 50, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 41, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 38, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } },
              { value: 20, itemStyle: { color: "#1F878B" } },
              { value: 50, itemStyle: { normal: { color: "transparent", borderColor: "transparent" } } }
            ]
          },
          {
            name: "航标工程",
            type: "pie",
            label: {
              normal: {
                position: "inner",
                show: false
              }
            },
            // hoverAnimation: false, //鼠标移入变大
            center: ["30%", "30%"],
            radius: [0, "45%"],
            data: [
              {
                value: 83,
                name: "航标数量（座）",
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
                }
              },
              { value: 17, name: "航道标牌及安全标志牌（座）", itemStyle: { color: "#214EC1" } }
            ]
          }
        ]
      };
      return option;
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {
    xs1() {
      this.xy1 = "block";
    },
    yc1() {
      this.xy1 = "none";
    },
    xs2() {
      this.xy2 = "block";
    },
    yc2() {
      this.xy2 = "none";
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
.chartbox:nth-child(2) {
  position: relative;
}
/* .ts1 {
  position: absolute;
  width: 50%;
  height: 40%;
  left: 50%;
  top: 20%;
  background: rgba(175, 180, 189, 0.4);
} */
.p1,
.p2,
.p3 {
  margin-left: 3%;
  padding-left: 5%;
  height: 33.33%;
  line-height: -50%;
  color: #ffffff;
}
.p1,
.p2 {
  border-bottom: 1px solid #ffffff;
}
.chartbox:nth-child(6) {
  position: relative;
}
/* .ts2 {
  position: absolute;
  width: 90%;
  height: 30%;
  left: 20%;
  top: 20%;
  background: rgba(175, 180, 189, 0.4);
} */
.p4,
.p5 {
  margin-left: 3%;
  padding-left: 5%;
  height: 50%;
  line-height: -50%;
  color: #ffffff;
}
.p4 {
  border-bottom: 1px solid #ffffff;
}
</style>
