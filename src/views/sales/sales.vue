<template>
    <div>

        <div>
            <v-card>

                <v-card-title>
                    Vendas/Caixa

                    <v-spacer></v-spacer>
                    <span>{{model.name}} - R${{model.balance}}</span>
                </v-card-title>

            </v-card>

        </div>

        <br>

        <v-row>
            <v-col cols="8">
                <sales-by-product @updateCart="updateCartProducts" :cart="cart"/>
            </v-col>
            <v-col>
                <div style="position: sticky; top: 8%">
                    <sales-by-value @updateCart="updateCartValues" :cart="cart"/>
                </div>

            </v-col>

        </v-row>

        <v-fab-transition>
            <v-btn class="primary" fab fixed bottom right large v-if="cartHasProducts" @click="openCheckoutModal">
                <v-icon>shopping_cart_checkout</v-icon>
            </v-btn>
        </v-fab-transition>

        <v-dialog v-model="checkoutModal.status" persistent width="60%">
            <checkout-modal
                :status="checkoutModal.status"
                :key="checkoutModal.key"
                :cart="cart"
                @close="closeCheckoutModal"
            ></checkout-modal>
        </v-dialog>

    </div>


</template>

<script>

    import SalesByProduct from "@/views/sales/sales-by-product.vue";
    import SalesByValue from "@/views/sales/sales-by-value.vue";
    import CheckoutModal from "@/views/sales/checkout-modal.vue";

    export default {
        name: 'sales',
        components: {
            CheckoutModal,
	        SalesByValue,
            SalesByProduct
        },
	    data() {
	        return {
                model: {
                    name: '',
                    balance: 0
                },
                cart: {
                    products: [],
                    values: []
                },
                checkoutModal: {
                    status: false,
                    key: 0
                }
		    }
	    },
        methods: {
            //TODO check if we can merge these 2 methods
            updateCartProducts(cartProducts) {
                this.cart = cartProducts;
            },
            updateCartValues(cartValues) {
                this.cart = cartValues;
            },
            openCheckoutModal() {
                this.checkoutModal.key++;
                this.checkoutModal.status = true;
            },
            closeCheckoutModal() {
                this.checkoutModal.status = false;
            }
        },
        computed: {
            cartHasProducts() {
                return (this.cart.products.length > 0 || this.cart.values.length > 0);
            }
        }
    }

</script>