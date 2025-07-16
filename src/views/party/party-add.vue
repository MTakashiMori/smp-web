<template>

    <div>
        <v-card>

            <v-card-title>
                Festa
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
                                <v-dialog ref="dialog" v-model="modal" :return-value.sync="model.date" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="dateRangeText" label="Data"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="model.date" scrollable range >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="modal = false"> Cancelar </v-btn>
                                        <v-btn text color="primary" @click="$refs.dialog.save(model.date)"> OK </v-btn>
                                    </v-date-picker>
                                </v-dialog>
                            </v-col>
                            <v-col>
                                <v-text-field label="Pessoa de referência" v-model="model.reference"></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field label="Endereco" v-model="model.address.address" required :rules=rules.required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field label="Complemento" v-model="model.address.complement"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="CEP" v-model="zipcode" required :rules=rules.required v-mask="'#####-###'"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field label="Bairro" v-model="model.address.neighborhood" required :rules=rules.required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Cidade" v-model="model.address.city" disabled required :rules=rules.required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field label="Cidade" v-model="model.address.uf" disabled required :rules=rules.required></v-text-field>
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
    name: 'party-add',
    data() {
        return {
            path: 'party',
            modal: false,
            model: {
                name: null,
                date: [],
                reference: null,
                address: {
                    address: null,
                    complement: '',
                    cep: '',
                    neighborhood: '',
                    city: '',
                    uf: ''
                }
            },
            zipcode: '',
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
            this.model.start_date = this.model.date[0];
            this.model.end_date = this.model.date[1];
            delete(this.model.date);

            Service.save(this.path, this.model).then((res) => {
                this.$refs.sponsorAdd.reset();
                this.$emit('close', true);
            });

        },
        close() {
            this.$refs.sponsorAdd.reset();

            this.$emit('close', false);
        },
        getAddress(zipcode) {
            if(zipcode.length <= 8) {
                return;
            }
            Service.getAddressByZipCode(zipcode).then((res) => {
                this.model.address = {
                    address: res.data.logradouro,
                    complement: res.data.complemento,
                    cep: res.data.cep,
                    neighborhood: res.data.bairro,
                    city: res.data.localidade,
                    uf: res.data.uf
                }
            });
        }
    },
    watch: {
        zipcode() {
            this.getAddress(this.zipcode)
        }
    },
    computed: {
        dateRangeText () {
            return this.model.date.join(' ~ ');
        },
    },
}

</script>