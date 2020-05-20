<!--  -->
<template>
<div class='siderbar '>
   
        <Avatar></Avatar>
        <side-draggable></side-draggable>
    
 
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import Avatar from "@/components/Sidebar/components/Avatar.vue"
import SideDraggable from "@/components/Sidebar/components/SideDraggable.vue"
export default {
//import引入的组件需要注入到对象中才能使用
    components: {
    Avatar,
    SideDraggable
    },
    data() {
    //这里存放数据
        return {

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
.siderbar{
    height: 100%;
    background:rgba(255,255,255,1);
    //display: block;
    position: absolute;
    overflow-y: scroll; 
    padding: 12px;
    font-family:MicrosoftYaHei;
}
.siderbar::-webkit-scrollbar {
    width: 0;
}

</style>