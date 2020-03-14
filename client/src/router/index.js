import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Settings from '../views/Settings.vue';
import DetailOverview from '../views/DetailOverview.vue';
import MakeAppointment from '../views/MakeAppointment.vue';
import EditData from '../views/EditData.vue';
import _ from 'lodash';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/makeappointment',
    component: MakeAppointment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    component: Settings,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/patients/:id',
    name: 'patientDetails',
    component: DetailOverview,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/integrations/:integrationId/edit',
    component: EditData,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const routeRequiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const token = localStorage.getItem('token');
  if (routeRequiresAuth && _.isNil(token)) {
    next('/login');
  } else if (!routeRequiresAuth && !_.isNil(token)) {
    next('/');
  } else {
    next();
  }
});

export default router;
