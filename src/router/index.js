import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";
import ContentComponent from '@/components/layouts/content-component.vue';
import Home from "@/views/Home.vue";
import Login from "@/views/auth/login.vue";
import Register from "@/views/auth/register.vue";
import SampleSells from '@/views/SampleSells.vue';
import Sponsors from '@/views/financial/sponsors.vue';
import Budgets from '@/views/financial/budgets.vue';
import Transactions from '@/views/financial/transactions.vue';
import Party from "@/views/party/party.vue";
import Products from "@/views/products/products.vue";
import PartyMenu from "@/views/party-menu/party-menu.vue";
import PartyMenuItem from "@/views/party-menu/party-menu-item.vue";
import Financials from "@/views/financial/financials.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home,
        name: 'home',
    },
    {
        path: "/auth",
        component: ContentComponent,
        children: [
            {
                path: 'login',
                component: Login,
                name: 'login'
            },
            {
                path: 'register',
                component: Register,
                name: 'register'
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
        path: "/products",
        component: ContentComponent,
        children: [
            {
                path: '',
                component: Products,
            },
        ]
    },
    {
        path: "/party-menu",
        component: ContentComponent,
        children: [
            {
                path: ':id',
                component: PartyMenuItem,
                name: 'partyMenuItemShow'
            },
            {
                path: '',
                component: PartyMenu,
                name: 'partyMenuItem'
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
                path: 'financials',
                component: ContentComponent,
                children: [
                    {
                        path: '',
                        component: Financials,
                        name: 'Financials'
                    },
                    {
                        path: ':id/transactions',
                        component: Transactions,
                        name: 'Transactions'
                    },
                ]
            }
        ]
    }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach(async (to, from, next) => {
    const token = Cookies.get('smp_token');
    if(
        !token &&
        (!['login', 'register'].includes(to.name))
    ) {
        return '/auth/login';
    }

    next();
});

export default router;
