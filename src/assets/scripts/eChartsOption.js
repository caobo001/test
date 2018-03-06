var echarts = require('echarts/lib/echarts')

module.exports = {
  lineOptions: function (xAxisData, seriesData) {
    // xAxisData: ['11-05','11-06','11-07','11-08','11-09','11-10','11-11']
    // seriesData: [820, 932, 901, 934, 1290, 1330, 1320]
    return {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }
      ],
      series: [
        {
          name: '指数',
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color: '#ef3b3a'
            }
          },

          lineStyle: {
            normal: {
              color: '#ef3b3a'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: '#ef3b3a' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }], false)
            }
          },
          data: seriesData
        }
      ]
    }
  },

  barOptions: function (xAxisData, seriesData, seriesName) {
    return {
      color: ['#f08415'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: xAxisData,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }
      ],
      series: [
        {
          name: seriesName,
          type: 'bar',
          barWidth: '50%',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0, color: '#ef3b3a' // 0% 处的颜色
              }, {
                offset: 1, color: '#fff' // 100% 处的颜色
              }], false)
            }
          },
          data: seriesData
        }
      ]
    }
  },
  multiLineOptions: function (xAxisData, seriesData) {
    return {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          data: xAxisData
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          }
        }
      ],
      series: [
        {
          name: '数量',
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'top'
            }
          },
          itemStyle: {
            normal: {
              color: '#ef3b3a'
            }
          },

          lineStyle: {
            normal: {
              color: '#ef3b3a'
            }
          },
          data: seriesData
        }
      ]
    }
  }

}
