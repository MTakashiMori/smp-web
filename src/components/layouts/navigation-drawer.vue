<template>

    <v-navigation-drawer app v-model="drawerModel">

        <v-img :src="logo" alt="logo canie" :eager="true"></v-img>

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
                    {title: 'Festas', icon: 'celebration', route: '/'},
                    {title: 'Vendas', icon: 'shopping_cart', route: '/'},
                    {title: 'Visão vendas - Cachorro-quente', icon: 'visibility', route: '/sales', name: 'Cachorro-quente'},
                    {title: 'Visão vendas - Bebidas', icon: 'visibility', route: '/sales', name: 'Bebidas'},
                    {title: 'Visão vendas - Pastel', icon: 'visibility', route: '/sales', name: 'Pastel'},
                    // {title: 'Visão Barraca', icon: 'visibility', route: '/sells', name: ''},
                ],
                financialItems: [
                    {title: 'Patrocinadores', icon: 'add_business', route: '/financial/sponsors'},
                    {title: 'Orçamentos', icon: 'shopping_bag', route: '/financial/budgets'},
                    {title: 'Movimentações', icon: 'payments', route: '/financial/banking-movement'},
                ]
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
            }
        }
    }
</script>

