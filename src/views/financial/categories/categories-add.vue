<template>

    <div>
        <v-card>

            <v-card-title>
                Categoria Financeira
                <v-spacer></v-spacer>
                <v-btn icon @click="close">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>

                <v-form ref="financialCategoriesForm" @submit.prevent="save">

                    <v-container>

                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Nome"
                                    v-model="model.name"
                                    required
                                    :rules=rules.required
                                    autofocus>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-form>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close">Cancelar</v-btn>
                <v-btn class="primary" type="submit">Salvar</v-btn>
            </v-card-actions>

        </v-card>
    </div>

</template>

<script>

import Service from "@/service";

export default {
    name: 'CategoriesAdd',
    props: {
        financialId: String
    },
    data() {
        return {
            path: 'financial-categories',
            model: {
                name: '',
                financial_id: this.financialId
            },
            rules: {
                required: [
                    v => !!v || 'Este item é obrigatório'
                ]
            }
        }
    },
    methods: {
        close() {
            this.$refs.financialCategoriesForm.reset();
            this.$emit('close', false);
        },
        save() {
            if(!this.$refs.financialCategoriesForm.validate()){
                //ADD NOTIFY
                return;
            }
            Service.save(this.path, this.model).then((res) => {
                console.log('created', res);

                this.$refs.financialCategoriesForm.reset();
                this.$emit('close', true);
            });
        },
    },
}

</script>