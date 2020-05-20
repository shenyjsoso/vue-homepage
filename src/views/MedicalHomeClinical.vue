<!-- 临床数据中心 -->
<template>
<div class='medicalhomeclinical'>
     
            <el-radio-group v-model="ruleType" class="rg"   size=”medium“>
                    <el-radio-button label="1" >信息查询</el-radio-button>
                    <el-radio-button label="2">时间查询</el-radio-button>
            </el-radio-group>
       
            <transition name="move">
                <div v-show="ruleType==1">
                    <div class="inputcontent">
                        <span class="searchItem">
                        患者姓名：
                        <el-input clearable  placeholder="" style="width:165px" v-model="search.name">
                        </el-input>
                        </span>
                            <span class="searchItem">
                            身份证号：
                            <el-input  clearable placeholder="" style="width:165px" v-model="search.name">
                            </el-input>
                        </span>
                        <span class="searchItem">
                            医保卡号：
                            <el-input  clearable placeholder="" style="width:165px" v-model="search.name">
                            </el-input>
                        </span>
                            <span class="searchItem">
                            主索引号：
                            <el-input  clearable placeholder="" style="width:165px" v-model="search.name" >
                            </el-input>
                        </span>
                            <span class="searchItem">
                            门诊急号：
                            <el-input  clearable placeholder="" style="width:165px" v-model="search.name">
                            </el-input>
                        </span>
                            <span class="searchItem">
                            住院号：
                            <el-input  clearable placeholder="" style="width:165px" v-model="search.name">
                            </el-input>
                        </span>
                            <span class="searchItem">
                            就诊卡：
                            <el-input  clearable placeholder="" style="width:165px" v-model="search.sex" >
                            </el-input>
                        </span>
                    </div>
                    <div class="dh-btn">
                        <el-button type="primary" size=”medium“ style="width:300px;" @click="searchbtn()">查询</el-button>
                    </div>
                </div>            
            </transition>
            <transition>
             <div v-show="ruleType==2" >
                 <div class="shijian">
                    <span class="mr14">时间范围: </span>
                    <el-date-picker
                    v-model="valuedate"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    value-format="yyyy/MM/dd"
                    format="yyyy/MM/dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    size:large
                    class="mr14"
                    >
                    </el-date-picker>
                </div>
               
                <div class="ss-btn">
                        <el-button type="primary"  size=”medium“ style="width:300px;">搜索</el-button>
                    </div>
            </div>
            </transition>
  

                    
                
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
            ruleType: '1',
            search:{
                name:'',
                sex:''
            },
             pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            valuedate:[this.$moment().subtract(6, 'days').format('YYYY/MM/DD'),this.$moment().format("YYYY/MM/DD")],
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
        //查询按钮事件
            searchbtn(){

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
  .medicalhomeclinical{
        width:100%;
        height:100%;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 12px 0px rgba(200,204,207,0.5);
        border-radius:8px;
        font-family:MicrosoftYaHei;
        .rg{
            margin: 50px;
            /deep/span{
            padding-left: 100px ;
            padding-right: 100px ;;
            }
        }
        .inputcontent{
            margin: 0 69px;
            display: flex;
            justify-content: start;
            align-items: center;
            flex-wrap: wrap;
            .searchItem{
                margin: 18px;
                display: inline-block;
            }
        }
        .dh-btn{
            margin: 30px 0  40px 0 ;
        }
        .shijian{
            margin: 50px 69px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
        .ss-btn{
            margin: 80px 0;
        }
    }
</style>