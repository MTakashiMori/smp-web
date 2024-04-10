<template>

    <div>
        <v-card>

            <v-card-title>
                Cardápios

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
                                <v-btn icon v-on="on" @click="openAddProduct(item)">
                                    <v-icon>tapas</v-icon>
                                </v-btn>
                            </template>
                            <span>Adicionar produtos</span>
                        </v-tooltip><!-- add products -->

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="view(item)">
                                    <v-icon>visibility</v-icon>
                                </v-btn>
                            </template>
                            <span>Visualizar cardápio</span>
                        </v-tooltip><!-- view -->

<!--                        <v-tooltip bottom>-->
<!--                            <template v-slot:activator="{ on }">-->
<!--                                <v-btn icon v-on="on" @click="">-->
<!--                                    <v-icon>delete</v-icon>-->
<!--                                </v-btn>-->
<!--                            </template>-->
<!--                            <span>Remover</span>-->
<!--                        </v-tooltip>&lt;!&ndash; delete &ndash;&gt;-->

<!--                        <v-tooltip bottom>-->
<!--                            <template v-slot:activator="{ on }">-->
<!--                                <v-btn icon v-on="on" @click="">-->
<!--                                    <v-icon>edit</v-icon>-->
<!--                                </v-btn>-->
<!--                            </template>-->
<!--                            <span>Editar</span>-->
<!--                        </v-tooltip>&lt;!&ndash; edit &ndash;&gt;-->

                    </template>

                </v-data-table>

            </v-card-text>

        </v-card>


        <v-dialog v-model="modal.status" persistent width="60%">
            <party-menu-item-add
                :party_menu_id="modal.party_menu_id"
                @close="closeModal">
            </party-menu-item-add>
        </v-dialog>


    </div>

</template>

<script>

    import Service from "@/service";
    import PartyMenuItemAdd from "@/views/party-menu/party-menu-item-add.vue";

    export default {
        name: 'party-menu',
        components: {PartyMenuItemAdd},
        data() {
            return {
                path: 'party-menu',
                datatable: {
                    headers: [
                        {text: 'Festa', value: 'party.name'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: []
                },
                modal: {
                    status: false,
                    party_menu_id: null
                }
            }
        },
        methods: {
            get() {
                Service.get(this.path).then((res) => {
                    this.datatable.items = res.data.data;
                })
            },
            view(item) {
                this.$router.push({name: 'partyMenuItemShow', params: {id: item.id}});
            },
            addOrEdit(item) {
                this.modal.status = true;
            },
            closeModal() {
                this.modal.status = false;
            },
            openAddProduct(item) {
                this.modal.party_menu_id = item.id;
                this.modal.status = true;
            }
        },
        mounted() {
            this.get();
        }
    }

</script>