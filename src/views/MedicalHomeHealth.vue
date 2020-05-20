<!-- 健康档案浏览器 -->
<template>
<div class='medicalhomehealth'>
    <!-- <div class="tagsbar" v-if="false">
        <ul>
            <li v-for="(item,index) of lis" :key="index" 
            @click="changePage(item.name)" 
            :class="{onclickli:currentli === item.name,notonclickli:currentli != item.name}"
            >{{item.name}}</li>
        </ul>
    </div> -->
    <div class="inputcontent">
             <span class="searchItem">
            人群标签：
            <el-select v-model="search.sex" clearable style="width: 180px" size="small">
                <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </span>
        <span class="searchItem">
            姓名：
            <el-input   placeholder="" style="width:180px" v-model="search.name">
            </el-input>
        </span>
   
        <span class="searchItem">
            身份证号：
            <el-input  clearable placeholder="" style="width:180px" v-model="search.name" >
            </el-input>
        </span>
        <span class="searchItem">
            就诊结果：
            <el-input  clearable placeholder="" style="width:180px" v-model="search.sex">
            </el-input>
        </span>
        <span class="searchItem">
            就诊日期：
              <el-date-picker
                    v-model="search.date"
                    type="datetimerange"
                    align="right"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    size:large
                    
                    >
                    </el-date-picker>
        </span>
            <span class="searchItem">
            就诊机构：
            <el-select v-model="search.sex" clearable style="width: 180px" size="small">
                <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </span>
        <span class="searchItem">
            患者主索引：
            <el-input  clearable placeholder="" style="width:180px" v-model="search.sex" >
            </el-input>
        </span>
         <span class="searchItem">
           <el-button type="primary"  size=”medium“ style="width:160px; " @click="searchbtn()" >查询</el-button>
        </span>
    </div>
    <div class="tableMain">
                <el-table ref="multipleTable" :data="tableData" style="width: 100%" row-key="mpiId" lazy :load="load"
                    :tree-props="{
                        children: 'children',
                        hasChildren: 'hasChildren'
                    }" v-loading="loading" header-row-class-name="tableHeader" @row-dblclick="dbClick">
                    <el-table-column prop="mpiId" label="身份证号">
                        <template slot-scope="scope">
                            <span v-if="scope.row.hasChildren">{{
                                scope.row.mpiId
                            }}</span>
                        </template>
                    </el-table-column>       
                    <el-table-column prop="patientName" label="姓名" width="100">
                        <template slot-scope="scope">
                            <span @click="showDetail(scope.row)" class="textStyle"
                                style="color: #478CD1;">{{ scope.row.patientName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sexName" label="性别" width="60"></el-table-column>
                    <el-table-column prop="birthday" label="出生日期" width="100">
                        <template slot-scope="scoped">
                            <span>{{ this.$moment(scoped.row.birthday).format("YYYY-DD-MM") }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="telephone" label="电话"></el-table-column>
                    <el-table-column prop="unstructuredAddress" label="户籍地址" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mpi" label="患者主索引" width="100">
						<template slot-scope="scope">
							<span @click="showDetail(scope.row)" style="cursor: pointer;">{{scope.row.mpi}}</span>
						</template>
					</el-table-column>
                   <el-table-column prop="telephone" label="人群标签"></el-table-column>
                   <el-table-column prop="telephone" label="诊断结果"></el-table-column>
                   <el-table-column prop="telephone" label="就诊机构"></el-table-column>
                   <el-table-column prop="telephone" label="就诊日期"></el-table-column>
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
            // currentli:'条件查询',
            // lis:{
            //     lis1:{
            //         name:'条件查询',
            //     },
            //     lis2:{
            //         name:'模糊查询',
            //     }
            // },
            loading:false,
            tableData: [],
            search: {
                mpi: "",
                insuranceNo: "",
                idNo: "",
                name: "",
                sex: "",
                birthday: "",
                contentTel: "",
                date:[this.$moment().subtract(6, 'days').format('YYYY-MM-DD'),this.$moment().format("YYYY-MM-DD")],
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
            sexOptions: [
                {
                    value: "1",
                    label: "男"
                },
                {
                    value: "2",
                    label: "女"
                },
                {
                    value: "3",
                    label: "未知"
                }
            ],
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
            // changePage(name){
            // this.currentli=name
            // } ,
            //患者详细弹框打开
            showDetail(row) {
                
              
                this.$message(row)
            },
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
.medicalhomehealth{
        width:100%;
        height:100%;
        background:rgba(255,255,255,1);
        font-family:MicrosoftYaHei;
        box-shadow:0px 2px 12px 0px rgba(200,204,207,0.5);
        border-radius:8px;
        .tagsbar{
            margin: 69px 0;
            ul{
                display: flex;
                justify-content: center;
                align-items: center;
            }
            li{
                // background: rgba(244,246,250,1);
                box-sizing: border-box;
                width:268px;
                height:43px;
                font-size:14px;
                color:rgba(38,38,38,1);
                
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover{
                    cursor:pointer   
                }
                transition: background .5s ;
            }
        }
        .inputcontent{
            margin: 30px ;
            display: flex;
            justify-content: start;
            align-items: center;
            flex-wrap: wrap;
            .searchItem{
                margin: 18px;
                display: inline-block;
                // /deep/.el-button--primary{
                //     background-color:#5C8AE6
                // }
            }
        }
        .tableMain{
            margin: 0 24px 32px 24px;
			.textStyle{
				//color: #478CD1;
                cursor: pointer;
                margin-right: 17px;
			}
		}
}
.onclickli{
    background: #fff;
    border: 1px solid #F0F0F0;
    border-bottom-color: #3198FF;
    // border-radius:4px 4px 0px 0px;
}
.notonclickli{
    background: rgba(244,246,250,1);
    border: 1px solid #F0F0F0;
    // border-radius:4px 4px 0px 0px;
}
</style>