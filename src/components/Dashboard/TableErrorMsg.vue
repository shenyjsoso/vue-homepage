<!-- 管理员页面 异常消息 -->
<template>
<div class='table'>
     <div class="head">
        <span class="tittle">异常消息</span>
        <span class="number" style="color:red">{{errornum}}</span>
    </div>
    <div class="tablecontent">
        <el-table
            :data="rows"
            height=300
            style="width: 100%"
            header-row-class-name="tableHeader"
            :cell-style="tabRowStyle"
            v-loading="loading"
            size=‘medium’
            >

            <el-table-column
            prop="id"
            label="ID"
            >
             <template slot-scope="scope">
        
                <span  style="color: red">{{scope.row.id}}</span>
            </template>
            </el-table-column>

            <el-table-column
            prop="time"
            label="时间"
            >
            <template slot-scope="scope">
            <span  >{{$moment(scope.row.time).format("YYYY-DD-MM HH:mm:ss") }}</span>
            </template>
            </el-table-column>

  

         </el-table>
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
            
        };
    },
    props: {
        rows:Array,
        loading:Boolean,
    },
    //计算属性 类似于data概念
    computed: {
        errornum(){
        return this.rows?this.rows.length:0
        }
    },
    //监控data中的数据变化
    watch: {

    },
    //方法集合
    methods: {
        tabRowStyle({rowIndex}){
            let index = rowIndex + 1;
            if(index %2 == 0){
                return 'background:#F9FCFF'
            }
        }

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {        
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
.table{
    background: #fff;
    // width: 360px;
    height: 369px;
    flex: 1;  
    overflow-y: overlay;
    min-width: 360px;
}
.head{
    height: 50px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    margin:  10px 24px 0 24px;
   
    .tittle{
        font-size: 16px;
        font-family:MicrosoftYaHeiSemibold;
        color:rgb(77, 42, 42);
    }
    .number{
        font-size: 24px;
        font-family:ArialMT;
        color:#FF4D4F;
    }
}
.tablecontent{
    margin: 0 24px;  
}

</style>