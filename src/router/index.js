import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'


const index = r => require.ensure([], () => r(require('pages/index')), 'index')
const classify = r => require.ensure([], () => r(require('pages/classify')), 'classify')
const subject_List = r => require.ensure([], () => r(require('pages/subject_List')), 'subject_List')
const goods_list = r => require.ensure([], () => r(require('pages/goods_list')), 'goods_list')
const goods_type_list = r => require.ensure([], () => r(require('pages/goods_type_list')), 'goods_type_list')
const details = r => require.ensure([], () => r(require('pages/details')), 'details')
const shopcart = r => require.ensure([], () => r(require('pages/shopped')), 'shopcart')
const user =  r => require.ensure([], () => r(require('pages/user')), 'user')
const reg = r => require.ensure([], () => r(require('components/user/register')), 'reg')
const login = r => require.ensure([], () => r(require('components/user/login')), 'login')
const search =r => require.ensure([], () => r(require('components/search/search')), 'search')
const error = r => require.ensure([], () => r(require('components/common/error')), 'error')



Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
    if(savedPosition){
        return savedPosition
    }else{
        return { x: 0, y: 0 }
    }
}
export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  base:'',
  scrollBehavior ,
  routes: [
    {
      path: '/',
      name: 'App',
      redirect: "/index",
      component:index,
      meta:{ 
        keepAlive: true,
        title:'首页'
       }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta:{ 
        keepAlive: true,
        title:'首页'
       }
    },
    {
      path: '/classify',
      name: 'classify',
      component:classify,
      meta:{ 
        title:'分类'
       }
    },
    {
      path: '/subject_List',
      name: 'subject_List',
      component: subject_List,
      meta:{ 
        title:'人气品牌'
       }
    },
    {
      path: '/classify_goods_list',
      name: 'goods_list',
      component: goods_list,
      meta:{ 
        title:'品牌分类'
       }
    },
    {
      path: '/classify_goods_type_list',
      name: 'goods_type_list',
      component: goods_type_list,
      meta:{ 
        title:'产品分类列表'
       }
    },
    {
      path: '/details_GetGood_Desc',
      name: 'details',
      component: details,
      meta:{ 
        title:'产品详情'
       }
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component:  shopcart,
      meta:{ 
        title:'购物车'
       }
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      meta:{ 
        title:'用户中心'
       }
    },
    {
      path: '/register',
      name: 'reg',
      component:reg,
      meta:{ 
        title:'注册中心'
       }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{ 
        title:'登陆中心'
       }
    },
    {
      path: '/search',
      name: 'search',
      component:search,
      meta:{ 
        title:'搜索中心'
       }
    },
    {
      path:'*',
      name: 'error',
      component:error,
    }
  ],
})
