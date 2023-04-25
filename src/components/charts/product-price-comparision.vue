<template>

    <v-card>
        <v-card-title> Comparação de preço por produto </v-card-title>
        <div id="product-price-comparision"></div>
    </v-card>

</template>

<script>

    import anychart from 'anychart';

    export default {
        name: 'ProductPriceComparision',
        data() {
            return {
                chartData: {
                    type: 'pie',
                    data: {
                        labels: [],
                        datasets: []
                    },
                    options: {
                        title: {
                            display: true,
                            fontSize: 22,
                            text: 'Comparação de preço por produto',
                        }
                    }
                }
            }
        },
        methods: {
            buildObject() {

               let data = [
                    {x: 'Cachorro-quente', value: 5, fill: this.generatePastelColor()},
                    {x: 'Bebidas', value: 5, fill: this.generatePastelColor()},
                    {x: 'Pastel', value: 5, fill: this.generatePastelColor()},
                    {x: 'Caldo', value: 5, fill: this.generatePastelColor()},
                    {x: 'Caipirinhas', value: 7, fill: this.generatePastelColor()},
                    {x: 'Bolos', value: 3, fill: this.generatePastelColor()},
                    {x: 'Galinhada', value: 10, fill: this.generatePastelColor()},
                ];

                // create range color palette with color ranged between light blue and dark blue
                let colors = anychart.palettes.rangeColors();

                for(let i = 0; i <= 6; i++) {
                    // colors.items.push({color: this.generatePastelColor()});
                }
                console.log(colors);
                colors.items([{ color: '#009253' }, { color: '#07311F' }]);

                // create a chart and set the data
                this.chart = anychart.column(data);

                // setting color range
                this.chart.palette(colors);

                this.chart.background({fill: '#ffffff00'});

                // set the container id
                this.chart.container("product-price-comparision");

                // initiate drawing the chart
                this.chart.draw();

            },
            generatePastelColor() {
                let R = Math.floor((Math.random() * 127) + 127);
                let G = Math.floor((Math.random() * 127) + 127);
                let B = Math.floor((Math.random() * 127) + 127);

                let rgb = (R << 16) + (G << 8) + B;
                return `#${rgb.toString(16)}`;
            }
        },
        mounted() {
            this.buildObject()
        }
    }

</script>
