<template>

    <div>
        <v-card>

            <v-card-title>
                Transação
                <v-spacer></v-spacer>
                <v-btn icon @click="close">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>

                <v-form ref="transactionAdd">

                    <v-container>

                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Nome"
                                    v-model="model.name"
                                    required
                                    :rules=rules.required>
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Descrição"
                                    v-model="model.description"
                                    required
                                    :rules=rules.required>
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <v-autocomplete
                                    label="Categoria"
                                    v-model="model.financial_categories_id"
                                    :items="categories"
                                    required
                                    :rules=rules.required
                                ></v-autocomplete>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col>
                                <money v-model="model.value" v-bind="money" aria-label="Valor"></money>
<!--                                <v-text-field-->
<!--                                    label="Valor"-->
<!--                                    v-model="model.value"-->
<!--                                    required-->
<!--                                    :rules=rules.required>-->
<!--                                </v-text-field>-->
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
    import {Money} from "v-money";

    export default {
        name: 'TransactionsAdd',
        components: {Money},
        props: {
            financialId: String
        },
        data() {
            return {
                path: 'transactions',
                categoriesPath: 'financial-categories',
                categories: [],
                model: {
                    name: '',
                    description: '',
                    financial_categories_id: '',
                    value: '',
                    financial_id: this.financialId
                },
                rules: {
                    required: [
                        v => !!v || 'Este item é obrigatório'
                    ]
                },
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: 'R$ ',
                    precision: 2,
                    masked: false
                }
            }
        },
        methods: {
            close() {
                this.$refs.transactionAdd.reset();
                this.$emit('close', false);
            },
            save() {
                if(!this.$refs.transactionAdd.validate()){
                    //ADD NOTIFY
                    return;
                }
                Service.save(this.path, this.model).then((res) => {
                    console.log('created', res);
                    this.$refs.transactionAdd.reset();
                    this.$emit('close', true);
                });
            },
            getCategories() {
                Service.get(this.categoriesPath, {financial_id: this.financialId}).then((res) => {
                    this.categories = res.data.data.map(function (item) {
                        return {text: item.name, value: item.id};
                    });
                });
            }
        },
        mounted() {
            this.getCategories();
        }
    }

</script>