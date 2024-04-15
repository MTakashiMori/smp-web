<template>

    <v-container>
        <v-card>

            <v-card-title>
                <h2>Bem vindo, faça o login abaixo</h2>
            </v-card-title>

            <v-card-text>

                <v-row>
                    <v-col cols="5" style="text-align: center">
                        <img :src="logo" alt="Avatar" style="border-radius: 50%; max-width: 70%">

                    </v-col>
                    <v-col>
                        <v-text-field
                            autofocus
                            v-model="model.email"
                            label="Email"
                        ></v-text-field>


                        <v-text-field
                            v-model="model.password"
                            label="Senha"
                        ></v-text-field>

                        <div style="text-align: end">
                            <v-btn class="warning btn-margin">Ajuda</v-btn>
                            <v-btn class="secondary btn-margin" @click="$router.push('/auth/register')">Registrar</v-btn>
                            <v-btn class="primary" color="green" @click="login">Login</v-btn>
                        </div>
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
            }
        },
        methods: {
            login() {
                Service.login(this.model).then((res) => {
                    Cookies.set('smp_token', res.data.access_token);
                    this.$store.dispatch('setUser', {user: res.data.data});
                    this.$router.push({name: 'home'});
                });
            }
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
