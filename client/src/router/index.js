import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Settings from "../views/Settings.vue";
import DetailOverview from "../views/DetailOverview.vue";
import Connect from "../views/Connect.vue";
import Features from "../views/Features.vue";
import MakeAppointment from "../views/MakeAppointment.vue";
import PatientList from "../views/PatientList.vue";
import _ from "lodash";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true,
      canViewWithAuth: true
    }
  },
  {
    path: "/login",
    component: Login,
    meta: {
      requiresAuth: false,
      canViewWithAuth: false
    }
  },
  {
    path: "/makeappointment",
    component: MakeAppointment,
    meta: {
      requiresAuth: true,
      canViewWithAuth: true
    }
  },
  {
    path: "/settings",
    component: Settings,
    meta: {
      requiresAuth: false,
      canViewWithAuth: true
    }
  },
  {
    path: "/patients/:id",
    name: "patientDetails",
    component: DetailOverview,
    meta: {
      requiresAuth: true,
      canViewWithAuth: true
    }
  },
  {
    path: "/integrations/:integrationId/edit",
    component: EditData,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/doctor/:id",
    name: "patientList",
    component: PatientList,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/connect",
    name: "connect",
    component: Connect,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/features",
    name: "features",
    component: Features,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const routeRequiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const canViewRouteWithAuth = to.matched.some(x => x.meta.canViewWithAuth);
  const token = localStorage.getItem("token");
  if (routeRequiresAuth && _.isNil(token)) {
    next("/login");
  } else if (!canViewRouteWithAuth && !_.isNil(token)) {
    next("/");
  } else {
    next();
  }
});

export default router;
