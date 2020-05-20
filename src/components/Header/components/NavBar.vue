<!-- 导航 -->
<template>
    <div class="navbar">
        <el-menu
            class="navbar-el-menu"
            :default-active="onRoutes"
            background-color="#2D80D2"
            text-color="#BCD9F5"
            active-text-color="#FFFFFF"
            unique-opened
            mode="horizontal"
        >
            <template v-for="item in items" >
                <template v-if="item.subs">
                    <el-submenu 
                    :index="item.index" 
                    :key="item.index " 
                    :hide-timeout="180" 
                    :show-timeout="180"
                    >
                        <template slot="title">
                            <!-- <i :class="item.icon"></i> -->
                            <span slot="title">{{ item.title }}</span>
                        </template>
                         
                        <template v-for="subItem in item.subs">
                            <!-- 有三级子菜单 -->
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                                :popper-append-to-body="true"
                            >
                          
                                <i :class="subItem.icon"></i>
                                <template slot="title">{{ subItem.title }}</template>
                               
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <!-- 无三级子菜单 -->
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                                :disabled="!subItem.whref"
                                @click="jumpTo(subItem.whref)"
                            >
                 
                             <i :class="subItem.icon"></i>
                            <template slot="title">  
                                {{ subItem.title }}
                            <!-- <a style="color:#595959" :href="subItem.whref" target="_blank">{{ subItem.title }}</a> -->
                            </template>
                            <!-- {{ subItem.title }} -->
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <!-- <i :class="item.icon"></i> -->
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
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
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: '',
                    title: '首页'
                },
                {
                    icon: 'el-icon-rank',
                    index: '2',
                    title: '平台相关应用',
                    subs: [
                        {
                            icon: 'el-icon-goods',
                            index: '11',
                            title: '主数据管理系统',
                            href:"http://192.168.2.223:8094/home",
                            whref:"http://121.36.137.188:8086/home"
                        },
                        {   icon: 'el-icon-goods',
                            index: '12',
                            title: '主索引管理系统',
                            href:"http://192.168.2.223:9091",
                            whref:"http://121.36.137.188:8087"
                        },
                        {
                            icon: 'el-icon-goods',
                            index: '13',
                            title: '值域对照系统'
                        },
                        {
                            icon: 'el-icon-goods',
                            index: '14',
                            title: '消息适配',
                            href:"http://192.168.2.164:8041/mat1/"
                        },
                        {
                            icon: 'el-icon-goods',
                            index: '15',
                            title: 'ESB企业服务总线'
                           
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-calendar',
                    index: '3',
                    title: '平台基础组件',
                    subs: [
                        {
                            icon: 'el-icon-rank',
                            index: '31',
                            title: '用户管理',
                            href:"http://192.168.2.223:8092/home",
                            whref:"http://121.36.137.188:8082/home"
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '32',
                            title: '统一接口管理',
                            href:"http://192.168.2.179:8082/home",
                            whref:"http://121.36.137.188:8083/home"
                            
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '33',
                            title: '日志管理'
                        }
                    ]
                },
          
             
                {
                    icon: 'el-icon-rank',
                    index: '4',
                    title: '大数据融合平台',
                    subs: [
                        {
                            icon: 'el-icon-rank',
                            index: '41',
                            title: 'ETL管理',
                            href:"http://192.168.2.223:8093/home/holographicView",
                            whref:"http://121.36.137.188:8080/home/holographicView"
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '42',
                            title: '大数据平台监控系统'
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '43',
                            title: '数据同步平台'
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '44',
                            title: '数据质量管理',
                            href:"http://192.168.2.223:8095/home",
                            whref:"http://121.36.137.188:8088/home"
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '45',
                            title: 'CDR4.0',
                            href:"http://192.168.2.204:8021/CDR4/Interface.jsp",
                            whref:"http://139.9.122.192:8082/CDR4/"
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-warn',
                    index: '5',
                    title: '区域协同应用',
                    subs: [
                        {
                            icon: 'el-icon-rank',
                            index: '51',
                            title: '全生命周期健康档案'
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '52',
                            title: '互联互通评级'
                        },
                        {
                            icon: 'el-icon-rank',
                            index: '53',
                            title: '电子病历评级'
                        }
                    ]
                },
                {
                    icon: 'el-icon-lx-redpacket_fill',
                    index: '6',
                    title: '设置'
                }
            ]        
        };
    },
    //计算属性 类似于data概念
    computed: {
        onRoutes() {
            //return this.$route.path.replace('/', '');
            return "";
        }
    },
    //监控data中的数据变化
    watch: {

    },
    //方法集合
    methods: {
        jumpTo(e)
        {
            window.open(e);  
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
<style lang='less' >
//@import url(); 引入公共css类
@MainColor: #2D80D2; //主题蓝色
@ActivateColor:#3395F6;//激活蓝
.navbar {
    position: absolute;
    left: 204px;
    top:0px;
    height: 58px;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden; 
    font-family:MicrosoftYaHeiSemibold; 
}
//当前选中栏背景色
.el-menu-item.is-active {
   background-color: @ActivateColor!important;
}
//下拉箭头图标
.el-submenu__title i {
    color: #fff;
}
// .el-submenu__title:hover {
//     //background-color: #3395F6!important;
//     color:#fff !important;
//     i{
//         color:@MainColor !important ;
//     }
// }

.el-menu-item:hover {
    color:#fff !important;
    
        color:@MainColor !important;
    
    i{
        color:@MainColor  ;
    }
}
//设置menu子菜单的样式
.el-menu--horizontal>ul{
    background-color: #fff !important;
    li{
       background-color: #fff !important; 
       color:#595959 !important;
    }
    .el-menu-item.is-active{
    background-color: #fff!important;
    
        color:@MainColor !important;
    
    i{
        color:@MainColor  ;
    }
    }
}
</style>