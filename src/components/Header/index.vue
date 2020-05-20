<!-- 头部 -->
<template>
<div class='header'>


    <div class="header-left">
    <img class="headerImg" src="@/assets/img/header/gaoshutonglogo.png" alt="">
    </div>
    <nav-bar></nav-bar>
    <div class="header-right">
     
        <section @click="logout" class="guide_item">
          <img class="infoImg" src="@/assets/img/header/tuichu.png" />
            <span >安全退出</span>
        </section>
        <section class="guide_item">
          <img class="infoImg" src="@/assets/img/header/xiaoxi.png" />
             <span>消息</span>
        </section>
         <section class="guide_item">
             <img class="adminImg" src="@/assets/img/header/person.png" />
            <span >admin</span>
        </section>
        <section class="search">
            <input type="text" class="search_input" @keyup.enter="logout"/>
            <input @click="logout" type="button" class="search_btn"/>
        </section> 
               
    </div>
</div>
</template>

<script>
 import NavBar from "@/components/Header/components/NavBar.vue"
export default {
    name: 'HyHeader',
//import引入的组件需要注入到对象中才能使用
   
    components: {
        NavBar,
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
    logout(){
        this.$message.success('退出');
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
.header{
    background: #2D80D2;
    height: 60px;
    overflow: hidden;
    .header-left{
        float: left;
        width: 205px;
        height: 60px;
         .headerImg{
            margin-top: 15px;
            display: block;
            width: 140px;
            height: 28px;
    }
    }
    .header-right {
        float: right;
        font-size: 12px;
        color: #FFFFFF;
        margin-right: 16px;
        .search{
            float:right;
            line-height: 60px;
            margin-left: 10px;
            display: block;
            border: 1px #fff solid;
            border-radius: 15px;
            width: 178px;
            height: 30px;
            background: #2D80D2;
            margin: 15px 0;
            overflow: hidden;
        }
        .search_input{
                width: 135px;
                float: left;
                text-indent: 1em;
                color: #fff;
                height: 30px;
                background: transparent;
                outline: none;
                margin-left: 5px;
            }
        .search_btn{
                width: 30px;
                height: 30px;
                float: right;
                margin-right: 5px;
                outline: none;
                border: 1px solid transparent;
                vertical-align: center;  
                background: url(../../assets/img/header/search.png)  center no-repeat;;
                &:hover{
                    cursor:pointer;
                }
            }
        .guide_item{
            float: right;
            text-align: center;
            line-height: 60px;
            margin-left: 10px;
            &:hover{
                cursor:pointer
            } 
        }
          .infoImg {
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-right: 4px;
          }
          .adminImg{
            width: 30px;
            height: 30px;
            vertical-align: middle;
            margin-right: 4px;
            }
    }   
}
</style>