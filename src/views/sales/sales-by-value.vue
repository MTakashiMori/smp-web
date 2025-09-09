<template>
    <div>

        <v-card>
           <v-card-title> Valor </v-card-title>

            <v-card-text>

                <v-row>
                    <v-col v-for="item in buttonsCategory" cols="4">
                        <v-btn class="quick-values" @click="addValue(item.value)" :color="item.color">
                            + R${{item.text}}
                        </v-btn>
                    </v-col>
                </v-row>

                <br>

                <div class="d-flex align-center">
                    <v-text-field v-model.lazy="manualValue" v-money="money" label="Valor" placeholder="Digite o valor a ser inserido"></v-text-field>
                      <v-btn icon text @click="addValue(manualValue)">
                        <v-icon>add</v-icon>
                      </v-btn>
                </div>

                <br>

                <div>
                    <p class="spaced">
                        <span class="start">Saldo Atual</span>
                        <span class="dots"></span>
                        <span class="end"> R$ {{model.balance}} </span>
                    </p>
                </div>

                <div v-for="(item, index) in cart.values" @click="removeValue(item)">
                    <p class="spaced">
                        <span class="start"></span>
                        <span class="dots"></span>
                        <span class="end">+ R$ {{item.value}} </span>
                    </p>
                </div>

                <div v-for="(item, index) in cart.products" @click="removeValue(item)">
                    <p class="spaced">
                        <span class="start">{{ item | productNameWithQuantityFormatted }}</span>
                        <span class="dots"></span>
                        <span class="end">+ R$ {{ item | productTotalFormatted }} </span>
                    </p>
                </div>

                <div>
                    <p class="spaced">
                        <span class="start">Saldo Final</span>
                        <span class="dots"></span>
                        <span class="end"> R$ {{finalBalance}} </span>
                    </p>
                </div>


            </v-card-text>

        </v-card>

    </div>
</template>

<script>

    import {VMoney} from 'v-money';
    export default {
        name: 'sales-by-value',
        directives: {money: VMoney},
        props: {
            cart: Object
        },
        data() {
            return {
                buttonsCategory: [
                    {text: '2', value: '2', color: '#ADD8E6'},
                    {text: '5', value: '5', color: '#FFB6C1'},
                    {text: '10', value: '10', color: '#FFCC99'},
                    {text: '20', value: '20', color: '#FFFF99'},
                    {text: '50', value: '50', color: '#CD853F'},
                    {text: '100', value: '100', color: '#AFEEEE'},
                ],
                model: {
                    name: '',
                    balance: 0
                },
                valueInputs: [],
		        manualValue: 0,
                valueId: 0,
                money: {
                    decimal: ',',
                    thousands: '.',
                    // prefix: 'R$ ',
                    precision: 2,
                    masked: false,
                },
            }
        },
        methods: {
            addValue(value) {
                if (typeof value == 'string') {
                    value = parseFloat(value.replace(/\./g, '').replace(',', '.'));
                }
                if (value <= 0) return;

                const tempCart = {
                    ...this.cart,
                    values: [...this.cart.values]
                };

                tempCart.values.push({
                    key: this.valueId++,
                    value: value
                });

                this.manualValue = 0;

                this.$emit('updateCart', tempCart);
            },
            removeValue(item) {
                let tempCart = structuredClone(this.cart);

                if(item.id) {
                    let exists = tempCart.products.findIndex((i) => i.id === item.id);

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
                    return;
                }

                let index = tempCart.values.findIndex((i) => i.key === item.key);
                tempCart.values.splice(index, 1);
                this.$emit('updateCart', tempCart);
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

<style>
    .quick-values {
        width: 100%;
    }

    .spaced {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .dots {
      flex-grow: 1; /* Preenche o espaço entre os spans */
      border-bottom: 1px dotted #d3c0c0; /* Estilo pontilhado como "..." */
      margin: 0 8px; /* Espaço entre os textos e os pontos */
    }
</style>