<template>

    <div>
        <v-card>

            <v-card-title>
                Patrocinador
                <v-spacer></v-spacer>
                <v-btn icon @click="close">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>

                <v-form ref="sponsorAdd">

                    <v-container>

                        <v-row>
                            <v-col>
                                <v-text-field label="Nome" v-model="model.name" required :rules=rules.required></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field label="Telefone" v-model="model.telephone" required :rules=rules.required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Pessoa de referência" v-model="model.reference"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field label="Endereço" v-model="model.address" required :rules=rules.required></v-text-field>
                            </v-col>
                        </v-row>

                    </v-container>

                </v-form>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close">Cancelar</v-btn>
                <v-btn class="primary" @click="save">Salvar</v-btn>
            </v-card-actions>

        </v-card>
    </div>

</template>

<script>

    import Service from "@/service";

    export default {
        name: 'sponsors-add',
        data() {
            return {
                path: 'sponsor',
                model: {
                    name: null,
                    telephone: null,
                    reference: null,
                    address: null
                },
                rules: {
                    required: [
                        v => !!v || 'Este item é obrigatório'
                    ]
                }
            }
        },
        methods: {
            save() {
                if(!this.$refs.sponsorAdd.validate()){
                    //ADD NOTIFY
                    return;
                }
                Service.save(this.path, this.model).then((res) => {
                    console.log('created', res);
                    this.$refs.sponsorAdd.reset();
                    this.$emit('close', true);
                });

            },
            close()
            {
                this.$refs.sponsorAdd.reset();

                this.$emit('close', false);
            },
        }
    }

</script>