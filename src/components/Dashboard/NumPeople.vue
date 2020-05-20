<!-- 显示人数的块 -->
<template>
<div class='NumPeople' v-loading="loading">
    <span class="tittle">
        {{tittle}}
    </span>
    <span class="num">
        {{formatpeoplenum}}
    </span>
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
            // tittle:this.tittle,
            // num:this.num

        };
    },
    props:{
        tittle:String,
        peoplenum:String,
        loading:Boolean
    },
    //计算属性 类似于data概念
    computed: {
        //加千分号
        formatpeoplenum(){
            return (this.peoplenum.toString().indexOf ('.') !== -1) ? this.peoplenum.toLocaleString() : this.peoplenum.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        }
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
.NumPeople{
    // width:272px;
    min-width: 150px;
    flex: 1;
    height:126px;
    background:rgba(255,255,255,1);
    color: #262626;
    text-align: left;
    position: relative;
}
.tittle{
    font-size:16px;
    font-family:MicrosoftYaHei;
    position: absolute;
    top: 22px;
    left: 24px;
    
}
.num{
    font-size:34px;
    font-family:ArialMT;
    position: absolute;
    bottom: 24px;
    left: 24px;
}

</style>