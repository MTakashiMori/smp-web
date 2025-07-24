<template>

    <div>

        <div>
            <v-card>
                <v-card-title> Produtos </v-card-title>
            </v-card>

        </div>

        <br>

        <div v-if="currentParty">
            <v-expansion-panels v-model="panelModel" multiple >

                <v-expansion-panel v-for="(group, key) in productList" :key="key">
                    <v-expansion-panel-header class="headline" :expand-icon="group.icon" disable-icon-rotate :color="group.color">
                        {{ group.name }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>

                        <v-row>

                            <v-col v-for="(product, productKey) in group.products" :key="productKey" cols="12" sm="4">
                                <v-card>

                                    <v-img max-width="100%" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>

                                    <v-card-title>
                                        {{product.name}}
                                        <v-spacer></v-spacer>
                                        R$ {{product.price}}
                                    </v-card-title>
                                </v-card>
                            </v-col>



                        </v-row>


                    </v-expansion-panel-content>
                </v-expansion-panel>

            </v-expansion-panels>
        </div>

        <div v-if="!currentParty">
            <v-alert border="bottom" color="orange" type="warning" text icon="no_drinks">
                Nenhuma festa selecionada! Selecione uma ou associe.
            </v-alert>
        </div>

    </div>

</template>

<script>
    import Service from "@/service";

    export default {
        name: 'sales-by-product',
        data() {
            return {
                path: 'party-menu/products',
                productList: [],
                panelModel: [0, 1]
            };
        },
        computed: {
            currentParty() {
                return this.$store.getters.getCurrentParty;
            },
            currentPartyMenuId() {
                return (this.currentParty ? this.currentParty.current_menu : null);
            }
        },
        methods: {
            getData(partyMenuId = this.currentPartyMenuId) {

                if (!partyMenuId) {
                    return;
                }

                Service.get(this.path, { party_menu_id: partyMenuId })
                    .then((res) => {
                        this.productList = res.data.data.product_groups.map(groups => ({
                           ...groups,
                           products: res.data.data.products.filter((product) => product.party_menu_group_id === groups.id)
                        }));
                        console.log(this.productList);
                    });
            }
        },
        mounted() {
            if(this.currentParty) {
                this.getData();
            }
        },
        watch: {
            currentParty() {
                this.getData(this.currentParty.party.current_menu)
            }
        }
    };
</script>