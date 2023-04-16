<template>
    <v-content>

        <v-container fluid>

            <!-- <v-overlay v-model="loading" z-index="2"></v-overlay> -->

            <transition name="fade">
                <keep-alive>
                    <router-view :key="this.$route.fullPath"></router-view>
                </keep-alive>
            </transition>

        </v-container>

    </v-content>
</template>

<script>

    export default {
        name: 'content-component',
    }
</script>

<style>

    h1, h2, h3, h6, p, span, div {
        font-family: 'Montserrat', sans-serif;
    }

    .fade-enter-active, .fade-leave-active {
        transition-property: opacity;
        transition-duration: .25s;
    }

    .fade-enter-active {
        transition-delay: .25s;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

    .rounded {
        border-radius: 10px;
    }

    label span {
        color: red;
    }

    .card-actions-padding {
        padding-right: 1%;
    }

    .text-subtitle {
        font-size: .875rem;
    }

    .item-title {
        padding-left: 3%;
        margin-top: auto;
        margin-bottom: auto;
    }
    .item-content {
        padding-right: 3%;
    }

</style>
