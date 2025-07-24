<template>

    <div>
        <v-card>

            <v-card-title>
                Cardápios

                <v-spacer></v-spacer>

                <v-btn class="primary" @click="addOrEditPartyMenu">Adicionar</v-btn>
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

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="deletePartyMenu(item)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Remover</span>
                        </v-tooltip><!-- delete -->

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


        <v-dialog v-model="partyMenuModal.status" persistent width="60%">
            <party-menu-add-modal
                :key="partyMenuModal.index"
                @close="closePartyMenuAddModal"
            ></party-menu-add-modal>
        </v-dialog>

        <v-dialog v-model="productModal.status" persistent width="60%">
            <product-add-to-party-modal
                :party_menu_id="productModal.party_menu_id"
                @close="closeModal">
            </product-add-to-party-modal>
        </v-dialog>

    </div>

</template>

<script>

    import Service from "@/service";
    import PartyMenuAddModal from "@/views/party-menu/party-menu-add-modal.vue";
    import AddPersonToPartyModal from "@/views/party/add-person-to-party-modal.vue";
    import ProductAddToPartyModal from "@/views/products/product-add-to-party-modal.vue";

    export default {
        name: 'party-menu',
        components: {ProductAddToPartyModal, AddPersonToPartyModal, PartyMenuAddModal},
        data() {
            return {
                path: 'party-menu',
                datatable: {
                    headers: [
                        {text: 'Festa', value: 'party.name'},
			            {text: 'Cardápio', value: 'label'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: []
                },
                partyMenuModal: {
		            index: 0,
                    status: false
                },
		productModal: {
		    party_menu_id: null,
		    status: false
		}
            }
        },
        methods: {
	    getData() {
                Service.get(this.path).then((res) => {
                    this.datatable.items = res.data.data;
                })
            },
            view(item) {
                this.$router.push({name: 'partyMenuItemShow', params: {id: item.id}});
            },
            addOrEditPartyMenu() {
		        this.partyMenuModal.index++;
                this.partyMenuModal.status = true;
            },
            closeModal(response) {
                if(response) {
                    this.getData();
                }
                this.productModal.status = false;
            },
            closePartyMenuAddModal(response) {
                if(response) {
                    this.getData();
                }
                this.partyMenuModal.status = false;
            },
            openAddProduct(item) {
                this.productModal.party_menu_id = item.id;
                this.productModal.status = true;
            },
            deletePartyMenu(item) {
                Service.remove(this.path, item.id)
                    .then((res) => {
                        this.getData();
                });
            }
        },
        mounted() {
            this.getData();
        }
    }

</script>