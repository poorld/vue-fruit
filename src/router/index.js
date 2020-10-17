import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 所有权限通用路由表
 * 如首页和登录页和一些不用权限的公用页面
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/product',
    component: Layout,
    redirect: '/product/table',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: '商品',
        component: () => import('@/views/product/fruit/index'),
        meta: { title: '商品', icon: 'table' }
      },
      {
        path: 'category',
        name: '分类',
        component: () => import('@/views/product/category/index'),
        meta: { title: '分类', icon: 'tree' }
      },
      {
        path: 'banner',
        name: '轮播图',
        component: () => import('@/views/product/banner/index'),
        meta: { title: '轮播图', icon: 'tree' }
      },
      {
        path: 'addProduct',
        name: '添加商品',
        component: () => import('@/views/product/addProduct/index'),
        meta: { title: '添加商品', icon: 'tree' },
        hidden: true
      },
      {
        path: 'productInfo',
        name: '商品详情',
        component: () => import('@/views/product/info/index'),
        meta: { title: '添加商品', icon: 'tree' },
      }
    ]
  },

  {
    path: '/discounts',
    component: Layout,
    redirect: '/discounts/index',
    name: '优惠活动',
    meta: { title: '优惠活动', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: '优惠活动',
        component: () => import('@/views/discounts/index'),
        meta: { title: '优惠活动', icon: 'form' }
      },
      {
        path: 'type',
        name: '优惠类型',
        component: () => import('@/views/discounts/type'),
        meta: { title: '优惠类型', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },
  {
    path: '/xigua',
    component: Layout,
    redirect: '/xigua/link-analysis',
    name: '西瓜视频',
    meta: { title: '西瓜视频', icon: 'watermelon' },
    children: [
      {
        path: 'link-analysis',
        name: 'Link-analysis',
        component: () => import('@/views/xigua/analysis/index'),
        meta: { title: '链接解析', icon: 'link-analysis' }
      },
      {
        path: 'subscription-list',
        name: 'Subscription',
        component: () => import('@/views/xigua/subscription/index'),
        meta: { title: '订阅列表', icon: 'video-list' }
      },
      {
        path: 'video-list',
        name: 'Video-list',
        component: () => import('@/views/xigua/analysis/index'),
        meta: { title: '推送列表', icon: 'push' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
