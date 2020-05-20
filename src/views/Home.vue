<template>
  <div class="home">
      <div class="header"><hy-header></hy-header></div>
      <div class="content">
        <div class="left">
          <hy-sidebar></hy-sidebar>
        </div>
        <div class="right">
          <div class="content-box">
              <transition name="move" mode="out-in">
                    <keep-alive >
                        <router-view></router-view>
                    </keep-alive>
              </transition>
                  
          </div>
            <el-backtop target=".content-box"></el-backtop>
        </div>
        
      
      </div>
      <div class="footer">苏州环亚数据技术有限公司 ©版权所有</div>


  </div>

</template>

<script>
// @ is an alias to /src
import HyHeader from '@/components/Header/index.vue'
 import HySidebar from '@/components/Sidebar/index.vue'
export default {
  name: 'Home',
  components: {
    HyHeader,
    HySidebar
  }
}
</script>
<style lang='less' scoped>
.home{
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-box-orient:vertical;
    -webkit-flex-direction:column;
    -ms-flex-direction:column;
    flex-direction:column;
    width:100%;
    height:100%;

.header
{
 background: #2D80D2;
 padding-left:6px;
}
.footer{
    height:56px;
    line-height:56px;
    text-align: center;
    font-size:12px;
    color: #BFBFBF;
}
.content{
    -webkit-box-flex:1;
    -webkit-flex:1;
    -ms-flex:1;
    flex:1;
    width:100%;
    padding:10px 0px 0 10px;
    box-sizing: border-box;
    display: flex;
    .left{
      width: 240px;
      position:relative;
    }
    .right{
      position:relative;
      flex:1;
      // height: 100%;
      //background: #fff;
      // margin-left: 10px;
      .content-box{
       // margin: 0 10px;
        height: 100%;
        width: 100%;
        position: absolute;
        overflow-y:scroll;
        overflow-y: overlay;
      }
      
    }
}

 
}



</style>
