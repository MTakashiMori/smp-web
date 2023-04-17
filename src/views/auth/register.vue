<template>

    <v-card>

        <v-card-title>Cadastre-se abaixo</v-card-title>

        <v-card-text>

            <v-textfield label="Email"></v-textfield>
            <v-textfield label="Senha"></v-textfield>

        </v-card-text>

         <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="warning">Ajuda</v-btn>
            <v-btn class="secondary" @click="$router.push('/auth/login')">Já tenho login</v-btn>
            <v-btn class="primary">Criar meu cadastro</v-btn>
        </v-card-actions>

    </v-card>

</template>

<script>

    export default {
        name: 'register'
    }

</script>
