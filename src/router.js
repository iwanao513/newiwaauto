import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  // This is for the scroll top when click on any router link
  
  routes: [
    {
      path: '/browser',
      name: 'Browser',
      component: () => import("@/views/Browser")
    },
    {
      path: "/",
      redirect: "home",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "Home",
          path: "home",
          component: () => import("@/views/home/Home"),
        },
        {
          name: "Conditions",
          path: "conditions",
          component: () => import("@/views/conditions/Conditions"),
        },
        {
          name: "Log",
          path: "log",
          component: () => import("@/views/log/Log"),
        },
      ],
    },
    {
      path: "*",
      component: () => import("@/views/authentication/Error"),
    },
  ],
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
