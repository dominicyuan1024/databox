<!-- 首页 水路 -->
<template>
  <div class="board">
    <div class="tit">
      <subTitle>形象进度</subTitle>
    </div>
    <div class="content">
      <div class="row">
        <div class="colum">
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart1"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart2"></vEcharts>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="colum">
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart3"></vEcharts>
          </div>
        </div>
        <div class="colum">
          <div class="chartbox">
            <vEcharts width="100%" height="100%" :option="chart4"></vEcharts>
          </div>
        </div>
      </div>
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
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    chart1() {
      const legendData = ["路面基层", "路面上层面"];
      const center = ["50%", "50%"];
      const grayItem = {
        value: "500",
        label: { show: false },
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: "transparent"
          }
        }
      };
      const colors = [
        {
          type: "linear",
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#00FDFE"
            },
            {
              offset: 1,
              color: "#003CB0"
            }
          ]
        },
        {
          type: "linear",
          x: 0,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#F9DAC4"
            },
            {
              offset: 1,
              color: "#F5661E"
            }
          ]
        }
      ];
      const option = {
        title: {
          text: "建设项目",
          x: "center",
          y: "35%",
          textStyle: {
            color: "#3586EC",
            fontSize: 20,
            fontWeight: "normal"
          }
        },
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
          top: "48%",
          data: legendData
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          containLabels: true
        },
        selectedMode: false,
        series: [
          {
            name: legendData[0],
            type: "pie",
            center: center,
            radius: ["55%", "60%"],
            hoverAnimation: false,
            color: colors[1],
            startAngle: 90,
            clockwise: false,
            data: [
              // {value:877, name:'历史'}
              {
                value: "877",
                name: legendData[0],
                label: {
                  color: "#fff",
                  formatter: "877个"
                },
                labelLine: {
                  show: true
                }
              },
              {
                ...grayItem,
                value: "500"
              }
            ]
          },
          {
            name: legendData[1],
            type: "pie",
            startAngle: 90,
            clockwise: false,
            radius: ["75%", "80%"],
            center: center,
            hoverAnimation: false,
            color: colors[0],
            data: [
              {
                value: "939",
                name: legendData[1],
                label: {
                  color: "#fff",
                  formatter: "877个"
                },
                labelLine: {
                  show: true,
                  length: 1,
                  length2: 1
                }
              },
              {
                ...grayItem,
                value: "200"
              }
            ]
          }
        ]
      };
      return option;
    },
    chart2() {
      const data = [
        { name: "桩基", value: 10, color: "#089E74", border: "#3FA9F5" },
        { name: "墩柱", value: 40, color: "#51AAE2", border: "#3FA9F5" },
        { name: "梁板预制", value: 70, color: "#4EC6C6", border: "#00FFFF" },
        { name: "梁板安装", value: 30, color: "#0C7FFF", border: "#29ABE2" }
      ];
      const option = {
        title: {
          text: "桥梁工程",
          x: "center",
          y: "15",
          textStyle: {
            color: "#3586EC",
            fontSize: 20,
            fontWeight: "normal"
          }
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 30,
          top: 70,
          containLabels: true
        },
        tooltip: {
          show: false,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{b0}: {c0}"
        },
        yAxis: {
          show: false, //是否显示x轴
          type: "value"
        },
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50C5FF" //y轴字体颜色
            }
          },
          splitLine: { show: false }, //横向的线
          axisTick: { show: false }, //y轴的端点
          axisLine: { show: false }, //y轴的线
          data: data.map(item => item.name)
        },
        series: [
          {
            name: "数据内框",
            barWidth: 18,
            type: "pictorialBar",
            symbol: "fixed",
            symbolSize: [18, 10],
            symbolMargin: 1,
            symbolRepeat: "repeat",
            data: data.map(item => {
              return {
                value: item.value,
                itemStyle: {
                  normal: {
                    barBorderRadius: 0,
                    color: item.color
                  }
                }
              };
            }),
            label: {
              show: false
            }
          },
          {
            name: "外框",
            type: "bar",
            barGap: "-120%",
            z: 0,
            barWidth: 25,
            data: data.map(item => {
              return {
                value: 100,
                itemStyle: {
                  normal: {
                    color: "transparent", // 填充色
                    barBorderColor: item.border, // 边框色
                    barBorderWidth: 2 // 边框宽度
                  }
                },
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#50C5FF"
                  },
                  formatter: `${item.value}%`
                }
              };
            })
          }
        ]
      };
      return option;
    },
    chart3() {
      const data = [
        {
          name: "路基挖方",
          value: 20,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#71D7D8" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "#0D8A96" // 0% 处的颜色
              }
            ]
          },
          border: "#0AB3CA"
        },
        {
          name: "路基填方",
          value: 70,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#75A8D8" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "#1147A6" // 0% 处的颜色
              }
            ]
          },
          border: "#0AB3CA"
        }
      ];
      const option = {
        title: {
          text: "路基工程",
          x: "center",
          y: "15",
          textStyle: {
            color: "#3586EC",
            fontSize: 20,
            fontWeight: "normal"
          }
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 40,
          top: 55,
          containLabels: true
        },
        tooltip: {
          show: false,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{b0}: {c0}"
        },
        yAxis: {
          // show: false, //是否显示x轴
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "#323C76",
              type: "dashed",
              opacity: 1
            }
          },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50C5FF"
            }
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLine: { show: false },
          data: data.map(item => item.name)
        },
        series: [
          {
            name: "数据内框",
            type: "bar",
            barWidth: 30,
            data: data.map(item => {
              return {
                value: item.value,
                itemStyle: {
                  normal: {
                    barBorderRadius: 0,
                    color: item.color,
                    barBorderColor: item.border, // 边框色
                    barBorderWidth: 1 // 边框宽度
                  }
                }
              };
            }),
            label: {
              show: true,
              position: "top",
              textStyle: {
                color: "#fff"
              },
              formatter: `{c}%`
            }
          },
          {
            name: "外框",
            type: "bar",
            barGap: "-100%",
            z: 0,
            barWidth: 30,
            itemStyle: {
              color: "#1F4D56"
            },
            data: data.map(() => {
              return {
                value: 100
              };
            })
          }
        ]
      };
      return option;
    },
    chart4() {
      const data = [
        {
          name: "主动掘进",
          value: 34,
          color: {
            type: "linear",
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#F9D9C3" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#EB8225" // 100% 处的颜色
              }
            ]
          }
        },
        {
          name: "二次衬砌",
          value: 23,
          color: "#48A9AC"
        }
      ];
      const center = ["50%", "50%"];
      const option = {
        title: {
          text: "隧道工程",
          x: "center",
          y: "35%",
          textStyle: {
            color: "#3586EC",
            fontSize: 20,
            fontWeight: "normal"
          }
        },
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
          top: "48%"
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
          containLabels: true
        },
        selectedMode: false,
        series: [
          {
            type: "pie",
            center: center,
            radius: ["58%", "65%"],
            hoverAnimation: false,
            startAngle: 90,
            label: {
              color: "#fff",
              formatter: "877个"
            },
            labelLine: {
              show: true,
              length: 6,
              length2: 1
            },
            data: data.map(item => {
              return { name: item.name, value: item.value, itemStyle: { color: item.color } };
            })
          }
        ]
      };
      return option;
    },
    chart5() {
      const data = [
        {
          name: "主线建设用地",
          value: 20,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#CCE0F4" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "#A91DDD" // 0% 处的颜色
              }
            ]
          },
          border: "#C9DCF1"
        },
        {
          name: "临时用地",
          value: 60,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#F9DAC5" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "#F7631D" // 0% 处的颜色
              }
            ]
          },
          border: "#C9DCF1"
        },
        {
          name: "梁板预制",
          value: 30,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#00FEFF" // 100% 处的颜色
              },
              {
                offset: 1,
                color: "#003BB0" // 0% 处的颜色
              }
            ]
          },
          border: "#C9DCF1"
        }
      ];
      const option = {
        grid: {
          left: 0,
          right: 0,
          bottom: 60,
          top: 40,
          containLabels: true
        },
        tooltip: {
          show: false,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: "{b0}: {c0}"
        },
        yAxis: {
          show: false, //是否显示x轴
          type: "value"
        },
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#50C5FF" //y轴字体颜色
            },
            formatter(val) {
              let index = 0;
              let newArray = [];
              while (index < val.length) {
                newArray.push(val.slice(index, (index += 4)));
              }
              return newArray.join("\n");
            }
          },
          splitLine: { show: false }, //横向的线
          axisTick: { show: false }, //y轴的端点
          axisLine: { show: false }, //y轴的线
          data: data.map(item => item.name)
        },
        series: [
          {
            name: "数据内框",
            type: "bar",
            barWidth: 18,
            data: data.map(item => {
              return {
                value: item.value,
                itemStyle: {
                  normal: {
                    color: item.color,
                    barBorderRadius: 18
                  }
                }
              };
            }),
            label: {
              show: false
            }
          },
          {
            name: "外框",
            type: "bar",
            barGap: "-120%",
            z: 0,
            barWidth: 25,
            data: data.map(item => {
              return {
                value: item.value,
                itemStyle: {
                  normal: {
                    color: "transparent", // 填充色
                    barBorderColor: item.border, // 边框色
                    barBorderWidth: 2, // 边框宽度
                    barBorderRadius: 25
                  }
                },
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#50C5FF"
                  },
                  formatter: `${item.value}%`
                }
              };
            })
          }
        ]
      };
      return option;
    },
    chart6() {
      const option = {
        title: {
          text: "桥隧比",
          left: "center",
          top: "30%",
          textStyle: {
            fontSize: 20,
            fontWeight: "normal",
            color: "#fff"
          }
        },
        graphic: [
          {
            type: "group",
            left: "center",
            top: "60%",
            children: [
              {
                type: "text",
                z: 100,
                left: "10",
                top: "middle",
                style: {
                  fill: "#fff",
                  text: "50%",
                  fontSize: 20
                }
              }
            ]
          }
        ],
        series: [
          {
            type: "liquidFill",
            waveAnimation: false,
            animationDuration: 500,
            animationDurationUpdate: 0,
            radius: "75%",
            center: ["50%", "50%"],
            data: [0.5, 0.5, 0.5], // data个数代表波浪数
            backgroundStyle: {
              borderWidth: 1,
              color: "rgb(255,0,255,0.1)"
            },
            label: {
              normal: {
                formatter: ""
              }
            },
            outline: {
              show: false
            },
            color: {
              type: "linear",
              x: 1,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 1,
                  color: "#003DB1"
                },
                {
                  offset: 0,
                  color: "#00FCFE"
                }
              ],
              globalCoord: false
            }
          }
        ]
      };
      return option;
    }
  },
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
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
