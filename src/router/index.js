import Vue from "vue";
import VueRouter from "vue-router";
import Cookies from "js-cookie";
import ContentComponent from '@/components/layouts/content-component.vue';
import Home from "@/views/Home.vue";
import Login from "@/views/auth/login.vue";
import Register from "@/views/auth/register.vue";
import SampleSells from '@/views/SampleSells.vue';
import Sponsors from '@/views/financial/sponsors/sponsors.vue';
import Budgets from '@/views/financial/budgets.vue';
import Transactions from '@/views/financial/transactions.vue';
import Party from "@/views/party/party-list.vue";
import PartyMenu from "@/views/party-menu/party-menu.vue";
import PartyMenuItem from "@/views/party-menu/party-menu-item.vue";
import Financials from "@/views/financial/financials.vue";
import Profile from "@/views/user/profile.vue";
import Sales from "@/views/sales/sales.vue";
import PartyDetails from "@/views/party/party-details.vue";

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
            {
                path: ':id',
                component: Profile,
                name: 'profile'
            },
        ]
    },
    // {
    //     path: "/sales",
    //     component: ContentComponent,
    //     children: [
    //         {
    //             path: '',
    //             component: SampleSells,
    //         },
    //     ]
    // },
    {
        path: "/party",
        component: ContentComponent,
        children: [
            {
                path: '',
                component: Party,
                name: 'partyList'
            },
            {
                path: 'view',
                component: PartyDetails,
                name: 'partyDetails',
                props: true
            },
        ]
    },
    {
        path: "/party-menu",
        component: ContentComponent,
        children: [
            {
                path: 'view',
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
    },
    {
        path: "/sales",
        component: ContentComponent,
        children: [
            {
                path: '',
                component: Sales,
                name: 'partyMenuItem'
            },

        ]
    },
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
        next({name: 'login'});
    }

    next();
});

export default router;
