<template>

    <div>
        <v-card>

            <v-card-title>
                Movimentação bancária

                <v-spacer></v-spacer>

    <!--            <v-btn class="primary" @click="goBack">Voltar</v-btn>-->
                <v-btn text icon @click="goBack">
                    <v-icon>
                        undo
                    </v-icon>
                </v-btn>
                <v-btn class="primary" @click="add"> Adicionar </v-btn>

                <template>
                    <div class="text-center">
                        <v-menu offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    text
                                    v-bind="attrs"
                                    v-on="on"
                                    icon>
                                    <v-icon>more_vert</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-title @click="addCategory">Adicionar categoria</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                </template>


            </v-card-title>

            <v-container>
                <v-row>
                    <v-col>
                        <v-card shaped>
                            <v-card-title>Lucro</v-card-title>
                            <v-card-text style="text-align: end; font-size: large">
                                <p v-for="item in reportItems['profit']">
                                    <span >
                                        {{item.name}} ... R$ {{item.positive}}
                                    </span>
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card shaped>
                            <v-card-title>Despesas</v-card-title>
                            <v-card-text style="text-align: end; font-size: large">
                                <p v-for="item in reportItems['loss']">
                                    <span >
                                        {{item.name}} ... R$ {{item.positive}}
                                    </span>
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card shaped>
                            <v-card-title>Em análise</v-card-title>
                            <v-card-text style="text-align: end; font-size: large">
                                <p v-for="item in reportItems['on_review']">
                                    <span >
                                        {{item.name}} ... R$ {{item.positive}}
                                    </span>
                                </p>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>

            <v-card-text>

                <v-data-table
                    :headers="datatable.headers"
                    :items="datatable.items"
                >

                    <template v-slot:item.value="{item}">
                        <span :style="{ color: item.value > 0 ? 'green' : 'red' }">
                            R$ {{ item.value.toLocaleString("en",{useGrouping: false,minimumFractionDigits: 2}) }}
                        </span>
                    </template>

                    <template v-slot:item.status="{ item }">
                        <v-chip :color="getStatus(item.status).color" style="color:#000;">
                            {{ getStatus(item.status).name  }}
                        </v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }" v-if="item.status === 'Open'">
                                <v-btn icon v-on="on" @click="">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="">
                                    <v-icon>check_circle</v-icon>
                                </v-btn>
                            </template>
                            <span>Aprovar</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="">
                                    <v-icon>cancel</v-icon>
                                </v-btn>
                            </template>
                            <span>Rejeitar</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }" v-if="(item.status !== 'On review')">
                                <v-btn icon v-on="on" @click="">
                                    <v-icon>lock</v-icon>
                                </v-btn>
                            </template>
                            <span>Revisar</span>
                        </v-tooltip>

                    </template>

                </v-data-table>

            </v-card-text>

        </v-card>

        <v-dialog v-model="modal.status" v-if="modal.status" persistent width="60%">
            <transactions-add @close="closeModal" :financialId="$route.params.id"/>
        </v-dialog>

        <v-dialog v-model="modalCategories.status" v-if="modalCategories.status" persistent width="60%">
            <categories-add @close="closeCategoryModal" :financialId="$route.params.id"/>
        </v-dialog>

    </div>

</template>

<script>

    import Service from "@/service";
    import FinancialStatus from "@/constants/financial-status";
    import TransactionStatus from "@/constants/transaction-status";
    import TransactionsAdd from "@/views/financial/transactions/transactions-add.vue";
    import CategoriesAdd from "@/views/financial/categories/categories-add.vue";

    export default {
        name: 'Transactions',
        components: {CategoriesAdd, TransactionsAdd},
        data() {
            return {
                path: 'transactions',
                datatable: {
                    headers: [
                        {text: 'Nome', value: 'name'},
                        {text: 'Descrição', value: 'description'},
                        {text: 'Categoria', value: 'categories.name'},
                        {text: 'Valor', value: 'value'},
                        {text: 'Status', value: 'status'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: []
                },
                transactionStatus: TransactionStatus,
                reportItems: [],
                modal: {
                    status: false
                },
                modalCategories: {
                    status: false
                }

            }
        },
        methods: {
            getData() {
                Service.get(this.path, {financial_id: this.$route.params.id}).then((res) => {
                   this.datatable.items = res.data.data;
                });
            },
            getTransactionReport()
            {
                Service.get('transactions/report', {financial_id: this.$route.params.id}).then((res) => {
                    this.reportItems = res.data.data;
                    // this.datatable.items = res.data.data;
                });
            },
            getStatus (status) {
                return this.transactionStatus.find((item) => item.value === status);
            },
            goBack() {
                this.$router.push({name: 'Financials'});
            },
            add() {
                this.modal.status = true;
            },
            closeModal(res) {
                if(res) {
                    this.getData();
                }
                this.modal.status = false;
            },
            addCategory() {
                this.modalCategories.status = true;
            },
            closeCategoryModal(res) {
                if(res) {
                    // this.getData();
                }
                this.modalCategories.status = false;
            }
        },
        mounted() {
            this.getData();
            // this.getTransactionReport();
        }
    }

</script>
