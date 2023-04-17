import Vue from "vue";
import VueRouter from "vue-router";
import ContentComponent from '@/components/layouts/content-component.vue';
import Home from "@/views/Home.vue";
import Login from "@/views/auth/login.vue";
import Register from "@/views/auth/register.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/auth",
        component: ContentComponent,
        children: [
            {
                path: 'login',
                component: Login
            },
            {
                path: 'register',
                component: Register
            },
        ]
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
