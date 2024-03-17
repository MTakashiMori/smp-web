<template>

    <div>
        <v-card>

            <v-card-title>
                Festas

                <v-spacer></v-spacer>

                <v-btn class="primary" @click="addOrEdit">Adicionar</v-btn>
            </v-card-title>

            <v-card-text>

                <v-data-table
                    :headers="datatable.headers"
                    :items="datatable.items">
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

        <v-dialog v-model="modal.status" persistent width="60%">
            <party-add @close="closeModal"/>
        </v-dialog>

    </div>

</template>

<script>

import PartyAdd from "@/views/party/party-add.vue";
import Service from "@/service";

export default {
    name: 'Party',
    components: {PartyAdd},
    data() {
        return {
            path: 'sponsor',
            datatable: {
                headers: [
                    {text: 'Nome', value: 'name'},
                    {text: 'Data', value: 'date'},
                    {text: 'Endereço', value: 'address'},
                    {text: '', value: 'actions', align: 'end'},
                ],
                items: []
            },
            modal: {
                status: false
            }
        }
    },
    methods: {
        get() {
            Service.get(this.path).then((res) => {
                this.datatable.items = res.data.data;
            })
        },
        addOrEdit(item) {
            this.modal.status = true;
        },
        closeModal(res) {
            if(res) {
                this.get();
            }
            this.modal.status = false;
        }
    },
    mounted() {
        this.get();
    }
}

</script>
