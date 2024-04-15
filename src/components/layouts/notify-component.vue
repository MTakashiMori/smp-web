<template>
    <div>
        <v-snackbar bottom v-model="$store.getters.getNotify.status">
            {{ $store.getters.getNotify.message }}
        </v-snackbar>
    </div>
</template>

<script>

    export default {
        name: 'notify-component',
    }
</script>
