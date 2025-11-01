<!--  -->
<template>
  <div class="gsglbottom">
    <div class="itemblock">
      <subTitle>累计资金到位</subTitle>
      <vEcharts width="100%" height="100%" :option="chart1"></vEcharts>
    </div>
    <div class="itemblock">
      <subTitle>今年资金到位</subTitle>
      <vEcharts width="100%" height="100%" :option="chart2"></vEcharts>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    chart1() {
      const legendData = ["国道", "省道"];
      const center = ["40%", "39%"];
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
      const fillItem = {
        type: "pie",
        center: center,
        radius: ["52%", "55%"],
        hoverAnimation: false,
        color: "#5BF3FF",
        labelLine: { show: false },
        data: [10]
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
              color: "#F36C1F"
            },
            {
              offset: 1,
              color: "#F8D9C2"
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
              color: "#2089CF"
            },
            {
              offset: 1,
              color: "#2089CF"
            }
          ]
        }
      ];
      const option = {
        title: {
          text: "到位资金",
          x: "29%",
          y: "34%",
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
          itemWidth: 10,
          itemHeight: 10,
          right: "10%",
          data: legendData
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
            name: legendData[0],
            type: "pie",
            center: center,
            radius: ["50%", "57%"],
            hoverAnimation: false,
            color: colors[1],
            startAngle: 100,
            data: [
              // {value:877, name:'历史'}
              {
                value: "877",
                name: legendData[0],
                label: {
                  color: colors[1].colorStops[0].color,
                  formatter: "877个"
                }
              },
              {
                ...grayItem,
                value: "500"
              }
            ]
          },
          {
            ...fillItem,
            zlevel: -1,
            radius: ["52.5%", "54.5%"]
          },
          {
            name: legendData[1],
            type: "pie",
            startAngle: -80,
            radius: ["65%", "72%"],
            center: center,
            hoverAnimation: false,
            color: colors[0],
            data: [
              {
                value: "939",
                name: legendData[1],
                label: {
                  color: colors[0].colorStops[0].color,
                  formatter: "877个"
                }
              },
              {
                ...grayItem,
                value: "200"
              }
            ]
          },
          {
            ...fillItem,
            zlevel: -1,
            radius: ["67.5%", "69.5%"]
          }
        ]
      };
      return option;
    },
    chart2() {
      const data = {
        name: ["今年到位资金", "银行贷款到位资金"],
        values: [{ total: 3268.8804, value: 1882.913, name: "今年到位资金" }, { total: 9717.7261, value: 4585.425, name: "银行贷款到位资金" }]
      };
      const option = {
        grid: {
          left: "10%",
          right: "10%",
          bottom: "25%",
          top: "15%",
          containLabel: true
        },
        legend: {
          orient: "horizontal",
          itemWidth: 10,
          itemHeight: 10,
          borderRadius: 0,
          right: "9%",
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
  mounted() {},
  destroyed() {}
};
</script>
<style scoped>
.gsglbottom {
  display: flex;
  height: 100%;
}
.itemblock {
  width: 50%;
}
</style>
