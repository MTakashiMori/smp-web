<template>

    <div>
        <v-card>

            <v-card-title>
                Cardápio - {{ partyName }} - {{ menuLabel }}

                <v-spacer></v-spacer>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" @click="openAddProductModal()">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </template>
                    <span>Adicionar produto</span>
                </v-tooltip><!-- delete -->
                <v-btn class="primary" @click="goBack">Voltar</v-btn>
            </v-card-title>

            <v-card-text>

                <v-data-table
                    :headers="datatable.headers"
                    :items="datatable.items">

                    <template v-slot:item.price="{item}">
                        R$ {{ item.price.toLocaleString("en",{useGrouping: false,minimumFractionDigits: 2}) }}
                    </template>

                    <template v-slot:item.actions="{ item }">

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="deleteProduct(item)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Remover</span>
                        </v-tooltip><!-- delete -->

                    </template>

                </v-data-table>

            </v-card-text>

        </v-card>

        <v-dialog v-model="partyMenuProductModal.status" persistent width="60%">
            <product-add-to-party-modal
                :party_menu_id="partyMenuProductModal.party_menu_id"
                @close="closeAddProductModal($event)">
            </product-add-to-party-modal>
        </v-dialog>

    </div>

</template>

<script>

    import Service from "@/service";
    import ProductAddToPartyModal from "@/views/products/product-add-to-party-modal.vue";

    export default {
        name: 'party-menu-item',
        components: {ProductAddToPartyModal},
        data() {
            return {
                path: 'party-menu-products',
                partyName: '',
                menuLabel: '',
                datatable: {
                    headers: [
                        {text: 'Produto', value: 'name'},
                        {text: 'Preço', value: 'price'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: []
                },
                partyMenuProductModal: {
                    party_menu_id: null,
                    status: false
                }
            }
        },
        methods: {
            getData() {
                Service.get('party-menu/products', {party_menu_id: this.$route.params.id}).then((res) => {
                    this.partyName = res.data.data.party_name;
                    this.menuLabel = res.data.data.menu_label;
                    this.datatable.items = res.data.data.products;
                });
            },
            goBack() {
                this.$router.push({name: 'partyMenuItem'});
            },
            openAddProductModal() {
                this.partyMenuProductModal.party_menu_id = this.$route.params.id;
                this.partyMenuProductModal.status = true;
            },
            closeAddProductModal(response) {
                if(response) {
                    this.getData();
                }
                this.partyMenuProductModal.status = false;
            },
            deleteProduct(item) {
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