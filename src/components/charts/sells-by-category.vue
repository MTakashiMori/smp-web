<template>

    <v-card>
        <v-card-title> Vendas por categoria</v-card-title>
        <div id="sells-by-category"></div>
    </v-card>

</template>

<script>

    import anychart from 'anychart';

    export default {
        name: 'SellsByCategory',
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
                            text: 'Vendas por categoria',
                        }
                    }
                }
            }
        },
        methods: {
            buildObject() {

               let data = [
                    {x: 'Cachorro-quente', value: Math.random()},
                    {x: 'Bebidas', value: Math.random()},
                    {x: 'Pastel', value: Math.random()},
                    {x: 'Caldo', value: Math.random()},
                    {x: 'Caipirinhas', value: Math.random()},
                    {x: 'Bolos', value: Math.random()},
                    {x: 'Galinhada', value: Math.random()},
                ];

                // create range color palette with color ranged between light blue and dark blue
                let colors = anychart.palettes.rangeColors();

                for(let i = 0; i <= 6; i++) {
                    // colors.items.push({color: this.generatePastelColor()});

                }
                colors.items([{ color: '#009253' }, { color: '#07311F' }]);

                // create a chart and set the data
                this.chart = anychart.pie(data);

                // setting color range
                // this.chart.palette(colors);

                this.chart.background({fill: '#ffffff00'});

                // set the container id
                this.chart.container("sells-by-category");

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
