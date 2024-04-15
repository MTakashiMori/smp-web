<template>

<div>
    <v-card>

        <v-card-title>
            Movimentação bancária

            <v-spacer></v-spacer>

            <v-btn class="primary" @click="goBack">Voltar</v-btn>
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
</div>


</template>

<script>

    import Service from "@/service";
    import FinancialStatus from "@/constants/financial-status";
    import TransactionStatus from "@/constants/transaction-status";

    export default {
        name: 'Transactions',
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
                reportItems: []
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
            }
        },
        mounted() {
            this.getData();
            this.getTransactionReport();
        }
    }

</script>
