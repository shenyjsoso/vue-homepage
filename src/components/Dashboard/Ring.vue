<!-- 环图数据展示块 -->
<template>
  <div class="ring">
    <div class="head">
      <span class="tittle">{{tittle}}</span>
      <span class="money">{{money}}<span style="font-size:20px;">万元</span> </span>
    </div>
    <el-divider class="divider"></el-divider>
    <ve-ring :data="chartData" :settings="chartSettings" :extend="chartExtend" v-loading="loading"></ve-ring>
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
      radius: [65, 100],
      offsetY: 120,
      //  center: ['50%',20],
      label: {
        //show: false,
        // position: 'bottom',
        formatter: "{b}\n{d}%"
      }
    }),
      (this.chartExtend = {
        series: {},
        tooltip: {},
        grid: {},
        legend: {
          icon: "circle",
          y: 260
        }
      });

    return {
      chartData: {
        columns: ["类型", "收入"],
        rows: [
        //   { 类型: "挂号收入", 收入: 1393 },
        //   { 类型: "医疗收入", 收入: 3530 },
        //   { 类型: "药品收入", 收入: 2923 }
        ]
      },
      money:'', //金额
    };
  },
  props: {
    tittle: String,
    rows: Object,
    loading: Boolean
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    rows: function() {
        this.chartData.rows=[];
        this.money='';
      if (this.tittle == "门诊收入"&&this.rows!=null) {
          this.money=this.rows.mzFee||0;
          this.chartData.rows.push({类型:'药品收入',收入:this.rows.mzYpFee||0});
          this.chartData.rows.push({类型:'医疗收入',收入:this.rows.mzYlFee||0});
      } else if (this.tittle == "住院收入"&&this.rows!=null) {
          this.money=this.rows.zyFee||0;
          this.chartData.rows.push({类型:'药品收入',收入:this.rows.zyYpFee||0});
          this.chartData.rows.push({类型:'医疗收入',收入:this.rows.zyYlFee||0});
      } else if (this.tittle == "全院收入"&&this.rows!=null) {
         this.money=this.rows.allFee||0;
          this.chartData.rows.push({类型:'药品收入',收入:this.rows.allYpFee||0});
          this.chartData.rows.push({类型:'医疗收入',收入:this.rows.allYlFee||0});
      }
    }
  },
  //方法集合
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
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
.ring {
  background: #fff;
  // width: 360px;
  min-width: 350px;
  flex: 1;
  height: 369px;
  position: relative;
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
  .divider{
    width: auto;
    margin:0 24px 10px 24px ;
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
  .money {
    font-size: 24px;
    font-family: ArialMT;
    color: rgba(38, 38, 38, 1);
  }
}


</style>