<template>
  <div>
    <div class="top_bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>具体信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="">
      <el-row>
        <el-col :span="12" class="text-c">
          <div class="info-box">
            <div class="cavasbox" ref="SUMEchart"></div>
          </div>
        </el-col>

        <el-col :span="12" class="text-c">
          <div class="info-box">
            <div class="cavasbox" ref="ClickEchart"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Chart from "echarts";
export default {
  data() {
    return {
      webBmNum: [],
      webbLookNum: [],
      machineNo: "",
      type: "day",
      //  月报名人数
      SUMoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [
            {
              name: "月报名人数",
              icon: "rect"
            }
          ],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 13,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [
          {
            name: "月报名人数",
            //   type: 'bar',
            type: "line",
            barGap: 0,
            data: [11, 22, 33, 44, 55, 99, 56, 34, 12, 54, 222, 12],
            barWidth: 10,
            itemStyle: {
              color: "#108ff9"
            }
          }
        ]
      },

      //  月浏览人数
      Clickoption: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}月 : {c}"
        },
        legend: {
          data: [
            {
              name: "月浏览人数",
              icon: "rect"
            }
          ],
          top: 1,
          left: 1,
          itemGap: 10,
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            fontSize: 12,
            color: "#323232"
          }
        },
        grid: {
          left: 50,
          right: 10,
          top: 30,
          bottom: 30,
          borderWidth: 1
        },
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          },
          axisLabel: {
            margin: 14,
            textStyle: {
              fontSize: 10,
              color: "#999999"
            }
          }
        },
        series: [
          {
            name: "月浏览人数",
            type: "bar",
            barGap: 0,
            data: [322, 233, 431, 214, 561, 134, 209, 670, 411, 451, 222, 333],
            barWidth: 10,
            itemStyle: {
              color: "#48cefd"
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.getSUM();
    this.getClick();
  },
  methods: {
    // 月报名人数
    getSUM() {
      this.chart = Chart.init(this.$refs.SUMEchart);
      this.chart.setOption(this.SUMoption);
    },
    // 月浏览人数
    getClick() {
      this.chart1 = Chart.init(this.$refs.ClickEchart);
      this.chart1.setOption(this.Clickoption);
    }
  },
  created() {
    this.$axios("/api/activity-api/activity/webInfo")
      .then(response => {
        for (var i = 0; i < response.data.data.length; i++) {
          // console.log(response.data.data[i].baomingNum)
          this.webBmNum.push(response.data.data[i].baomingNum);
          this.webbLookNum.push(response.data.data[i].lookNum);
        }
        // console.log(response.data.data)
        this.chart.setOption({
          series: [
            {
              data: this.webBmNum
            }
          ]
        });
        this.chart1.setOption({
          series: [
            {
              data: this.webbLookNum
            }
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.text-c {
  text-align: center;
}
.info-box {
  background-color: #fff;
  margin-top: 20px;
  border-radius: 5px;
  height: 30vh;
  box-sizing: border-box;
  padding: 10px;
}
.cavasbox {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
</style>
