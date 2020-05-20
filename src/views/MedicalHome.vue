<!-- 医护人员首页 -->
<template>
<div class='medicalhome mr10 ml10'>
    <div class="tagsbar">
        <ul>
            <!-- <li :class="{bgwhite:isActive,bggary:!isActive}" @click="changePage(1)">临床数据中心</li>
            <li :class="{bgwhite:isActive,bggary:!isActive}" @click="changePage(2)">健康档案浏览器</li> -->
            <li v-for="(item,index) of lis" :key="index" 
            @click="changePage(item.path,item.name)" 
            :class="{bgwhite:currentli === item.name,bggary:currentli != item.name}"
            >{{item.name}}</li>
        </ul>
    </div>
    <div class="whitebackground"> <!-- 白色背景div -->
        <div class="garybackground"><!--灰色背景div -->
            <transition name="move" mode="out-in">
                <keep-alive >
                    <router-view></router-view>
                </keep-alive>
            </transition> 
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
            // isActive:true,
            currentli:this.$route.name,
            lis:{
                lis1:{
                    name:'临床数据中心',
                    path:'/medicalhome/medicalhomeclinical'
                },
                lis2:{
                    name:'健康档案浏览器',
                    path:'/medicalhome/medicalhomehealth'
                }
            }
        };
    },
    props: {
    },
    //计算属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {

    },
    //方法集合
    methods: {
        changePage(path,name){
              this.$router.push(path).catch(err => { console.log(err) });
              this.currentli=name;
            // console.log(this.$route.name);
            
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
.medicalhome{
    background: #fff;
    height: 100%;
    flex: 1;
    .tagsbar{
        ul{
            display: flex;
            justify-content: start;
            align-items: center;
            background: rgba(244,246,250,1);
        }
        li{
            box-sizing: border-box;
            width:132px;
            height:48px;
            margin-right: 20px;
            font-size:14px;
            color:rgba(38,38,38,1);
            border-radius:4px 4px 0px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover{
                cursor:pointer   
            }
            transition: background .5s ;
        }
       

    }
    .whitebackground{
        background:#fff;  
        padding: 24px;
    }
    .garybackground{
        background:rgba(246,249,252,1);   
        display: flex;
        justify-content: center;
        align-items: top;
         padding:55px 25px 44px 25px;
    }
}
.bgwhite{
    background: white;
}
.bggary{
    background: #E6E6E6;
}
</style>