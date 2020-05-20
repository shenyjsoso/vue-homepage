<!-- 侧边栏的头像框 -->
<template>
<div class='avatar'>
    <div class="head">
        <!-- <img  :src="avatarUrl" alt=" "> -->
      <el-avatar :size="88" :src="avatarUrl" alt=" " :key="avatarUrl"></el-avatar>
    </div>
    <div class="name">高院长<img src="@/assets/img/sidebar/qiehuan.png" alt=""> </div>
    <div class="title">你好，欢迎登录高数通！</div>
    
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
            avatarUrl: require("@/assets/img/sidebar/moren.png")
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
        console.log(this.avatarUrl);
        
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
.avatar{
    width:216px;
    height:218px;
    background:rgba(248,251,255,1);
    display: flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    box-sizing: border-box;
    .head{
        margin-bottom: 20px;
        img{
            height:88px;
            width: 88px;
            object-fit: cover;
        }
        /deep/.el-avatar{
            background: #f8fbff;
        }
    }
    .name{
        margin-top: 8px;
        color: #262626;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .title{
        font-size: 16px;
        margin-top: 8px;
        color: #262626;
    }
}
</style>