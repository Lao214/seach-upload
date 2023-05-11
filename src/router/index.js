//1.导入VueRouter
import Vue from "vue";
import VueRouter from 'vue-router'
//2.使用路由
Vue.use(VueRouter);
//3.创建VueRouter的实例
const router = new VueRouter({
    //tips:不想要 #（锚点）就添加下面代码
     mode:'history', 
    //4.配置路由的path和组件
    routes :[
        {
          path: "/",
          name:'Login',
          component: () => import("../view/index.vue")
        },
        {
          path: "/tags",
          name:'index',
          component: () => import("../view/tags/index.vue")
        },
        {
          path: "/login",
          name:'Login',
          component: () => import("../components/Login.vue")
        },
        {
          path: "/home",
          name:'Home',
          component: () => import("../view/index.vue"),
          children: [
            {
              path: '/myAudit',
              name: 'myAudit',
              meta: {
                title: "活动资料列表"
              },
              component: () => import('@/view/upload/MyAudit.vue')
            },
            {
              path: '/myProject',
              name: 'myProject',
              meta: {
                title: "我的项目"
              },
              component: () => import('@/view/upload/MyProject.vue')
            },
            {
              path: '/activity',
              name: 'activity',
              meta: {
                title: "活动资料"
              },
              component: () => import('@/view/upload/Activity.vue')
            },
            {
              path: '/user',
              name: 'user',
              meta: {
                title: "用户管理"
              },
              component: () => import('@/view/user/User.vue')
            },
            {
              path: '/allProject',
              name: 'allProject',
              meta: {
                title: "用户管理"
              },
              component: () => import('@/view/user/AllProject.vue')
            },
            {
              path: '/projectDetails',
              name: 'projectDetails',
              component: () => import('@/view/user/projectDetails.vue')
            },
            {
              path: '/role',
              name: 'role',
              meta: {
                title: "角色管理"
              },
              component: () => import('@/view/user/Role.vue')
            },
            {
              path: '/contactUs',
              name: 'contactUs',
              meta: {
                title: "联系我们"
              },
              component: () => import('@/view/us/ContactUs.vue')
            },
            {
              path: '/changeKey',
              name: 'changeKey',
              meta: {
                title: "联系我们"
              },
              component: () => import('@/view/keys/ChangeKey.vue')
            }
          ]
        },
      ]
})
//5.导入路由实例
export default router

