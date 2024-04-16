<template>

    <v-container class="d-flex justify-center">
        <v-card style="width: 60%;">

            <v-card-title>
                <h1>Perfil</h1>

                <v-spacer></v-spacer>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="editAction()">
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </template>
                    <span>Editar perfil</span>
                </v-tooltip><!-- rate by business -->
                <v-btn class="primary" @click="$router.go(-1)">Voltar</v-btn>
            </v-card-title>

            <v-card-text>

                <v-row>
                    <v-col cols="3" class="d-flex justify-center align-center">
                        <img :src="logo" alt="Avatar" style="max-width: 100%; max-height: 100%">
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Nome"
                            :disabled="!edit"
                            v-model="model.name"
                        ></v-text-field>

                        <v-text-field
                            label="Email"
                            :disabled="!edit"
                            v-model="model.email"
                        ></v-text-field>

                        <v-text-field
                            label="Telefone"
                            :disabled="!edit"
                        ></v-text-field>

                        <v-text-field
                            label="Endereço"
                            :disabled="!edit"
                        ></v-text-field>

                    </v-col>
                </v-row>

            </v-card-text>

            <v-card-actions v-if="edit">
                <v-spacer></v-spacer>
                <v-btn text @click="editAction">Cancelar</v-btn>
                <v-btn class="primary" color="green" type="submit">Salvar</v-btn>
            </v-card-actions>

        </v-card>

    </v-container>

</template>

<script>

    import defaultUserImage from '../../assets/default-user.jpg';
    import Service from "@/service";

    export default {
        name: 'profile',
        data() {
            return {
                logo: defaultUserImage,
                edit: false,
                model: {
                    name: '',
                    email: '',
                    telephone: '',
                    address: ''
                }
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser.user;
            },
        },
        methods: {
            editAction() {
                this.edit = !this.edit;
            },
        },
        mounted() {
            Service.getUser().then((res) => {
                const user = res.data.data;
                this.model.name = user.name;
                this.model.email = user.email;
            });
        }
    }

</script>