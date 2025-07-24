<template>

    <div>

        <v-card>

            <v-card-title>
                Produto
                <v-spacer></v-spacer>
                <v-btn icon @click="close">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <div>
                    <v-form ref="productAddToPartyModal">

                        <v-row>
                            <v-col>
                                <v-text-field
                                    label="Nome"
                                    v-model="model.name"
                                ></v-text-field>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col>
                                <v-autocomplete
                                    label="Grupo"
                                    placeholder="Selecione uma grupo"
                                    v-model="model.party_menu_group_id"
                                    :items="items"
                                    :rules="rules.item"
                                    hint="Clique no botão de '+' para adicionar um novo grupo"
                                    persistent-hint
                                >
                                    <template v-slot:append-outer>
                                        <v-tooltip bottom>
                                            <template v-slot:activator="{ on }">
                                                <v-btn icon v-on="on" @click="openAddGroup">
                                                    <v-icon>add</v-icon>
                                                </v-btn>
                                            </template>
                                            <span>Adicionar um novo grupo</span>
                                        </v-tooltip><!-- delete -->
                                    </template>

                                </v-autocomplete>
                            </v-col>

                            <v-col>
                                <v-text-field v-model.lazy="model.price" v-money="money"></v-text-field>
                            </v-col>

                        </v-row>
                    </v-form>
                </div>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close">Cancelar</v-btn>
                <v-btn class="primary" @click="save">Salvar</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog v-model="partyMenuGroupModal.status" persistent width="60%">
            <party-menu-group-modal
                :key="partyMenuGroupModal.index"
                :party_menu_id="party_menu_id"
                @close="closePartyMenuGroupModal"
            ></party-menu-group-modal>
        </v-dialog>

    </div>

</template>

<script>

    import Service from "@/service";
    import {VMoney} from 'v-money';
    import PartyMenuGroupModal from "@/views/party-menu/party-menu-group-modal.vue";

    export default {
        name: 'product-add-to-party-modal',
        components: {PartyMenuGroupModal},
        directives: {money: VMoney},
        props: {
            party_menu_id: null
        },
        data() {
            return {
                partyMenuGroupPath: 'party-menu-groups',
                partyMenuProductsPath: 'products',
                productSaved: false,
                items: [],
                model: {
                    party_menu_group_id: null,
                    name: null,
                    price: 0
                },
                rules: {
                    item: [
                        v => !!v || 'Este item é obrigatório.',
                    ]
                },
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: 'R$ ',
                    precision: 2,
                    masked: false,
                },
                partyMenuGroupModal: {
                    status: false,
                    index:0
                }
            }
        },
        methods: {
            save() {
                Service.save(this.partyMenuProductsPath, {
                    party_menu_id: this.party_menu_id,
                    party_menu_group_id: this.model.party_menu_group_id,
                    name: this.model.name,
                    price: parseFloat(this.model.price.replace("R$", "").replace(/\./g, "").replace(",", ".").trim())
                }).then(() => {
                    this.productSaved = true;
                    this.close();
                });
            },
            close() {
                this.$emit('close', this.productSaved);
            },
            getData() {
                Service.get(this.partyMenuGroupPath, {party_menu_id: this.party_menu_id})
                    .then((res) => {
                        this.items = res.data.data.map((item) => {
                            return {
                                text: item.name,
                                value: item.id
                            }
                        })
                    });
            },
            openAddGroup() {
                this.partyMenuGroupModal.index++;
                this.partyMenuGroupModal.status = true;
            },
            closePartyMenuGroupModal(res) {
                if(res) {
                    this.getData();
                }
                this.partyMenuGroupModal.status = false;
            }
        },
        mounted() {
            this.getData();
        }
    }

</script>