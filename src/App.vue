<template>
    <v-app id="app">

        <navigation-drawer></navigation-drawer>
        <app-bar></app-bar>
        <v-main>
            <v-content>
                <content-component></content-component>
            </v-content>
        </v-main>

        <Footer></Footer>

    </v-app>
</template>

<script>

    import AppBar from "@/components/layouts/app-bar.vue";
    import NavigationDrawer from "@/components/layouts/navigation-drawer.vue";
    import ContentComponent from "@/components/layouts/content-component.vue";
    import Footer from "@/components/layouts/footer.vue";

    export default {
        name: "App",
        components: {
            AppBar,
            NavigationDrawer,
            ContentComponent,
            Footer
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
</style>
