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
                <sales-by-product/>
            </v-col>
            <v-col>
                <sales-by-value/>
            </v-col>

        </v-row>
    </div>


</template>

<script>

    import SalesByProduct from "@/views/sales/sales-by-product.vue";
    import SalesByValue from "@/views/sales/sales-by-value.vue";

    export default {
        name: 'sales',
        components: {
	        SalesByValue,
            SalesByProduct
        },
	    data() {
	        return {
                model: {
                    name: '',
                    balance: 0
                }
		    }
	    }
    }

</script>