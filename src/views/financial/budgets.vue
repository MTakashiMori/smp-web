<template>

<div>
    <v-card>

        <v-card-title>
            Orçamentos

            <v-spacer></v-spacer>

            <v-btn class="primary">Adicionar</v-btn>
        </v-card-title>

        <v-card-text>

            <v-data-table
                :headers="datatable.headers"
                :items="datatable.items"
            >

                <template v-slot:item.price="{ item }">
                    R$ {{ item.price }}
                </template>

                <template v-slot:item.status="{ item }">
                    <v-chip :color="getStatus(item.status).color">
                        {{ getStatus(item.status).name  }}
                    </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">



                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }" v-if="item.status == 'pending'">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </template>
                        <span>Editar</span>
                    </v-tooltip>

                     <v-tooltip bottom>
                        <template v-slot:activator="{ on }" v-if="item.status == 'pending'">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>highlight_off</v-icon>
                            </v-btn>
                        </template>
                        <span>Rejeitar</span>
                    </v-tooltip>

                     <v-tooltip bottom>
                        <template v-slot:activator="{ on }" v-if="item.status == 'pending'">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>check_circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Aprovar</span>
                    </v-tooltip>

                    <!-- <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>contact_phone</v-icon>
                            </v-btn>
                        </template>
                        <span>Contato</span>
                    </v-tooltip> -->

                </template>

            </v-data-table>

        </v-card-text>


    </v-card>
</div>


</template>

<script>

    import * as budgetsColors from '@/constants/budgets-status.js';

    export default {
        name: 'Budgets',
        data() {
            return {
                datatable: {
                    headers: [
                        {text: 'Nome', value: 'name'},
                        {text: 'Responsável', value: 'person'},
                        {text: 'Evento', value: 'event'},
                        {text: 'Valor', value: 'price'},
                        {text: 'Status', value: 'status'},
                        {text: 'Data/Hora', value: 'create_at'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: [
                        {name: 'Palco - Empresa A', person: 'Jeferson', event: 'Festa Junina SMP 2023', price: '10.500', status: 'approved', create_at: '2023-04-26'},
                        {name: 'Palco - Empresa B', person: 'Jeferson', event: 'Festa Junina SMP 2023', price: '12.000', status: 'declined', create_at: '2023-04-26'},
                        {name: 'Palco - Empresa C', person: 'Jeferson', event: 'Festa Junina SMP 2023', price: '9.000', status: 'declined', create_at: '2023-04-26'},
                        {name: 'Seguranças Draco', person: 'Marciano', event: 'Festa Junina SMP 2023', price: '5.000', status: 'approved', create_at: '2023-04-26'},
                        {name: 'Wesley Safadão', person: 'Marcelo', event: 'Festa Junina SMP 2023', price: '3.000', status: 'pending', create_at: '2023-04-26'},
                        {name: 'Touro mecânico', person: 'Marcelo', event: 'Festa Junina SMP 2023', price: '3.000', status: 'pending', create_at: '2023-04-26'},
                        {name: 'Fogos de artifício', person: 'Marcelo', event: 'Festa Junina SMP 2023', price: '3.000', status: 'pending', create_at: '2023-04-26'},
                    ]
                },
                budgetsColors: budgetsColors
            }
        },
        methods: {
            getStatus (status) {
                return this.budgetsColors.default.find((item) => item.value == status);
            },
        }
    }

</script>
