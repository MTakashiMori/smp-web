<template>

    <div>
        <v-card>

            <v-card-title>
                Confirme a compra
            </v-card-title>

            <v-card-text>
                <v-row>

                    <v-col>
                        <v-card>
                            <v-card-title>Items</v-card-title>
                            <v-card-text>
                                <div v-for="(item, index) in cart.values">
                                    <p class="spaced">
                                        <span class="start"></span>
                                        <span class="dots"></span>
                                        <span class="end">+ R$ {{item.value}} </span>
                                    </p>
                                </div>

                                <div v-for="(item, index) in cart.products" >
                                    <p class="spaced">
                                        <span class="start">{{ item | productNameWithQuantityFormatted }}</span>
                                        <span class="dots"></span>
                                        <span class="end">+ R$ {{ item | productTotalFormatted }} </span>
                                    </p>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col class="d-flex flex-column" style="gap: 10px">
                        <v-card>
                            <v-card-title>
                                Saldo inicial
                                <v-spacer></v-spacer>
                                R$ 100,00
                            </v-card-title>
                        </v-card>
                        <v-card>
                            <v-card-title>
                                Total da compra
                                <v-spacer></v-spacer>
                                R$ {{ finalBalance | brlCurrency }}
                            </v-card-title>
                        </v-card>
                        <v-card>
                            <v-card-title>
                                Saldo final
                                <v-spacer></v-spacer>
                                R$ 30,00
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="warning" @click="close(false)">Cancelar</v-btn>
                <v-btn class="primary">Fechar compra</v-btn>
            </v-card-actions>
        </v-card>
    </div>

</template>

<script>

    export default {
        name: 'checkout-modal',
        props: {
            cart: Object
        },
        methods: {
            close(res) {
                this.$emit('close', res);
            }
        },
        computed: {
            finalBalance() {
                let finalBalance = 0;

                const obj = this.cart

                for (let i = 0; i < obj.products.length; i++) {
                    const product = obj.products[i];
                    finalBalance += Number(product.amount * product.price)
                }

                for (let i = 0; i < obj.values.length; i++) {
                    const value = obj.values[i];
                    finalBalance += Number(value.value);
                }

                return finalBalance;
            }
        },
    }

</script>