<template>

    <v-card>

        <v-card-title>Faça o Login abaixo</v-card-title>

        <v-card-text>

            <v-text-field label="Email"></v-text-field>
            <v-text-field label="Senha"></v-text-field>

        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning">Ajuda</v-btn>
            <v-btn class="secondary" @click="$router.push('/auth/register')">Registrar</v-btn>
            <v-btn class="primary">Login</v-btn>
        </v-card-actions>

    </v-card>

</template>

<script>

    export default {
        name: 'login'
    }

</script>
