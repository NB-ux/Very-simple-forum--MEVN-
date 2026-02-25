import { createRouter, createWebHistory } from "vue-router";
//import Home from "./views/Home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("./views/Paper.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./views/About.vue"),
  },
  {
    path: "/paper",
    name: "paper",
    component: () => import("./views/Paper.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./views/Register.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("./views/Profile.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;