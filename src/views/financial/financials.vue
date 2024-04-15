<template>

    <div>
        <v-card>

            <v-card-title>
                Livros contábeis

<!--                <v-spacer></v-spacer>-->

<!--                <v-btn class="primary">Adicionar</v-btn>-->
            </v-card-title>

            <v-card-text>

                <v-data-table
                    :headers="datatable.headers"
                    :items="datatable.items"
                >

                    <template v-slot:item.status="{ item }">
                        <v-chip :color="getStatus(item.status).color">
                            {{ getStatus(item.status).name  }}
                        </v-chip>
                    </template>

                    <template v-slot:item.actions="{ item }">

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }" v-if="item.status === 'Open'">
                                <v-btn icon v-on="on" @click="goToTransactions(item)">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
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

    export default {
        name: 'Financials',
        data() {
            return {
                path: 'financial',
                datatable: {
                    headers: [
                        {text: 'Festa', value: 'party.name'},
                        {text: 'Status', value: 'status'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: [

                    ]
                },
                financialStatus: FinancialStatus
            }
        },
        methods: {
            getData() {
                Service.get(this.path).then((res) => {
                    this.datatable.items = res.data.data;
                });
            },
            getStatus (status) {
                return this.financialStatus.find((item) => item.value === status);
            },
            goToTransactions(item) {
                this.$router.push({name: 'Transactions', params: {id: item.id}});
            }
        },
        mounted() {
            this.getData();
        }
    }

</script>
