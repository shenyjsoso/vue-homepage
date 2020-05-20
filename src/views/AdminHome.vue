<!-- 管理员数据展示页面 -->
<template>
  <div class="hp-wrapper">
    <div class="datepicker">
      <DatePickerHead @datevalue="getdate"></DatePickerHead>
    </div>
    <div class="content">
      <div class="content-row">
        <data-admin
          :loading="oiloading"
          tittle="EMPI"
          :data="[{num:empiModel.importNum,name:'导入数据'},{num:empiModel.mergeNum,name:'合并数据'}]"
        ></data-admin>
        <data-admin
          :loading="oiloading"
          tittle="MDM"
          :data="[{num:etlModel.failJobNum,name:'已发布'},{num:etlModel.jobNum,name:'待审核'},{num:etlModel.successJobNum,name:'待发布'}]"
        ></data-admin>
        <data-admin
          :loading="oiloading"
          tittle="ETL"
          :data="[{num:mdmModel.publishedNum,name:'总作业数'},{num:mdmModel.tobeCheckNum,name:'成功次数'},{num:mdmModel.tobePublicNum,name:'失败次数'}]"
        ></data-admin>
      </div>

      <div class="content-row">
        <hy-serverstate :rows="findServerStateRowsAry" :loading="ssloading"></hy-serverstate>
        <hy-errormsg :rows="findErrorMsgRowsAry" :loading="emloading"></hy-errormsg>
      </div>

      <div class="content-row">
        <hy-bar :loading="mtloading" :rows="barRows" tittle="消息总量"></hy-bar>
        <hy-histogram :loading="mmloading" :rows="histogramRows"></hy-histogram>
      </div>
      <!-- <hy-monitornum></hy-monitornum> -->
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import DatePickerHead from "@/components/Dashboard/DatePickerHead.vue";
import DataAdmin from "@/components/Dashboard/DataAdmin.vue";
import HyHistogram from "@/components/Dashboard/Histogram.vue";
// import HyMonitornum from '@/components/Dashboard/monitorNum.vue'

import HyBar from "@/components/Dashboard/Bar.vue";
import HyServerstate from "@/components/Dashboard/TableServerState.vue";
import HyErrormsg from "@/components/Dashboard/TableErrorMsg.vue";
export default {
  name: "dashboard",
  //import引入的组件需要注入到对象中才能使用
  components: {
    DatePickerHead,
    DataAdmin,
    HyHistogram,
    // HyMonitornum,
    HyBar,
    HyServerstate,
    HyErrormsg
  },
  data() {
    //这里存放数据
    return {
      findServerStateRowsAry: [], //平台服务器状态
      findErrorMsgRowsAry: [], //异常消息
      barRows: [], //消息总量 数据
      histogramRows: [], // 监控消息总量
      searchdate: "", //查询时间
      ssloading: false, //服务器状态 加载样式
      emloading: false, //异常消息 加载样式
      mmloading: false, //监控消息总量 加载样式
      mtloading: false, //消息总量 加载样式
      oiloading: false, //EMPI、MDM、ETL信息 加载样式
      empiModel: {
        importNum: '-',
        mergeNum: '-'
      },
      etlModel: {
        failJobNum: '-',
        jobNum: '-',
        successJobNum: '-'
      },
      mdmModel: {
        publishedNum: '-',
        tobeCheckNum: '-',
        tobePublicNum: '-'
      }
    };
  },
  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //时间查询按钮事件 页面create立即触发
    getdate(datevalue) {
      console.log("点击了" + datevalue);
      if (datevalue == null) {
        this.$message({
          message: "请选择时间",
          type: "warning"
        });
        return;
      }
      this.searchdate = datevalue;
        this.searchinfo(datevalue);
    },
    searchinfo(date) {
      this.ssloading = true;
      this.emloading = true;
      this.mmloading = true;
      this.mtloading = true;
      this.oiloading = true;
      let param = {
        startDate: date ? date : undefined
      };
      //平台服务器状态
      this.$ajax.adminHome.findServerState().then(
        res => {
          if (res?.data?.code == 200) {
            let data = res.data.result;
            this.findServerStateRowsAry = data.rows;
          }
          this.ssloading = false;
        },
        err => {
          this.ssloading = false;
          this.$message.error(err || "请求失败");
        }
      );
      //异常消息
      this.$ajax.adminHome.findErrorMsg(param).then(
        res => {
          if (res?.data?.code == 200) {
            let data = res.data.result;
            this.findErrorMsgRowsAry = data.rows;
            this.emloading = false;
          }
        },
        err => {
          this.emloading = false;
          this.$message.error(err || "请求失败");
        }
      );

      //监控消息总量
      this.$ajax.adminHome.findMonitorMsgAmount(param).then(
        res => {
          if (res?.data?.code == 200) {
            this.mmloading = false;
            this.histogramRows = res.data.result;
        
          }
        },
        err => {
          this.mmloading = false;
          this.$message.error(err || "请求失败");
        }
      );
      //消息总量
      this.$ajax.adminHome.findMsgTotal(param).then(
        res => {
          if (res?.data?.code == 200) {
            this.mtloading = false;
            this.barRows = res.data.result;
          }
        },
        err => {
          this.mtloading = false;
          this.$message.error(err || "请求失败");
        }
      );
      //EMPI、MDM、ETL信息
      this.$ajax.adminHome.findOtherInfo(param).then(
        res => {
          if (res?.data?.code == 200) {
            this.oiloading = false;
            let data = res.data.result;
            this.empiModel = data.empiModel;
            this.etlModel = data.etlModel;
            this.mdmModel = data.mdmModel;
          }
        },
        err => {
          this.oiloading = false;
          this.$message.error(err || "请求失败");
        }
      );
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    //   this.searchinfo(this.searchdate);
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    //  this.$nextTick(()=>{
    //     this.ssloading=true;
    //     this.emloading=true;
    //     this.searchinfo(this.searchdate)
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
</style>
