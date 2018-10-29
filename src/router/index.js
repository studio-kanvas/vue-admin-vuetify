import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/views/auth/Login.vue';
import Layout from '@/views/layouts/Layout.vue';
import LayoutWithoutSidebar from '@/views/layouts/LayoutWithoutSidebar.vue';

import components from './modules/components';
import widgets from './modules/widgets';
import uiComponents from './modules/ui-components';

Vue.use(Router);

/**
* TIPS:
* meta: {
*   hidden: false,    // If `hidden:true` will not appear in the navigation bar or sidebar(default is false)
*   auth: [],         // It will control the page roles (you can set multiple roles)
*   icon: 'home',     // Icon will appear in the navigation bar or sidebar
*   hasMulSub: false, // It has multiple children
* }
*/
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        hidden: true,
      },
    },
    {
      path: '/',
      redirect: { name: 'Dashboard' },
      meta: {
        hidden: true,
      },
    },
    {
      path: '/index',
      name: 'Index',
      component: Layout,
      redirect: { name: 'Dashboard' },
      meta: {
        hidden: false,
        hasMulSub: false,
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/Index.vue'),
          meta: {
            icon: 'dashboard',
          },
        },
        components,
        widgets,
        uiComponents,
      ],
    },
    {
      path: '/admin',
      component: LayoutWithoutSidebar,
      redirect: { name: 'Admin' },
      children: [
        {
          path: '/admin',
          name: 'Admin',
          component: () => import('@/views/admin/Homepage.vue'),
          meta: {},
        },
      ],
    },
    {
      path: '/403',
      meta: {
        hidden: true,
      },
      // redirect: { name: 'Index' },
      component: Login,
    },
    {
      path: '*',
      redirect: { name: 'Index' },
      meta: {
        hidden: true,
      },
    },
  ],
});
