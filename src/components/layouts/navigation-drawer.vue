<template>

    <v-navigation-drawer app v-model="drawerModel">

        <v-img :src="logo" alt="logo canie" :eager="true"></v-img>

        <v-list>
            <v-list-item v-for="item in items" :key="item.title" link>

               <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>

            </v-list-item>
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
                    {title: 'Inicio', icon: 'house'},
                    {title: 'Festas', icon: 'celebration'},
                    {title: 'Financeiro', icon: 'attach_money'},
                    {title: 'Vendas', icon: 'shopping_cart'},
                ],
            };
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

