<!--  -->
<template>
  <div class="gsglbottom">
    <div class="itemblock">
      <subTitle>互联互通项目</subTitle>
      <vEcharts width="100%" height="100%" :option="chart1"></vEcharts>
    </div>
    <div class="itemblock">
      <subTitle>十三五建设项目</subTitle>
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
      const legendData = ["前期", "已开工"];
      const center = ["40%", "39%"];
      const grayItem = {
        value: "500",
        label: { show: false },
        labelLine: {
          show: false
        },
        itemStyle: {
          normal: {
            color: "#5F676D"
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
              color: "#A120D2"
            },
            {
              offset: 1,
              color: "#CCDFF4"
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
              color: "#F6661E"
            },
            {
              offset: 1,
              color: "#F8D9C1"
            }
          ]
        }
      ];
      const option = {
        title: {
          text: "建设项目",
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
          }
        ]
      };
      return option;
    },
    chart2() {
      let data = {
        left: {
          name: "国高",
          data: [
            {
              value: 22,
              label: `建设项目`
            },
            {
              value: 23,
              label: "已开工"
            },
            {
              value: 4,
              label: "未开工"
            },
            {
              value: 4,
              label: "已通车"
            }
          ]
        },
        right: {
          name: "地高",
          data: [
            {
              value: 5,
              label: "建设项目"
            },
            {
              value: 19,
              label: "已开工"
            },
            {
              value: 23,
              label: "未开工"
            },
            {
              value: 43,
              label: "已通车"
            }
          ]
        }
      };

      let legendData = [data.left.name, data.right.name];
      let yAxisDataN = data.left.data.map(e => e.label);
      let yAxisDataV = data.right.data.map(e => e.label);
      let yAxisLabelN = data.left.data.map(e => e.value);
      let yAxisLabelV = data.right.data.map(e => e.value);

      let top = 30;
      let bottom = 20;

      const option = {
        tooltip: {
          show: false,
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          selectedMode: false,
          left: "center",
          top: -6,
          itemWidth: 40, //图例标记的图形宽度
          itemHeight: 20, //图例标记的图形高度
          data: legendData,
          borderRadius: 0,
          itemGap: 10,
          textStyle: {
            color: "#fff",
            fontSize: 14,
            padding: [0, 0, -2, -39]
          }
        },
        grid: [
          {
            right: "40%",
            width: "50%",
            containLabel: true,
            bottom,
            top
          },
          {
            left: "50%",
            width: 0,
            top: top,
            bottom: bottom
          },
          {
            left: "40%",
            width: "50%",
            containLabel: true,
            bottom,
            top
          }
        ],
        xAxis: [
          {
            type: "value",
            inverse: true,
            show: false
          },
          {
            gridIndex: 1,
            show: false
          },
          {
            gridIndex: 2,
            type: "value",
            show: false
          }
        ],
        yAxis: [
          {
            position: "right",
            axisLabel: {
              verticalAlign: "top",
              align: "right",
              margin: 0,
              padding: [-20, 0, 0, 0],
              color: "#3586EC"
            },
            inverse: true,
            axisLine: {
              show: false
            },
            type: "category",
            axisTick: {
              show: false
            },
            data: yAxisDataN
          },
          {
            gridIndex: 1,
            position: "center",
            type: "category",
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true
            }
          },
          {
            gridIndex: 2,
            position: "left",
            axisLabel: {
              align: "left",
              verticalAlign: "top",
              margin: 0,
              padding: [-20, 0, 0, 0],
              color: `#3586EC`
            },
            axisLine: {
              show: false
            },
            type: "category",
            inverse: true,
            axisTick: {
              show: false
            },
            data: yAxisDataV
          }
        ],
        series: [
          {
            name: legendData[0],
            type: "bar",
            barWidth: 8,
            label: {
              show: true,
              distance: 5,
              position: "left",
              color: "#3586EC",
              formatter: "{c}个"
            },
            itemStyle: {
              color: new window.echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#6F17D3"
                },
                {
                  offset: 1,
                  color: "#FDDCA2"
                }
              ])
            },
            data: yAxisLabelN
          },
          {
            type: "bar",
            barWidth: 8,
            label: {
              show: true,
              distance: 5,
              position: "right",
              color: "#3586EC",
              formatter: "{c}个"
            },
            xAxisIndex: 2,
            yAxisIndex: 2,
            name: legendData[1],
            itemStyle: {
              color: new window.echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#00FEFF"
                },
                {
                  offset: 1,
                  color: "#003BB0"
                }
              ])
            },
            data: yAxisLabelV
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
