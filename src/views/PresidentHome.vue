<!-- 院长数据展示页面 -->
<template>
  <div class="hp-wrapper">
    <div class="datepicker">
      <DatePickerHead @datevalue="getdate"></DatePickerHead>
    </div>
    <div class="content">
      <div class="content-row">
        <num-people tittle="门诊人次" :peoplenum="hospitalinfo.mzrc" :loading="bhiloading"></num-people>
        <num-people tittle="在院人次" :peoplenum="hospitalinfo.inHospitalRc" :loading="bhiloading"></num-people>
        <num-people tittle="出院人次" :peoplenum="hospitalinfo.cyrs" :loading="bhiloading"></num-people>
        <num-people tittle="手术人次" :peoplenum="hospitalinfo.ssSl" :loading="bhiloading"></num-people>
      </div>
      <div class="content-row">
        <hy-ring tittle="门诊收入" :rows="hospitalfee" :loading="hfloading"></hy-ring>
        <hy-ring tittle="住院收入" :rows="hospitalfee" :loading="hfloading"></hy-ring>
        <hy-ring tittle="全院收入" :rows="hospitalfee" :loading="hfloading"></hy-ring>
      </div>
      <div class="content-row">
        <hy-bar :loading="bfloading" :rows="bfrows" tittle="疾病统计TOP10"></hy-bar>
        <hy-bar :loading="otloading" :rows="otrows" tittle="手术统计TOP10"></hy-bar>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import DatePickerHead from "@/components/Dashboard/DatePickerHead.vue";
import NumPeople from "@/components/Dashboard/NumPeople.vue";

import HyRing from "@/components/Dashboard/Ring.vue";

import HyBar from "@/components/Dashboard/Bar.vue";
export default {
  name: "dashboard",
  //import引入的组件需要注入到对象中才能使用
  components: {
    DatePickerHead,
    NumPeople,
    HyRing,
    HyBar
  },
  data() {
    //这里存放数据
    return {
      searchdate: "", //查询时间
      hospitalinfo: {
        mzrc: '-',
        inHospitalRc: '-',
        cyrs: '-',
        ssSl: '-'
      }, //医院顶部信息
      hospitalfee: {}, //医院收入
      bfrows: [], //疾病统计top10数据
      otrows: [], //手术统计top10数据
      bhiloading: false, //医院顶部信息 加载样式
      hfloading: false, // 医院收入 加载样式
      bfloading: false, //疾病统计top10 加载样式
      otloading: false //手术统计top10 加载样式
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
      this.bhiloading = true;
      this.hfloading = true;
      this.bfloading = true;
      this.otloading = true;
      console.log(date);

      let param = {
        date: date ? date : undefined
        // date: "2019-10-30"
      };

      //医院顶部信息
      this.$ajax.presidentHome.getBasicHospitalInfo(param).then(
        res => {
          if (res?.data?.code == 200) {
            this.bhiloading = false;
            let data = res.data.result;
            console.log(res);
            this.hospitalinfo.mzrc = data?.mzrc.toString()||'-' ;
            this.hospitalinfo.inHospitalRc = data?.inHospitalRc.toString()||'-' ;
            this.hospitalinfo.cyrs = data?.cyrs.toString()||'-' ;
            this.hospitalinfo.ssSl = data?.ssSl.toString()||'-';
          }
        },
        err => {
          this.bhiloading = false;
          this.$message.error(err || "请求失败");
        }
      );
      //医院收入
      this.$ajax.presidentHome.getHospitalIncome(param).then(
        res => {
          if (res?.data?.code == 200) {
            this.hfloading = false;
            let data = res.data.result;
            this.hospitalfee = data;
            console.log("医院收入");
          }
          
        },
        err => {
          this.hfloading = false;
          this.$message.error(err || "请求失败");
        }
      );
      //疾病统计TOP10
      this.$ajax.presidentHome.getAllBzFx(param).then(
        res => {
          if (res?.data?.code == 200) {
            this.bfloading = false;
            let data = res.data.result;
            this.bfrows = data;

            
          }
        },
        err => {
          this.bfloading = false;
          this.$message.error(err || "请求失败");
        }
      );
      //手术统计TOP10
      this.$ajax.presidentHome.getOperationTop(param).then(
        res => {
          if (res?.data?.code == 200) {
            this.otloading = false;
            let data = res.data.result;
            this.otrows = data;
            // console.log(data);
          }
        },
        err => {
          this.otloading = false;
          this.$message.error(err || "请求失败");
        }
      );
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.getJzRcFx();
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
</style>
