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

            <v-form @submit.prevent="save" ref="profileForm" lazy-validation>

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
                                :rules="rules.item"
                            ></v-text-field>

                            <v-text-field
                                label="Email"
                                :disabled="!edit"
                                v-model="model.email"
                                :rules="rules.email"
                            ></v-text-field>

                            <v-text-field
                                label="CPF"
                                :disabled="!edit"
                                v-model="model.cpf"
                                :rules="rules.item"
                                v-mask="'###.###.###-##'"
                            ></v-text-field>

                            <v-text-field
                                label="Telefone"
                                :disabled="!edit"
                                v-model="model.telephone"
                                :rules="rules.item"
                                v-mask="'(##) # ####-####'"
                            ></v-text-field>

                            <v-text-field
                                label="Endereço"
                                :disabled="!edit"
                                v-model="model.address"
                            ></v-text-field>

                        </v-col>
                    </v-row>

                </v-card-text>

                <v-expand-transition>
                    <v-card-actions v-show="edit">
                        <v-spacer></v-spacer>
                        <v-btn text @click="editAction">Cancelar</v-btn>
                        <v-btn class="primary" color="green" type="submit">Salvar</v-btn>
                    </v-card-actions>
                </v-expand-transition>

            </v-form>

        </v-card>

    </v-container>

</template>

<script>

    import defaultUserImage from '../../assets/default-user.jpg';
    import Service from "@/service";
    import Cookies from "js-cookie";

    export default {
        name: 'profile',
        data() {
            return {
                logo: defaultUserImage,
                edit: false,
                model: {
                    id: '',
                    name: '',
                    email: '',
                    cpf: '',
                    telephone: '',
                    address: ''
                },
                rules: {
                    email: [
                        v => !!v || 'Email é obrigatório',
                        v => /.+@.+\..+/.test(v) || 'Não é um email válido',
                    ],
                    item: [
                        v => !!v || 'Este item é obrigatória',
                    ]
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
            save() {
                if(!this.$refs.profileForm.validate()) {
                    return;
                }
                Service.save('user', this.model, this.model.id).then((res) => {
                    this.getUser(true);
                    this.editAction();
                });
            },
            getUser(updateToken = false) {
                Service.getUser().then((res) => {

                    if(updateToken) {
                        this.$store.dispatch('setUser', {user: res.data.data});
                    }

                    const user = res.data.data;
                    this.model.id = user.id;
                    this.model.name = user.name;
                    this.model.email = user.email;
                    this.model.cpf = user.cpf;
                    this.model.telephone = user.telephone;
                    this.model.address = user.address;


                });
            }
        },
        mounted() {
            this.getUser();
        }
    }

</script>