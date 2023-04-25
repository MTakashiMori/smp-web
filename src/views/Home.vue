<template>
    <div>

        <v-card>
            <v-card-title>Festa da Padroeira Santa Maria dos Pobres - 2023 &#127881;</v-card-title>

            <!-- <v-container> -->



            <!-- </v-container> -->



        </v-card>

        <v-row>
            <v-col>
                <v-card style="background-color: green;">
                    <v-card-title>
                        Total vendido:
                        <v-spacer></v-spacer>
                        <v-icon small>autorenew</v-icon>
                    </v-card-title>
                    <v-card-text style="text-align: end;">
                        <h2>
                            R$ 14.456,50
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col>
                <v-card style="background-color: blueviolet;">
                    <v-card-title>
                        Vendas realizadas:
                        <v-spacer></v-spacer>
                        <v-icon small>autorenew</v-icon>
                    </v-card-title>
                    <v-card-text style="text-align: end;">
                        <h2>
                            5.150 vendas
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col>
                <v-card style="background-color:indianred;">
                    <v-card-title>
                        Ranking produtos mais vendidos:
                        <v-spacer></v-spacer>
                        <v-icon small>autorenew</v-icon>
                    </v-card-title>
                    <v-card-text style="text-align: end;">
                        <h2>
                           Bebidas - Cachorro quente - Pastel
                        </h2>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <SellsByCategory/>
            </v-col>
            <v-col>
                <ProductPriceComparision/>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <SellsByHour></SellsByHour>
            </v-col>
        </v-row>


    </div>
</template>

<script>

    import ProductPriceComparision from '../components/charts/product-price-comparision.vue';
    import SellsByCategory from '../components/charts/sells-by-category.vue';
    import SellsByHour from '../components/charts/sells-by-hour.vue';


    export default {
    name: "Home",
    components: { SellsByCategory, ProductPriceComparision, SellsByHour}
};

</script>
