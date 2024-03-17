import Vue from "vue";
import VueRouter from "vue-router";
import ContentComponent from '@/components/layouts/content-component.vue';
import Home from "@/views/Home.vue";
import Login from "@/views/auth/login.vue";
import Register from "@/views/auth/register.vue";
import SampleSells from '@/views/SampleSells.vue';
import Sponsors from '@/views/financial/sponsors.vue';
import Budgets from '@/views/financial/budgets.vue';
import Transactions from '@/views/financial/transactions.vue';
import Party from "@/views/party/party.vue";

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
    },
    {
        path: "/sales",
        component: ContentComponent,
        children: [
            {
                path: '',
                component: SampleSells,
            },
        ]
    },
    {
        path: "/party",
        component: ContentComponent,
        children: [
            {
                path: '',
                component: Party,
            },
        ]
    },
    {
        path: "/financial",
        component: ContentComponent,
        children: [
            {
                path: 'sponsors',
                component: Sponsors,
            },
            {
                path: 'budgets',
                component: Budgets,
            },
            {
                path: 'transactions',
                component: Transactions
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
