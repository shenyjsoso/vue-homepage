<template>
  <div id="monitorNum">
    <div class="amount">
      <div class="content" id="graph"></div>
      <div class="content2" id="graph2"></div>
    </div>
  </div>
</template>

<script>
import charts from "echarts";
export default {
  name: "monitorNum",
  data() {
    return {
      resultTime: {},
      timeData: { today: [], yesterday: [] },
      numData: { today: [], yesterday: [] },
      nameList: [
        "监控消息总量",
        "MQ消息量",
        "WS消息量",
        "异常消息量",
        "平均耗时",
        "最大耗时"
      ],
      yesterdayColor: "#73DEB3",
      todayColor: "#5B8FF9",
      Interval: null
    };
  },
  mounted() {
    this.getData();
  },
  beforeDestroy() {
    window.clearInterval(this.Interval);
  },
  methods: {
    getData() {
      let param = {
        startDate: "2020-04-27"
      };
      this.$ajax.adminHome.findMonitorMsgAmount(param).then(
        res => {
          var data = res.data;
          var timeData = { today: [], yesterday: [] };
          var numData = { today: [], yesterday: [] };
          for (var i = 0; i < data.length; i++) {
            if (
              data[i].name == this.nameList[4] ||
              data[i].name == this.nameList[5]
            ) {
              if (data[i].category == 1) {
                timeData.today.push(data[i].amount);
              } else {
                timeData.yesterday.push(data[i].amount);
              }
            } else {
              if (data[i].category == 1) {
                numData.today.push(data[i].amount);
              } else {
                numData.yesterday.push(data[i].amount);
              }
            }
          }
          this.timeData = timeData;
          this.numData = numData;
          this.$nextTick(() => {
            this.init();
          });
        },
        () => {}
      );
    },
    init() {
      this.newchartone();
      this.newcharttwo();
    },
    newchartone() {
      var myChart = charts.init(document.getElementById("graph"));
      var todayData = this.numData.today;
      var yesterday = this.numData.yesterday;
      var option = {
        title: {
          text: "监控消息数量",
          textStyle: {
            color: "#000",
            fontWeight: 300,
            fontSize: 22
          },
          top: 15,
          left: 15
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["今日", "昨日"],
          left: "50%",
          selectedMode: false,
          top: 25,
          itemWidth: 12,
          itemHeight: 10,
          //   left: 200,
          textStyle: {
            color: "#000"
          }
        },
        grid: {
          left: "8%",
          right: "0",
          bottom: "3%",
          top: "30%",
          containLabel: true
        },
        xAxis: [
          {
            show: true,
            type: "category",
            data: ["消息总量", "异步消息量", "同步消息量", "异常消息量"],
            splitLine: {
              show: false,
              lineStyle: {
                color: "#000",
                width: 2,
                opacity: 0.1
              }
            },
            // splitLine: {
            //   show: false,
            //   lineStyle: {
            //     color: "rgb(79,170,225)",
            //     type: "dotted",
            //     opacity: 0.4
            //   }
            // },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(79,170,225)",
                width: "1"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#000"
            }
          }
        ],
        yAxis: [
          {
            name: "数量",
            position: "left",
            show: true,
            type: "value",
            axisLabel: {
              color: "#fff",
              fontWeight: 400,
              fontSize: 12
            },
            // axisLabel: {
            //   margin: 10,
            //   color: "#fff"
            // },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(79,170,225)",
                type: "dotted",
                opacity: 0.4
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(79,170,225)",
                width: "1"
              }
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: "#000",
              fontWeight: 400,
              fontSize: 12,
              padding: [0, 40, 0, 0]
            }
          }
        ],
        series: [
          {
            name: "今日",
            type: "bar",
            data: todayData,
            barGap: "1%",
            barWidth: 15,
            label: {
              normal: {
                show: true,
                position: "top",
                offset: [7, 0],
                color: this.todayColor,
                fontWeight: 200,
                fontSize: 12,
                align: "right"
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#5B8FF9",
                    "#5B8FF9",
                    "#0FE4F5",
                    "#0FE4F5",
                    "#0FE4F5"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          },
          {
            name: "昨日",
            type: "bar",
            stack: "广告",
            data: yesterday,
            barGap: "1%",
            barWidth: 15,
            label: {
              normal: {
                offset: [-7, 0],
                show: true,
                position: "top",
                color: this.yesterdayColor,
                align: "left",
                fontWeight: 200,
                fontSize: 12
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#2196E0",
                    "#2196E0",
                    "#2196E0",
                    "#73DEB3",
                    "#73DEB3"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      myChart.clear();
      myChart.setOption(option);
    },
    newcharttwo() {
      var myChart = charts.init(document.getElementById("graph2"));
      var todayData = this.timeData.today;
      var yesterday = this.timeData.yesterday;
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "0",
          right: "6%",
          bottom: "3%",
          top: "30%",
          containLabel: true
        },
        xAxis: [
          {
            show: true,
            type: "category",
            data: ["平均耗时", "最大耗时"],
            // splitLine: {
            //   show: false,
            //   lineStyle: {
            //     color: "#fff",
            //     width: 2,
            //     opacity: 0.1
            //   }
            // },
            splitLine: {
              show: false,
              lineStyle: {
                color: "rgb(79,170,225)",
                type: "dotted",
                opacity: 0.4
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(79,170,225)",
                width: "1"
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#000"
            }
          }
        ],
        yAxis: [
          {
            name: "时间(ms)",
            position: "right",
            show: true,
            type: "value",
            axisLabel: {
              color: "#000",
              fontWeight: 400,
              fontSize: 12
            },
            // axisLabel: {
            //   margin: 10,
            //   color: "#fff"
            // },
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgb(79,170,225)",
                width: "1"
              }
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              color: "#000",
              fontWeight: 400,
              fontSize: 12,
              padding: [0, -40, 0, 0]
            }
          }
        ],
        series: [
          {
            name: "今日",
            type: "bar",
            data: todayData,
            barGap: "1%",
            barWidth: 15,
            label: {
              normal: {
                offset: [7, 0],
                align: "right",
                show: true,
                position: "top",
                color: blur,
                fontWeight: 200,
                fontSize: 12
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#0FE4F5",
                    "#0FE4F5",
                    "#0FE4F5",
                    "#0FE4F5",
                    "#0FE4F5"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          },
          {
            name: "昨日",
            type: "bar",
            stack: "广告",
            data: yesterday,
            barGap: "1%",
            barWidth: 15,
            label: {
              normal: {
                offset: [-7, 0],
                align: "left",
                show: true,
                position: "top",
                color: '#000',
                fontWeight: 200,
                fontSize: 12
              }
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#2196E0",
                    "#2196E0",
                    "#2196E0",
                    "#2196E0",
                    "#2196E0"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      myChart.clear();
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
#monitorNum {
  width: 1000px;
  height: 700px;

  flex: 1;
  .amount {
    width: 100%;
    height: 100%;
    float: left;
    position: relative;
    .content {
      width: 60%;
      height: 100%;
      // position: absolute;
      float: left;
      left: 0;
      bottom: 0;
    }
    .content2 {
      width: 40%;
      height: 100%;
      // position: absolute;
      float: left;
    }
  }
}
</style>