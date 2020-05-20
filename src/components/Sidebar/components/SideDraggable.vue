<!-- 侧边栏拖拉框 -->
<template>
  <div class="SideDraggable">
    <div class="set">
      <div>
        <span>快速入口</span>
      </div>
      <div class="shezhi" @click.prevent="shezhi">
        <img src="@/assets/img/sidebar/shezhi.png" alt />
      </div>
    </div>

    <draggable
      class="Draggable"
      v-model="todo"
      v-bind="dragOptions"
      @change="change"
      v-loading="loading"
    >
      <div v-for="item in todo" class="drag-list" :key="item.id" @click.stop="jumpTo(item.uri)">
        <img class="imgdiv" :src="item.sysLogo" alt />
        <!-- <a :href="item.href" target="_blank">{{item.content}}</a> -->
        <div>{{item.name}}</div>
      </div>
    </draggable>
    <!-- 设置快捷入口的弹框 -->
    <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="55%" top="5vh" :before-close="handleClose">
      <span slot="title" class="dialog-title">
        <span style="color:rgba(38,38,38,1);">选择系统</span>
        <span
          style="font-size:12px;color:rgba(89,89,89,1);margin-left:5px"
        >(选择常用系统置于首页快速入口处，以便快速找到系统)</span>
      </span>

      <el-divider></el-divider>
      <div
        class="dialog-content"
        v-loading="dlloading"
        v-for="(item) of Authority"
        :key="item.dictId"
      >
        <span>{{item.dictName}}</span>
        <ul>
          <li
            :class="{isActive:isActive(childitem)}"
            v-for="childitem of item.spmlist"
            :key="childitem.id"
            @click="check(childitem)"
          >
            <img class="logoimg" :src="childitem.sysLogo" alt />
            <el-tooltip class="item" effect="dark" :content="childitem.name" placement="top" :disabled="!(childitem.name.length>6)">
             <span>{{childitem.name}}</span>
             </el-tooltip>
            <!-- 选中或没选择的图片样式-->
            <img class="onimg" src="@/assets/img/sidebar/sel.png" alt v-show="isActive(childitem)" />
            <img
              class="onimg"
              src="@/assets/img/sidebar/unsel.png"
              alt
              v-show="!isActive(childitem)"
            />
          </li>
          <!-- <li>
            <img class="logoimg" src="@/assets/img/sidebar/daping-icon.png" alt='' />
            <span>111111</span>
            <img class="onimg" src="@/assets/img/sidebar/unsel.png" alt='' />
          </li>-->
        </ul>
      </div>

      <el-divider></el-divider>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="save()">{{savetext}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
import draggable from "vuedraggable";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    draggable
  },
  data() {
    //这里存放数据
    return {
      userId: 1, //临时写死userid
      loading: false,
      dlloading: false, //弹框加载样式
      dialogVisible: false,
      savetext:'确 定',
      dragOptions: {
        animation: 120,
        scroll: true,
        group: "sortlist",
        ghostClass: "ghost-style"
      },
      todo: [
        // {
        //   id: 1,
        //   content: "数据质量分析",
        //   icon: "daping-icon",
        //   href: "http://121.36.137.188:8088/dataQuality/dataQualityAnalysis"
        // },
        // {
        //   id: 2,
        //   content: "用户管理",
        //   icon: "daping-icon2",
        //   href: "http://121.36.137.188:8082/um/userManage"
        // },
      ],
      Authority: [], //设置列表的所有数据
      TemporaryAuthority: [] //临时选中的数据 只存了id
    };
  },
  //计算属性 类似于data概念
  computed: {
    //   isActive(){
    //   }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //判断是否是选中的数据
    isActive(childitem) {
      let isactive = false;
      this.TemporaryAuthority.forEach(id => {
        if (id == childitem.id) isactive = true;
      });
      return isactive;
    },
    //li元素点击事件
    check(childitem) {
      console.log(childitem);
      let index = this.TemporaryAuthority.indexOf(childitem.id);
      console.log(index);
      if (index == -1) {
        this.TemporaryAuthority.push(childitem.id);
      } else {
        this.TemporaryAuthority.splice(index, 1);
      }
      console.log(this.TemporaryAuthority);
    },
    //跳转链接
    jumpTo(uri) {
      console.log(uri);

      //   window.open(e);
    },
    change(event) {
      console.log(event);
      console.log(this.todo);

      this.loading = true;
      let param = {
        splist: this.todo,
        userId: this.userId //临时写死
      };
      this.$ajax.sidebar.updateQuickEntry(param).then(
        res => {
          if (res?.data?.code == 200) {
            
            console.log("改变顺序");
            console.log(res);
            //把值赋值到临时数据
            // this.$message.success(res.data.message);
          }
          this.loading = false;
        },
        err => {
          this.loading = false;
          this.$message.error(err || "请求失败");
        }
      );
    },
    //获取拖动列表数据todo
    gettodo() {
        this.todo=[];//清空数据
      this.loading = true;
      let param = {
        userId: this.userId //临时写死
      };
      this.$ajax.sidebar.getQuickEntryByUserId(param).then(
        res => {
            console.log(res.data);
          if (res?.data?.code == 200) {
            
            console.log("获取列表");
            
            this.todo = res.data.result;
            //把值赋值到临时数据
            res.data.result.forEach(e => {
              this.TemporaryAuthority.push(e.id);
            });
          }
          this.loading = false;
        },
        err => {
          this.loading = false;
          this.$message.error(err || "请求失败");
        }
      );
    },
    //设置按钮事件
    shezhi() {
      this.dialogVisible = true;
      this.dlloading = true;
      this.$ajax.sidebar.getAuthorityByName().then(
        res => {
          if (res?.data?.code == 200) {
            
            console.log("获取设置列表");
            console.log(res.data.result);
            this.Authority = res.data.result.cmlist;
          }
          this.dlloading = false;
        },
        err => {
          this.dlloading = false;
          this.$message.error(err || "请求失败");
        }
      );
    },
    //保存按钮
    save() {
        this.savetext='保存中...';
        let param = {
            psqelist:[],
            userId:this.userId
        };
        if(this.TemporaryAuthority.length>0)
        {
            this.TemporaryAuthority.forEach(id => {
             param.psqelist.push({ permissionId: id, userId: this.userId });
            });
        }
      console.log(param);
      this.$ajax.sidebar.saveQuickEntry(param).then(
        res => {
          if (res?.data?.code == 200) {
            
            console.log("保存按钮");
            this.gettodo();
            this.savetext='确 认'
            this.TemporaryAuthority=[];//临时数据清空
          }
          this.dialogVisible = false;
        },
        err => {
          this.dialogVisible = false;
          this.TemporaryAuthority=[];//临时数据清空
          this.savetext='确 认'
          this.$message.error(err || "请求失败");
        }
      );
    },
    handleClose(){
        console.log('关闭');    
        this.dialogVisible = false;
        this.TemporaryAuthority=[];//临时数据清空
        this.todo.forEach(item => {//重新赋值
            this.TemporaryAuthority.push(item.id);
        });
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.gettodo();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style >
.el-dialog__body {
  padding: 0 20px;
}
</style>
<style lang='less' scoped>
//@import url(); 引入公共css类
.SideDraggable {
  //position: relative;
  .set {
    width: 216px;
    height: 43px;
    margin: 5px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }
    .shezhi:hover {
      cursor: pointer;
    }
    span {
      font-size: 16px;
    }
  }

  //可拖拽div
  .drag-list {
    height: 80px;
    border: 1px #fff solid;
    padding: 10px;
    margin-bottom: 18px;
    list-style: none;
    background: rgba(242, 246, 247, 1);
    border-radius: 8px;
    cursor: pointer;
    -webkit-transition: border 0.3s ease-in;
    transition: border 0.3s ease-in;
    display: flex;
    justify-content: start;
    align-items: center;
    div {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 100%;
    }
    .imgdiv {
      width: 48px;
      height: 48px;
      margin-right: 12px;
      border-radius: 12px;
    }
    &:hover {
      border: 1px solid #20a0ff;
    }
    // &:last-child{
    //     margin-bottom: 150px;
    // }
  }
  .el-divider--horizontal {
    margin: 0;
  }
  .dialog-title {
    display: flex;
    justify-content: start;
    align-items: flex-end;
  }
  .dialog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    & > span {
      text-align: left;
      margin-top: 12px;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      color: rgba(89, 89, 89, 1);
    }
    ul {
      display: flex;
      justify-content: start;
      align-items: center;
      flex-wrap: wrap;
      margin: 12px 0;

      li {
        width: 208px;
        height: 80px;
        background: rgba(242, 246, 247, 1);
        border-radius: 8px;
        position: relative;
        margin-right: 24px;
        margin-bottom: 12px;
        cursor: pointer;
        &:hover {
          // border: 1px solid #20a0ff;
          box-shadow: 0px 2px 6px 0px rgba(165, 166, 168, 0.5);
        }
        .logoimg {
          width: 48px;
          height: 48px;
          position: absolute;
          top: 16px;
          left: 20px;
        }
        .onimg {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 8px;
          right: 8px;
        }
        span {
          position: absolute;
          overflow: hidden;
          text-overflow: ellipsis; 
          white-space: nowrap;
          top: 31px;
          left: 80px;
          right: 30px;
          font-size: 14px;
          font-family: MicrosoftYaHei;
          color: rgba(38, 38, 38, 1);
          text-align: left;
        }
      }
    }
  }
  .isActive {
    border: 2px solid rgba(85, 165, 255, 1);
  }
}
</style>