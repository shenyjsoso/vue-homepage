<!-- 柱状图 -->
<template>
<div class='histogram'>
     <div class="head">
        <span class="tittle">监控消息总量</span>
        <div class="tag">
           <div>
               <div style="width:8px;height:8px;background:#73DEB3"></div>
               <span>昨日</span> 
           </div>
           <div >
               <div style="width:8px;height:8px;background:#73A0FA"></div>
               <span>当日</span> 
           </div>
        </div>
    </div>
    <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" v-loading="loading"></ve-histogram>
    <!-- <span class="empty" v-if="chartData.rows.length==0">暂无数据</span> -->
    <img class="empty" v-if="chartData.rows.length==0" src="@/assets/img/wushuju.png" alt="">
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
        this.chartSettings = {
            // itemStyle:{
            //     color:'#5B8FF9', 
            // },
            axisSite: { right: ['昨日时间','当日时间'] },
            // yAxisType: ['normal', 'normal'],
            yAxisName: ['数量', '时间（s）'],
            label:{
                show:true,
                position:'top',
                formatter: '{c}',
                color:'#595959'
            }
        }
        this.chartExtend= {
                series: {
                    barWidth: 18, //这就是宽度
                    barGap:'5%',//柱图间距
                },
                
                color: ["#73DEB3", "#5B8FF9", "#73DEB3", "#5B8FF9"],
                grid: {
                    // x:20,  //左留白
                    y:30,   //上留白
                    // x2:20,  //右留白
                    // y2:30  
                    // left:'10%'
                    // containLabel:false,
                    top:45,
                    left:25,
                    right:25
                },
                legend: {
                    show:false
                },
                tooltip:{
                     show:false,
                    // axisPointer:{
                    //     type:false
                    // }
                    // formatter: '{b0}: {c0}<br />{b1}: {c1}'
               
                },
                
                xAxis:{
                    splitLine:{
                        show:false
                    },
                    axisLabel:{
                        interval: 0,
                        textStyle:{
                            fontSize: 12,
                            fontFamily:'MicrosoftYaHei',
                            color:'rgba(128,128,128,1)',
                        },
                        // formatter: function(value){
                        //     let result = ""; //拼接加\n返回的类目项
                        //     let maxLength = 4; //每项显示文字个数
                        //     let valLength = value.length; //X轴类目项的文字个数
                        //     let rowNumber = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                        //     if (rowNumber > 1){
                        //         //如果文字大于3,
                        //         for (let i = 0; i < rowNumber; i++) {
                        //             let temp = ""; //每次截取的字符串
                        //             let start = i * maxLength; //开始截取的位置
                        //             let end = start + maxLength; //结束截取的位置
                        //             temp = value.substring(start, end) + "\n";
                        //             result += temp; //拼接生成最终的字符串
                        //         }
                        //         return result;
                        //     }
                        //     else {
                        //     return value;
                        //     }
                        // }
                    }
                    
                },
                yAxis:{
                    axisLabel:{
                        textStyle:{
                            fontSize:12,
                            fontFamily:'ArialMT',
                            color:'rgba(128,128,128,1)',
                        },
                    },
                    nameTextStyle:{
                            fontSize: 12,
                            fontFamily:'MicrosoftYaHei',
                            color:'rgba(128,128,128,1)',
                            lineHeight:40
                    }
                    
                },
            //   'yAxis.1.axisLabel.formatter': "{value}s",
            }
        return {
        chartData: {
          columns: ['name','昨日消息量','当日消息量','昨日时间','当日时间'],
          rows: [
            // { 'name': '监控消息总量', '昨日消息量': 0,'当日消息量':0},
            // { 'name': 'MQ消息量', '昨日消息量': 0, '当日消息量':0},
            // { 'name': 'WS消息量', '昨日消息量': 0, '当日消息量':0},
            // { 'name': '异常消息量', '昨日消息量': 0,'当日消息量':0},
            // { 'name': '平均耗时',   '昨日时间': 0,'当日时间':0},
            // { 'name': '最大耗时',   '昨日时间': 0, '当日时间':0}
          ]
        }
        };
    },
    props: {
        loading:Boolean,
        rows:Array
    },
    //计算属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {
            rows: function(newVal){        
                this.chartData.rows = []; //清空数据
                this.chartData.rows.push({'name':'监控消息总量','昨日消息量':newVal[1]["amount"],'当日消息量':newVal[0]["amount"]})
                this.chartData.rows.push({'name':'MQ消息量','昨日消息量':newVal[3]["amount"],'当日消息量':newVal[2]["amount"]});
                this.chartData.rows.push({'name':'WS消息量','昨日消息量':newVal[5]["amount"],'当日消息量':newVal[4]["amount"]});
                this.chartData.rows.push({'name':'异常消息量','昨日消息量':newVal[7]["amount"],'当日消息量':newVal[6]["amount"]});
                this.chartData.rows.push({'name':'平均耗时','昨日时间':newVal[9]["amount"],'当日时间':newVal[8]["amount"]});
                this.chartData.rows.push({'name':'最大耗时','昨日时间':newVal[11]["amount"],'当日时间':newVal[10]["amount"]});
                // this.chartData.rows[0]['当日消息量']=newVal[0]["amount"];
                // this.chartData.rows[0]['昨日消息量']=newVal[1]["amount"];
                // this.chartData.rows[1]['当日消息量']=newVal[2]["amount"];
                // this.chartData.rows[1]['昨日消息量']=newVal[3]["amount"];
                // this.chartData.rows[2]['当日消息量']=newVal[4]["amount"];
                // this.chartData.rows[2]['昨日消息量']=newVal[5]["amount"];
                // this.chartData.rows[3]['当日消息量']=newVal[6]["amount"];
                // this.chartData.rows[3]['昨日消息量']=newVal[7]["amount"];
                // this.chartData.rows[4]['当日时间']=newVal[8]["amount"];
                // this.chartData.rows[4]['昨日时间']=newVal[9]["amount"];
                // this.chartData.rows[5]['当日时间']=newVal[10]["amount"];
                // this.chartData.rows[5]['昨日时间']=newVal[11]["amount"];

          
        }
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
.histogram{
    flex: 1;
    // width:100%;
    // height:364px;
    min-width: 360px;
    background:rgba(255,255,255,1);
    position: relative;
     .empty {
    color: #909399;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 114px;
    height: 140px;
  }
}
.head{
    height: 60px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    margin: 0 24px;
   
    .tittle{
        font-size: 16px;
        font-family:MicrosoftYaHeiSemibold;
        color:rgba(38,38,38,1);
    }
    .tag{
        display: flex;
        justify-content:center;
        align-items: center;
        &>div{
               display: flex;
                justify-content:center;
                align-items: center;
                margin-left: 10px;
                font-size:12px;
                font-family:MicrosoftYaHei;
                color:rgba(140,140,140,1);
                &>span{
                    margin-left:5px;
                }
        }
    }
  
}
</style>