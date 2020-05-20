import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

  const routes = [
  {
      path: '/',
      redirect: '/adminhome'
  },
  {
    path: '/medicalhome',
    redirect: '/medicalhome/medicalhomeclinical'
},
  {
    path: '/',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: { title: '首页' },
    children:[
      {
        path: '/Welcome',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "PresidentHome" */ '../views/Welcome.vue'),
        meta: { title: '欢迎使用'}
      },
      {
        path: '/presidenthome',
        component: () => import(/* webpackChunkName: "PresidentHome" */ '../views/PresidentHome.vue'),
        meta: { title: '院长首页' }
      },
      {
        path: '/adminhome',
        component: () => import(/* webpackChunkName: "AdminHome" */ '../views/AdminHome.vue'),
        meta: { title: '管理员首页' }
      },
      {
        path: '/medicalhome',
        component: () => import(/* webpackChunkName: "MedicalHome" */ '../views/MedicalHome.vue'),
        meta: { title: '医护人员首页' },
        children:[
          {
            path: 'medicalhomeclinical',
            name:"临床数据中心",
            component: () => import(/* webpackChunkName: "MedicalHomeClinical" */ '../views/MedicalHomeClinical.vue'),
            meta: { title: '临床数据中心'}
          },
          {
            path: 'medicalhomehealth',
            name:"健康档案浏览器",
            component: () => import(/* webpackChunkName: "MedicalHomeClinical" */ '../views/MedicalHomeHealth.vue'),
            meta: { title: '健康档案浏览器'}
          },
        ]
      },
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
