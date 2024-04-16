<template>

    <v-container class="d-flex justify-center">
        <v-card style="width: 60%;">

            <v-card-title>
                <h2>Bem vindo, faça o login abaixo</h2>
            </v-card-title>

            <v-card-text>

                <v-row>
                    <v-col cols="5" class="d-flex justify-center align-center">
                        <img :src="logo" alt="Avatar" style="border-radius: 50%; max-width: 70%">
                    </v-col>
                    <v-col>
                        <v-form @submit.prevent="login" ref="loginForm" lazy-validation>
                            <v-text-field
                                autofocus
                                v-model="model.email"
                                :rules="rules.email"
                                label="Email"
                            ></v-text-field>

                            <v-text-field
                                v-model="model.password"
                                :rules="rules.password"
                                label="Senha"
                            ></v-text-field>

                            <div style="text-align: end">
                                <v-btn class="warning btn-margin" @click="help">Ajuda</v-btn>
                                <v-btn class="secondary btn-margin" @click="$router.push('/auth/register')">Registrar</v-btn>
                                <v-btn class="primary" color="green" type="submit">Login</v-btn>
                            </div>
                        </v-form>

                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>

</template>

<script>

    import Service from "@/service";
    import Cookies from "js-cookie";
    import logo from "@/assets/smp-logo.png";

    export default {
        name: 'login',
        data() {
            return {
                path: '',
                model: {
                    email: '',
                    password: '',
                },
                logo: logo,
                rules: {
                    email: [
                        v => !!v || 'Email é obrigatório',
                        v => /.+@.+\..+/.test(v) || 'Não é um email válido',
                    ],
                    password: [
                        v => !!v || 'A senha é obrigatória',
                    ]
                }
            }
        },
        methods: {
            login() {
                if(!this.$refs.loginForm.validate()) {
                    return;
                }
                Service.login(this.model).then((res) => {
                    Cookies.set('smp_token', res.data.access_token);
                    this.$store.dispatch('setUser', {user: res.data.data});
                    this.$store.dispatch('notify', {
                        'message': 'Bem vindo ' + res.data.data.name,
                        'type': 'success'
                    })
                    this.$router.push({name: 'home'});
                });
            },
            help() {}
        },
        mounted() {
            Cookies.remove('smp_token');
        }
    }

</script>

<style>
    .btn-margin {
        margin-right: 2%;
    }
</style>
