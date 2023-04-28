<template>

<div>
    <v-card>

        <v-card-title>
            Patrocinadores

            <v-spacer></v-spacer>

            <v-btn class="primary">Adicionar</v-btn>
        </v-card-title>

        <v-card-text>

            <v-data-table
                :headers="datatable.headers"
                :items="datatable.items"
            >

                <template v-slot:item.sponsored_events="{ item }">
                    {{ item.sponsored_events.join(', ') }}
                </template>

                <template v-slot:item.actions="{ item }">

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Remover</span>
                    </v-tooltip><!-- rate by business -->

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>edit</v-icon>
                            </v-btn>
                        </template>
                        <span>Editar</span>
                    </v-tooltip><!-- rate by business -->

                    <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="">
                                <v-icon>contact_phone</v-icon>
                            </v-btn>
                        </template>
                        <span>Contato</span>
                    </v-tooltip><!-- rate by business -->

                </template>

            </v-data-table>

        </v-card-text>


    </v-card>
</div>


</template>

<script>

    export default {
        name: 'Sponsors',
        data() {
            return {
                datatable: {
                    headers: [
                        {text: 'Nome', value: 'name'},
                        {text: 'Telefone', value: 'telephone'},
                        {text: 'Evento patrocinadas', value: 'sponsored_events'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: [
                        {name: 'Dispar autopeças', telephone: '(61) 9 9876 5432', sponsored_events: ['Festa Junina SMP - 2022', 'Costelão SMP - 2022', 'Baile SMP - 2022']},
                        {name: 'Farmanossa', telephone: '(61) 9 9876 5432', sponsored_events: ['Festa Junina SMP - 2022', 'Costelão SMP - 2022', 'Baile SMP - 2022']},
                        {name: 'Boka Loka', telephone: '(61) 9 9876 5432', sponsored_events: ['Festa Junina SMP - 2022', 'Costelão SMP - 2022', 'Baile SMP - 2022']},
                        {name: 'Menina Rica', telephone: '(61) 9 9876 5432', sponsored_events: ['Festa Junina SMP - 2022']},
                    ]
                }
            }
        }
    }

</script>
