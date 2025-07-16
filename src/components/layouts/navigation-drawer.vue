<template>

    <v-navigation-drawer app :mini-variant.sync="drawerModel" v-if="user" permanent>

        <v-img :src="logo" :eager="true"></v-img>

        <v-list>
            <v-list-item v-for="item in items" :key="item.title" link @click="routeGo(item)">

               <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>

            </v-list-item>

             <v-list-group prepend-icon="attach_money" no-action>

                    <template v-slot:activator>
                        <v-list-item-title>Financeiro</v-list-item-title>
                    </template>

                    <v-list-item v-for="item in financialItems" :key="item.title" :to="item.route">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-title>
                            {{item.title}}
                        </v-list-item-title>
                    </v-list-item>

                </v-list-group><!-- ADMIN -->
        </v-list>

    </v-navigation-drawer>

</template>

<script>

    import logo from '@/assets/smp-logo.png';

    export default {
        name: 'navigation-drawer',
        data() {
            return {
                logo: logo,
                items: [
                    {title: 'Inicio', icon: 'house', route: '/'},
                    {title: 'Festas', icon: 'celebration', route: '/party'},
                    {title: 'Cardápios', icon: 'menu_book', route: '/party-menu'},
                    // {title: 'Produtos', icon: 'inventory', route: '/products'},
                    {title: 'Caixa / Vendas', icon: 'shopping_cart', route: '/sales'},
                ],
                financialItems: [
                    {title: 'Patrocinadores', icon: 'add_business', route: '/financial/sponsors'},
                    {title: 'Orçamentos', icon: 'shopping_bag', route: '/financial/budgets'},
                    {title: 'Livro contábil', icon: 'payments', route: '/financial/financials'},
                ],
            };
        },
        methods: {
            routeGo(route) {
                this.$router.push({path: route.route, params: {item: route.name}})
            }
        },
        computed: {
            drawerModel: {
                get() {
                    return this.$store.getters.getDrawer;
                },
                set(){}
            },
            user() {
                return this.$store.getters.getUser;
            },
        }
    }
</script>

