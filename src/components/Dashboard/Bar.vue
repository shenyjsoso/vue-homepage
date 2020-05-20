<!-- 条形图 -->
<template>
  <div class="bar">
    <div class="head">
      <span class="tittle">{{tittle}}</span>
      <span class="number">{{allamount}}</span>
    </div>
    <ve-bar :data="chartData" :settings="chartSettings" :extend="chartExtend" v-loading="loading"></ve-bar>
    <!-- <span class="empty" v-if="chartData.rows.length==0">暂无数据</span> -->
    <img class="empty" v-if="chartData.rows.length==0" src="@/assets/img/wushuju.png" alt="">
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    (this.chartSettings = {
      metrics: ["amount"],
      dataOrder: {
        label: "amount",
        order: "desc"
      },
      itemStyle: {
        color: "#5B8FF9",
        barBorderRadius:[2,2,2,2]
      },
      label: {
        show: true,
        position: "right",
        formatter: "{c}",
        color: "#595959"
      }
    }),
      (this.chartExtend = {
        series: {
          showBackground: true,
          backgroundStyle: { color: "#F1F4F6" },
          barWidth: 16, //柱宽度    
        },
        grid: {
          x:20,  //左留白
          y: 0, //上留白
          x2: 30 //右留白
          // y2:100
        },
        legend: {
          show: false
        },
        tooltip: {
          show: false
          // axisPointer:{
          //     type:false
          // }
          // formatter: '{b0}: {c0}<br />{b1}: {c1}'
        },
        xAxis: {
          splitLine: {
            show: false
          }
        }
      });
    return {
      chartData: {
        columns: ["name", "amount"],
        rows: [
          // { 'name': '全区卫生机构', 'amount': 33 },
          // { 'name': '消息适配器接口', 'amount': 22},
        ]
      },
      allamount:null,
      chartData1: {}
    };
  },
  props: {
    loading: Boolean,
    rows: Array,
    tittle: String
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    rows: function(newVal) {
      this.chartData.rows = []; //清空数据
      if (this.tittle == "消息总量") {
        this.allamount = 0;//消息总量
        newVal.forEach(e => {
          let row = { name: e?.name, amount: e?.amount };
          this.allamount += e.amount;
          this.chartData.rows.push(row);
        });
      } else if (this.tittle == "手术统计TOP10") {
        
        newVal.forEach(e => {
          let row = { name: e?.operationName, amount: e?.rc };
       
          this.chartData.rows.push(row);
        });
      } else if (this.tittle == "疾病统计TOP10") {
        
        newVal.forEach(e => {
          let row = { name: e?.bzName, amount: e?.rc };
         
          this.chartData.rows.push(row);
        });
      }
    }
  },
  //方法集合
  methods: {
    // setdata(){
    //     this.rows.forEach(e => {
    //         let row ={'name':e?.name,'消息量':e?.amount}
    //         this.allamount+=e.amount
    //         this.chartData.rows.push(row)
    //         console.log(row);
    //     });
    // }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // console.log(this.rows);
    //  this.$nextTick(()=>{
    //  this.setdata();
    //  })
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.bar {
  // width:100%;
  flex: 1;
  min-width: 360px;
  // height:364px;
  position: relative;
  background: rgba(255, 255, 255, 1);
  .empty {
    color: #909399;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
     width: 114px;
    height: 140px;
  }
}
.head {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 24px;

  .tittle {
    font-size: 16px;
    font-family: MicrosoftYaHeiSemibold;
    color: rgba(38, 38, 38, 1);
  }
  .number {
    font-size: 28px;
    font-family: ArialMT;
    color: rgba(38, 38, 38, 1);
  }
}
</style>