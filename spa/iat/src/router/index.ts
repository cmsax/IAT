import Vue from "vue";
import VueRouter from "vue-router";
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
    component: Home
  },
  {
    path: "/iat",
    name: "IAT",
    component: IAT,
    children: [
      {
        path: "welcome",
        component: Welcome
      },
      {
        path: "main",
        component: Container
      },
      {
        path: "result",
        component: Result
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
