<template>

    <div>

        <div>
            <v-card>
                <v-card-title>
                    Produtos
                    <v-spacer></v-spacer>

                    <v-badge
                        :content="cartQuantityTotal"
                        :value="cartQuantityTotal"
                        bordered
                        overlap>

                            <v-icon large>shopping_cart</v-icon>

                    </v-badge>

                </v-card-title>

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

                        <v-container>
                            <v-row>

                                <v-col v-for="(product, productKey) in group.products" :key="productKey" cols="12" sm="4">
                                    <v-card >

                                        <v-img
                                            @click="addToCart(product)"
                                            max-width="100%"
                                            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                        ></v-img>

                                        <v-card-title>
                                            {{product.name}}
                                            <v-spacer></v-spacer>
                                            R$ {{product.price}}
                                        </v-card-title>

                                        <v-card-actions v-if="(cartMap[product.id]) > 0">

                                            <v-spacer></v-spacer>

                                            <div>

                                                <v-btn text icon>
                                                    <v-icon color="red" large  @click="removeFromCart(product)">remove</v-icon>
                                                </v-btn>

                                                   {{ cartMap[product.id] }}

                                                <v-btn text icon>
                                                    <v-icon color="green" large @click="addToCart(product)">add</v-icon>
                                                </v-btn>
                                            </div>

                                            <v-spacer></v-spacer>
                                        </v-card-actions>

                                    </v-card>
                                </v-col>

                            </v-row>
                        </v-container>


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
        props: {
            cart: Object
        },
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
            },
            cartQuantityTotal() {
                if(!this.cart.products) {
                    return 0;
                }
                return this.cart.products.reduce((total, item) =>  total + item.amount, 0)
            },
            cartMap() {
                return this.cart.products.reduce((map, item) => {
                    map[item.id] = item.amount;
                    return map;
                }, {});
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
                    });
            },
            addToCart(product) {
                let tempCart = structuredClone(this.cart);

                let exists = tempCart.products.find((item) => item.id === product.id);

                if(exists) {
                    exists.amount++;
                    this.$emit('updateCart', tempCart);
                    return;
                }

                tempCart.products.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    amount: 1
                });

                this.$emit('updateCart',tempCart);
            },
            removeFromCart(product) {
                let tempCart = structuredClone(this.cart);

                let exists = tempCart.products.findIndex((item) => item.id === product.id);

                if(exists === -1) {
                    return;
                }

                if(exists !== -1) {
                    if(tempCart.products[exists].amount > 1) {
                        tempCart.products[exists].amount--;
                    } else {
                        tempCart.products.splice(exists,1);
                    }
                }
                this.$emit('updateCart', tempCart);
            },
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