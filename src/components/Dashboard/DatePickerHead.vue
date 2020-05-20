<!-- 数据展示栏里的日期选择框 -->
<template>
<div class='DatePickerHead'>
    <span class="demonstration mr14">时间选择：</span>
    <div >
 
     <el-date-picker
      v-model="datevalue"
      align="center"
      type="date"
      size="small"
      placeholder="选择日期"
      value-format="yyyy-MM-dd"
      :picker-options="pickerOptions"
      class="mr14">
    </el-date-picker>
  </div>
  <div>
    <el-button class=" btn" type="primary" @click="search">查询</el-button>
    <!-- <el-button  plain class=" btn" @click="clean">重置</el-button> -->
  </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
//import引入的组件需要注入到对象中才能使用
    components: {

    },
    data() {
    //这里存放数据
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24);
                    picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                    }
                }]
            },
            datevalue:this.$moment().format("YYYY-MM-DD"),

        };
    },
    //计算属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {

    },
    //方法集合
    methods: {
        search(){
            this.$emit('datevalue', this.datevalue)
        },
        // clean(){
        //     this.datevalue=null;
        // }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.$emit('datevalue', this.datevalue);
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.DatePickerHead{
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    color: #262626;
    font-size:14px;
    /deep/.el-date-editor.el-input{
        width: 160px;
    }
    .demonstration{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(38,38,38,1);
    }
    /deep/.el-input__inner{
       font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(38,38,38,1); 
    }
}
.btn{
    width: 80px;
    //font-family:MicrosoftYaHei;
    font-size:14px;
}
</style>