export const optionRT = {
  grid: {
    left: "0%",
    top: "10%",
    bottom: "5%",
    right: "0%",
    containLabel: true
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "line" //'line' | 'shadow'
    },
    extraCssText: "min-width:0;min-height:0;width:130px;height:0;background:rgba(0,0,0,0);",
    formatter(params) {
      const pr = params[0];
      return `
                    <div class="img_index_fk fullbg" style= "display:inline-block;padding:1em;padding-left:2em;color:#fff;">
                    ${pr.name}<br/>
                    投资金额: ${pr.value} 万元
                    </div>
                    `;
    }
  },
  xAxis: [
    {
      type: "category",
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: "rgba(102,239,255,1)"
        }
      },
      axisLabel: {
        textStyle: {
          color: "rgba(102,239,255,1)"
        }
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "万元",
      nameTextStyle: {
        align: "left",
        color: "rgba(102,239,255,1)"
      },
      min: 0,
      axisTick: {
        alignWithLabel: true
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
          color: "rgba(102,102,102,0.4)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgba(102,239,255,1)"
        }
      },
      axisLabel: {
        // show: false,
        textStyle: {
          color: "rgba(102,239,255,1)"
        }
      }
    }
  ],
  series: [
    {
      type: "bar",

      data: [9200, 3226, 19580, 4140, 5360, 9825, 6440, 7001, 7004, 4704, 15230, 13570],

      barWidth: "15px",
      itemStyle: {
        normal: {
          color: new window.echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(0,243,255,1)" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(16,70,90,1)" // 100% 处的颜色
              }
            ],
            false
          ),
          barBorderRadius: [30, 30, 0, 0]
        }
      }
    }
  ]
};

export function creatOption(data, tooltipname, unit) {
  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line" //'line' | 'shadow'
      },
      extraCssText: "min-width:0;min-height:0;width:100px;height:0;background:rgba(0,0,0,0);",
      formatter(params) {
        const pr = params[0];
        return `
                    <div class="img_index_fk fullbg" style= "display:inline-block;padding:1em;padding-left:2em;color:#fff;">
                    ${pr.name}</br>
                    ${tooltipname}: ${pr.value} ${unit}</br>
                    </div>
                    `;
      }
    },
    grid: {
      left: "4%",
      right: "1%",
      bottom: "4%",
      top: "10%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: "rgba(102,239,255,1)"
          }
        },
        axisLabel: {
          textStyle: {
            color: "rgba(102,239,255,1)"
          }
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: unit,
        nameTextStyle: {
          align: "right",
          verticalAlign: "bottom",
          color: "rgba(102,239,255,1)"
        },
        min: 0,
        axisTick: {
          alignWithLabel: true
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
            color: "rgba(102,102,102,0.4)"
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(102,239,255,1)"
          }
        },
        axisLabel: {
          // show: false,
          textStyle: {
            color: "rgba(102,239,255,1)"
          }
        }
      }
    ],
    series: [
      {
        type: "line",
        showAllSymbol: true,
        symbol: "circle",
        symbolSize: 10,
        data: data,
        lineStyle: {
          normal: {
            color: "rgba(4,169,239,1)",
            shadowColor: "rgba(4,169,239,0.3)",
            shadowBlur: 0,
            shadowOffsetY: 5,
            shadowOffsetX: 5
          }
        },
        label: {
          show: true,
          position: "top",
          textStyle: {
            color: "rgba(102,239,255,1)"
          }
        },
        itemStyle: {
          color: "rgba(4,169,239,1)",
          borderColor: "#fff",
          borderWidth: 2,
          shadowColor: "rgba(0, 0, 0, .3)",
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2
        },
        areaStyle: {
          normal: {
            color: new window.echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(4,169,239,0.3)"
                },
                {
                  offset: 1,
                  color: "rgba(4,169,239,0)"
                }
              ],
              false
            ),
            shadowColor: "rgba(4,169,239,0.9)",
            shadowBlur: 20
          }
        }
      }
    ]
  };
}
