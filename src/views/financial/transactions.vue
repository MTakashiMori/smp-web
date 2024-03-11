<template>

<div>
    <v-card>

        <v-card-title>
            Movimentação bancária

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

                <template v-slot:item.type="{ item }">
                    <v-chip :color="getType(item.type).color">
                        {{ getType(item.type).name  }}
                    </v-chip>
                </template>

                <!-- <template v-slot:item.actions="{ item }"> -->


<!--
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }" v-if="item.status == 'pending'">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </template>
                        <span>Editar</span>
                    </v-tooltip> -->

                     <!-- <v-tooltip bottom>
                        <template v-slot:activator="{ on }" v-if="item.status == 'pending'">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>highlight_off</v-icon>
                            </v-btn>
                        </template>
                        <span>Rejeitar</span>
                    </v-tooltip> -->

                     <!-- <v-tooltip bottom>
                        <template v-slot:activator="{ on }" v-if="item.status == 'pending'">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>check_circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Aprovar</span>
                    </v-tooltip> -->

                    <!-- <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>contact_phone</v-icon>
                            </v-btn>
                        </template>
                        <span>Contato</span>
                    </v-tooltip> -->

                <!-- </template> -->

            </v-data-table>

        </v-card-text>


    </v-card>
</div>


</template>

<script>

    import * as bankingMovement from '@/constants/banking-movement-type.js';

    export default {
        name: 'Transactions',
        data() {
            return {
                datatable: {
                    headers: [
                        {text: 'Nome', value: 'name'},
                        {text: 'Tipo', value: 'type'},
                        {text: 'Valor', value: 'price'},
                        {text: 'Data/Hora', value: 'created_at'},
                        // {text: '', value: 'actions', align: 'end'},
                    ],
                    items: [
                        {name: 'Patrocinio - Dispar', type: 'add', price: '5.000', created_at: '2023-04-01' },
                        {name: 'Patrocinio - Farmanossa', type: 'add', price: '2.000', created_at: '2023-04-01' },
                        {name: 'Patrocinio - Boka Loka', type: 'add', price: '5.000', created_at: '2023-04-01' },
                        {name: 'Patrocinio - Requint', type: 'add', price: '10.000', created_at: '2023-04-01' },
                        {name: 'Pagamento Palco', type: 'remove', price: '10.000', created_at: '2023-04-02' },
                    ]
                },
                bankingMovement: bankingMovement
            }
        },
        methods: {
            getType (status) {
                return this.bankingMovement.default.find((item) => item.value == status);
            },
        }
    }

</script>
