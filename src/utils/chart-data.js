/**
 * 折线图配置
 */
import echarts from 'echarts'

var chartConfig = {
  options: {
    backgroundColor: '#394056',
    title: {
      top: 20,
      text: '水果月销售统计',
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
        color: '#F1F1F3'
      },
      left: '1%'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        lineStyle: {
          color: '#57617B'
        }
      }
    },
    legend: {
      top: 20,
      icon: 'rect',
      itemWidth: 14,
      itemHeight: 5,
      itemGap: 13,
      data: ['CMCC', 'CTCC', 'CUCC'],
      right: '4%',
      textStyle: {
        fontSize: 12,
        color: '#F1F1F3'
      }
    },
    grid: {
      top: 100,
      left: '2%',
      right: '2%',
      bottom: '2%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: '#57617B'
        }
      },
      // 数据1：X轴下标
      data: []
    }],
    yAxis: [{
      type: 'value',
      name: '(元)',
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#57617B'
        }
      },
      axisLabel: {
        margin: 10,
        textStyle: {
          fontSize: 14
        }
      },
      splitLine: {
        lineStyle: {
          color: '#57617B'
        }
      }
    }],
    series: [{
      name: 'CMCC',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 1
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(137, 189, 27, 0.3)'
          }, {
            offset: 0.8,
            color: 'rgba(137, 189, 27, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(137,189,27)',
          borderColor: 'rgba(137,189,2,0.27)',
          borderWidth: 12

        }
      },
      data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
    }, {
      name: 'CTCC',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 1
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(0, 136, 212, 0.3)'
          }, {
            offset: 0.8,
            color: 'rgba(0, 136, 212, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(0,136,212)',
          borderColor: 'rgba(0,136,212,0.2)',
          borderWidth: 12

        }
      },
      data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
    }, {
      name: 'CUCC',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      showSymbol: false,
      lineStyle: {
        normal: {
          width: 1
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(219, 50, 51, 0.3)'
          }, {
            offset: 0.8,
            color: 'rgba(219, 50, 51, 0)'
          }], false),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10
        }
      },
      itemStyle: {
        normal: {
          color: 'rgb(219,50,51)',
          borderColor: 'rgba(219,50,51,0.2)',
          borderWidth: 12
        }
      },
      data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
    }]
  }
}


var colorConfig = {
  colors: [
    'rgb(137,189,27)',
    'rgb(0,136,212)',
    'rgb(219,50,51)',
    'rgb(255,219,76)',
    'rgb(144,22,235)',
    'rgb(255,0,255)',
    'rgb(123,104,238)',
    'rgb(218,165,32)',
  ]
}

// 'rgba(218,165,32,0.2)'
function getRGBA(rgba) {
  return rgba.replace('rgba', '').split(',')
}

// 'rgb(137,189,27)'
function getStyleColor(rgb) {
  const rgbs = rgb.replace('rgb', '').replace('(', '').replace(')', '').split(',')
  let colors = []
  colors.push(`rgba(${rgbs[0]},${rgbs[1]},${rgbs[2]},0.3)`)
  colors.push(`rgba(${rgbs[0]},${rgbs[1]},${rgbs[2]},0)`)
  colors.push(`rgb(${rgbs[0]},${rgbs[1]},${rgbs[2]})`)
  colors.push(`rgba(${rgbs[0]},${rgbs[1]},${rgbs[2]},0.2)`)
  return colors
}

function getSeries(color, data) {
  let styleColor = getStyleColor(color)
  return {
    name: data.category,
    type: 'line',
    // smooth: true,
    // symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 3
      }
    },
    // areaStyle: {
    //   normal: {
    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //       offset: 0,
    //       color: styleColor[0]
    //     }, {
    //       offset: 0.8,
    //       color: styleColor[1]
    //     }], false),
    //     shadowColor: 'rgba(0, 0, 0, 0.1)',
    //     shadowBlur: 10
    //   }
    // },
    itemStyle: {
      normal: {
        color: styleColor[2],
        borderColor: styleColor[3],
        borderWidth: 12

      }
    },
    data: data.sales
  }
}

export { colorConfig, chartConfig, getSeries }
