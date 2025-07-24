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
                                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="model.date" label="Data"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker v-model="model.date" scrollable >
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
    name: 'Products-add',
    data() {
        return {
            path: 'sponsor',
            modal: false,
            model: {
                name: null,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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