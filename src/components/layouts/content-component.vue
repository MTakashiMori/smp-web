<template>

    <v-container fluid>
        <!-- <transition name="fade"> -->
            <!-- <keep-alive> -->
                <router-view :key="this.$route.fullPath"></router-view>
            <!-- </keep-alive> -->
        <!-- </transition> -->

        <notify-component></notify-component>

    </v-container>

</template>

<script>

    import NotifyComponent from "@/components/layouts/notify-component.vue";

    export default {
        name: 'content-component',
        components: {NotifyComponent}
    }
</script>

