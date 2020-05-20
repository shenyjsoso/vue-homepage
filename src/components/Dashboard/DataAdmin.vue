<!-- 管理员数据展示块 -->
<template>
<div class='dataadmin' v-loading="loading">
    <div class="tittle">{{tittle}}</div>
    <div class="content">
        <div v-for="item in data" class="content-item" :key="item.id">
            <div class="number" :class="{redfont:item.name=='失败次数'}">{{item.num}}</div>
            <div class="name" >{{item.name}}</div>
        </div>


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
        data:Array,
        tittle:String,
        loading:Boolean
    },
    //计算属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {

    },
    //方法集合
    methods: {

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
.dataadmin{
    // width:370px;
     min-width:200px ;
    flex: 1;
    height:151px;
    background:rgba(255,255,255,1);
    position: relative;
    padding: 24px;
    .content{
        // margin-top:24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .content-item{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin:5px 0;
        }
    }
}
.number{
    font-size:30px;
    font-family:ArialMT;
    color:rgba(38,38,38,1);
}
.name{
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(89,89,89,1);
}
.tittle{
    font-size:18px;
    font-family:MicrosoftYaHeiSemibold;
    color:rgba(38,38,38,1);
    text-align: left;

}
.redfont{
    color: #FF4D4F;
}
</style>