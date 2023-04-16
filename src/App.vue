<template>
    <div>
        <v-app id="app">

            <navigation-drawer></navigation-drawer>
            <app-bar></app-bar>
            <content-component></content-component>

        </v-app>
    </div>
</template>

<script>

    import AppBar from "@/components/layouts/app-bar.vue";
    import NavigationDrawer from "@/components/layouts/navigation-drawer.vue";
    import ContentComponent from "@/components/layouts/content-component.vue";

    export default {
        name: "App",
        components: {
            AppBar,
            NavigationDrawer,
            ContentComponent
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
</style>
