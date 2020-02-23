import Vue from "vue";
import VueRouter, { Route } from "vue-router";

import Home from "../views/Home.vue";
import IAT from "../views/IAT/IAT.vue";
import Welcome from "../views/IAT/Welcome.vue";
import Result from "../views/IAT/Result.vue";
import Container from "../views/IAT/Container.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      keepAlive: true,
      title: "进行中的项目"
    }
  },
  {
    path: "/iat",
    name: "IAT",
    component: IAT,
    beforeEnter: (to: Route, from: Route, next: (to?: any) => void) => {
      if (from.path === "/" && (to.path === "/iat" || to.path === "/iat/")) {
        next("/iat/welcome");
      }
      next();
    },
    children: [
      {
        path: "welcome",
        component: Welcome,
        meta: {
          title: "项目说明 | 饮食内隐联想测验"
        }
      },
      {
        path: "main",
        component: Container,
        meta: {
          title: "测验进行中 | 饮食内隐联想测验"
        }
      },
      {
        path: "result",
        component: Result,
        meta: {
          title: "测验完成，感谢您的支持！"
        }
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
