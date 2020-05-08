import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/manage',
    redirect:'/activity/activityInfo',
    name: 'manage',
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Manage.vue'),
    children:[
      {
        path: '/activity/activityInfo',
        name: 'activityInfo',
        meta:{ requireAuth:true },
        component: () => import('../components/manageView/ActivityInfo.vue')
      },
   
      {
        path: '/user/userInfo',
        name: 'userInfo',
        meta:{ requireAuth:true },
        component: () => import('../components/manageView/UserInfo.vue')
      },
      {
        path: '/fuzeren/fuzerenInfo',
        name: 'fuzerenInfo',
        meta:{ requireAuth:true },
        component: () => import('../components/manageView/FuzerenInfo.vue')
      },
      {
        path: '/web/webInfo',
        name: 'webInfo',
        meta:{ requireAuth:true },
        component: () => import('../components/manageView/WebInfo.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
