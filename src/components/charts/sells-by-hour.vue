<template>

    <v-card>
        <v-card-title> Vendas por hora</v-card-title>
        <div id="sells-by-hour"></div>
    </v-card>

</template>

<script>

    import anychart from 'anychart';

    export default {
        name: 'SellsByHour',
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
                            text: 'Vendas por Hora',
                        }
                    }
                }
            }
        },
        methods: {
            buildObject() {

               let data = [
                    {x: '19:00', value: Math.random()*1000},
                    {x: '19:30', value: Math.random()*1000},
                    {x: '20:00', value: Math.random()*1000},
                    {x: '20:30', value: Math.random()*1000},
                    {x: '21:00', value: Math.random()*1000},
                    {x: '21:30', value: Math.random()*1000},
                    {x: '22:00', value: Math.random()*1000},
                    {x: '22:30', value: Math.random()*1000},
                    {x: '23:00', value: Math.random()*1000},
                    {x: '23:30', value: Math.random()*1000},
                    {x: '00:00', value: Math.random()*1000},
                ];

                // create range color palette with color ranged between light blue and dark blue
                let colors = anychart.palettes.rangeColors();

                for(let i = 0; i <= 6; i++) {
                    // colors.items.push({color: this.generatePastelColor()});

                }
                colors.items([{ color: '#009253' }, { color: '#07311F' }]);

                // create a chart and set the data
                this.chart = anychart.line(data);

                // setting color range
                // this.chart.palette(colors);

                this.chart.background({fill: '#ffffff00'});

                // set the container id
                this.chart.container("sells-by-hour");

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
