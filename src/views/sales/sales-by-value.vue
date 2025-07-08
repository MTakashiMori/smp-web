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
                      <v-text-field label="Valor" placeholder="Digite o valor a ser inserido" v-model="manualValue"></v-text-field>
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

                <div v-for="(item, index) in valueInputs" @click="removeValue(index)">
                    <p class="spaced">
                        <span class="start"></span>
                        <span class="dots"></span>
                        <span class="end">+ R$ {{item}} </span>
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

    export default {
        name: 'sales-by-value',
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
		manualValue: 0
            }
        },
        methods: {
            addValue(value) {
		if(value <= 0) {
		    return;
		}
                this.valueInputs.push(value);
		this.manualValue = 0;
            },
            removeValue(index) {
                this.valueInputs.splice(index, 1);
            }
        },
        computed: {
            finalBalance() {
                let newValues = 0;
                for (const value of this.valueInputs) {
                    newValues += Number(value);
                }
                return (this.model.balance + newValues);
            }
        }

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