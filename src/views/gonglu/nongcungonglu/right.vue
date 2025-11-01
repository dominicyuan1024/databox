<!-- 首页 农村公路 -->
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
      const option = {
        title: {
          text: "路面基层",
          subtext: "（平方米）",
          x: "center",
          y: "center",
          textStyle: {
            color: "rgba(80, 197, 255, 1)",
            fontSize: 18,
            fontWeight: "normal"
          },
          subtextStyle: {
            color: "rgba(80, 197, 255, 1)",
            fontSize: 12,
            fontWeight: "normal"
          }
        },
        calculable: true,
        series: [
          {
            type: "pie",
            silent: true,
            radius: ["60%", "55%"],
            center: ["50%", "50%"],
            data: [
              {
                value: 34,
                itemStyle: {
                  color: "rgba(80, 197, 255, 1)"
                }
              },
              {
                value: 52,
                name: "rose2",
                itemStyle: {
                  color: "transparent"
                }
              }
            ]
          },
          {
            type: "pie",
            silent: true,
            radius: ["70%", "55%"],
            center: ["50%", "50%"],
            data: [
              {
                value: 34,
                itemStyle: {
                  color: "transparent"
                }
              },
              {
                value: 52,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#CDDEED" // 100% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#F6671E" // 0% 处的颜色
                      }
                    ]
                  }
                },
                label: {
                  color: "#F5671E",
                  fontSize: 12,
                  formatter: "80㎡"
                }
              }
            ]
          }
        ]
      };
      return option;
    },
    chart2() {
      const colorArray = [
        {
          top: "#CDDEED", //黄
          bottom: "#F6671E"
        }
      ];
      const option = {
        title: {
          text: "路面垫层",
          x: "center",
          y: "10%",
          textStyle: {
            color: "rgba(80, 197, 255, 1)",
            fontSize: 18,
            fontWeight: "normal"
          }
        },
        xAxis: {
          type: "value",
          name: "平方米",
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#50C5FF"
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.2)"
            }
          }
        },
        yAxis: [
          {
            type: "category",

            axisTick: {
              show: false
            },
            splitLine: {
              //网格线
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#50C5FF"
              }
            },
            data: [""]
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: 30,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "2230㎡",
                textStyle: {
                  color: "white", //color of value,
                  fontSize: 16
                }
              }
            },
            itemStyle: {
              normal: {
                show: true,
                color: function(params) {
                  let num = colorArray.length;
                  return {
                    type: "linear",
                    colorStops: [
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top
                      },
                      {
                        offset: 0,
                        color: colorArray[params.dataIndex % num].bottom
                      },
                      {
                        offset: 1,
                        color: colorArray[params.dataIndex % num].top
                      }
                    ]
                    //globalCoord: false
                  };
                },
                barBorderRadius: 70,
                borderWidth: 0,
                borderColor: "#333"
              }
            },
            barGap: "0%",
            barCategoryGap: "50%",
            data: [2235]
          }
        ]
      };
      return option;
    },
    chart3() {
      const option = {
        title: {
          text: "路面面层",
          x: "center",
          textStyle: {
            color: "rgba(80, 197, 255, 1)",
            fontSize: 18,
            fontWeight: "normal"
          }
        },
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#BCDFF9" // 100% 处的颜色
            },
            {
              offset: 1,
              color: "#015FAB" // 0% 处的颜色
            }
          ]
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: {
          type: "value",
          name: "平方米",
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#50C5FF"
            }
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,0.2)"
            }
          }
        },
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "15%",
            data: [2235],
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}",
                textStyle: {
                  color: "white", //color of value,
                  fontSize: 12,
                  fontWeight: 600
                }
              }
            }
          }
        ]
      };
      return option;
    },
    chart4() {
      const data = 400; //数值大小
      const max = 500; //满刻度大小
      const option = {
        title: {
          text: "路基挖方",
          subtext: "（平方米）",
          x: "center",
          y: "center",
          textStyle: {
            color: "rgba(80, 197, 255, 1)",
            fontSize: 18,
            fontWeight: "normal"
          },
          subtextStyle: {
            color: "rgba(80, 197, 255, 1)",
            fontSize: 12,
            fontWeight: "normal"
          }
        },
        color: ["#328DF9", "", "rgba(255,255,255,.2)"],
        series: [
          {
            type: "pie",
            silent: true,
            radius: ["70%", "60%"],
            center: ["50%", "50%"],

            data: [
              {
                name: "",
                value: 52,
                label: {
                  show: true,
                  position: "center",
                  color: "#47A7D7"
                },
                itemStyle: {
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
                  }
                }
              },
              {
                value: 34,
                name: "",
                label: {
                  show: true,
                  position: "center",
                  color: "#47A7D7"
                },
                itemStyle: {
                  color: "rgba(95,103,108, 0.3)"
                }
              }
            ]
          },
          {
            type: "pie",
            silent: true,
            center: ["50%", "50%"],
            radius: ["90%", "88%"],
            hoverAnimation: false,
            data: [
              {
                name: "",
                value: data,
                label: {
                  show: true,
                  position: "center",
                  color: "#47A7D7"
                }
              },
              {
                //画中间的图标
                name: "",
                value: 0,
                label: {
                  position: "inside",
                  backgroundColor: "#328DF9",
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  padding: 10
                }
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: max - data,
                label: {
                  show: false
                }
              }
            ]
          }
        ]
      };
      return option;
    },
    chart5() {
      const data = {
        value: 80,
        name: "完成率"
      };
      const option = {
        title: {
          text: "路基填方",
          subtext: "（万平方米）",
          x: "center",
          y: "center",
          textStyle: {
            color: "rgba(80, 197, 255, 1)",
            fontSize: 18,
            fontWeight: "normal"
          },
          subtextStyle: {
            color: "rgba(80, 197, 255, 1)",
            fontSize: 12,
            fontWeight: "normal"
          }
        },
        data: [
          {
            name: data.name
          }
        ],
        series: [
          {
            // 主圆环
            name: data.name,
            type: "pie",
            silent: true,
            radius: ["80%", "65%"],
            startAngle: 225,
            color: [
              {
                type: "linear",
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#BCDFF9" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#015FAB" // 100% 处的颜色
                  }
                ]
              },
              "transparent"
            ],
            hoverAnimation: true,
            legendHoverLink: false,
            z: 10,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: (75 * data.value) / 100
              },
              {
                value: 100 - (75 * data.value) / 100
              }
            ]
          },
          {
            // 背景圆环
            name: "",
            type: "pie",
            radius: ["80%", "65%"],
            silent: true,
            startAngle: 225,
            labelLine: {
              normal: {
                show: false
              }
            },
            z: 5,
            data: [
              {
                value: 75,
                itemStyle: {
                  color: "#F7C26D"
                }
              },
              {
                value: 25,
                itemStyle: {
                  color: "transparent"
                }
              }
            ]
          }
        ]
      };
      return option;
    },
    chart6() {
      const data = [
        {
          name: "桥梁",
          value: 50,
          color: "#4EC6C6",
          border: "#4EC6C6"
        },
        {
          name: "涵洞",
          value: 50,
          color: "#F7C26D",
          border: "#F7C26D"
        },
        {
          name: "隧道",
          value: 50,
          color: "#006EB3",
          border: "#006EB3"
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
          }
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
              fontSize: 18,
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
            type: "pictorialBar",
            barWidth: 26,
            symbol: "fixed",
            symbolSize: [30, 20],
            symbolMargin: 3,
            symbolRepeat: "repeat",
            symbolBoundingData: 80,
            z: 10,
            data: data.map(item => {
              return {
                value: item.value,
                itemStyle: {
                  normal: {
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
            barGap: "-122%",
            z: 0,
            barWidth: 38,
            data: data.map(item => {
              return {
                value: 80,
                itemStyle: {
                  normal: {
                    color: "transparent", // 填充色
                    barBorderColor: item.border, // 边框色
                    barBorderWidth: 2 // 边框宽度
                  }
                },
                label: {
                  show: false,
                  position: "top",
                  textStyle: {
                    color: "#50C5FF"
                  }
                }
              };
            })
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
  margin-top: 20px;
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
