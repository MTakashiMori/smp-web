<template>

    <v-container fluid>
        <!-- <transition name="fade"> -->
            <!-- <keep-alive> -->
                <router-view :key="this.$route.fullPath"></router-view>
            <!-- </keep-alive> -->
        <!-- </transition> -->
    </v-container>

</template>

<script>

    export default {
        name: 'content-component'
    }
</script>

