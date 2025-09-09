<template>
    <v-app id="app">

        <navigation-drawer></navigation-drawer>
        <app-bar></app-bar>
            <v-main>
                <v-overlay :value="isLoading" absolute></v-overlay>
                <content-component></content-component>

            </v-main>

<!--        <FooterComponent></FooterComponent>-->

    </v-app>
</template>

<script>

    import Cookies from "js-cookie";
    import AppBar from "@/components/layouts/app-bar.vue";
    import NavigationDrawer from "@/components/layouts/navigation-drawer.vue";
    import ContentComponent from "@/components/layouts/content-component.vue";
    import FooterComponent from "@/components/layouts/footer-component.vue";
    import Service from "@/service";

    export default {
        name: "App",
        components: {
            AppBar,
            NavigationDrawer,
            ContentComponent,
            FooterComponent
        },
        mounted() {
            const token = Cookies.get('smp_token');
            if(token) {
                Service.getUser().then((res) => {
                    this.$store.dispatch('setUser', {user: res.data.data});
                });
            }
        },
        computed: {
            isLoading: {
                get() {
                    return this.$store.getters.getIsLoading;
                },
                set(){}
            },
        }
    };

</script>

<style lang="scss">
    #app {
        font-family: "Roboto", sans-serif;
        // -webkit-font-smoothing: antialiased;
        // -moz-osx-font-smoothing: grayscale;
        // text-align: center;
        // color: #2c3e50;
    }

    .v-content {
        // padding: 0 0 0 0 !important;
    }

    .anychart-credits-text {
        visibility: hidden;
    }
    .anychart-credits-logo {
        visibility: hidden;
    }

    .button-section {
        white-space: nowrap;
    }
</style>
