import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'//时间格式化插件
Vue.prototype.$moment = moment;//赋值使用
import './components/common/directives';
//配置各个浏览器样式兼容
import '@/assets/css/normalize.css'
import '@/assets/css/main.css'
import '@/assets/css/table.less'
import '@/assets/css/dashboard.less'
//请求封装
import ajax from '@/ajax/index.js'
Vue.prototype.$ajax = ajax

//按需注册v-charts
import VeHistogram from 'v-charts/lib/histogram.common'
import VePing from 'v-charts/lib/ring.common'
import VeLine from 'v-charts/lib/line.common'
import VeBar from 'v-charts/lib/bar.common'
Vue.component(VeLine.name, VeLine)
Vue.component(VePing.name,VePing)
Vue.component(VeBar.name,VeBar)
Vue.component(VeHistogram.name,VeHistogram)
Vue.use(ElementUI, {
  size: 'small'
});
Vue.config.productionTip = false

const sysTitle = '高速通2.0'
Vue.prototype.$sysTitle = sysTitle
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = `${sysTitle} - ${to.meta.title}`
  }
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
