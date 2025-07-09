<template>

    <div>
        <v-card>

            <v-card-title>
                Cardápio - {{ partyName }} - {{ menuLabel }}

                <v-spacer></v-spacer>

                <v-btn class="primary" @click="goBack">Voltar</v-btn>
            </v-card-title>

            <v-card-text>

                <v-data-table
                    :headers="datatable.headers"
                    :items="datatable.items">

                    <template v-slot:item.price="{item}">

                        R$ {{ item.price.toLocaleString("en",{useGrouping: false,minimumFractionDigits: 2}) }}
                    </template>
<!--                    <template v-slot:item.actions="{ item }">-->

<!--                        <v-tooltip bottom>-->
<!--                            <template v-slot:activator="{ on }">-->
<!--                                <v-btn icon v-on="on" @click="openAddProduct(item)">-->
<!--                                    <v-icon>tapas</v-icon>-->
<!--                                </v-btn>-->
<!--                            </template>-->
<!--                            <span>Adicionar produtos</span>-->
<!--                        </v-tooltip>&lt;!&ndash; add products &ndash;&gt;-->


<!--                    </template>-->

                </v-data-table>

            </v-card-text>

        </v-card>


    </div>

</template>

<script>

    import Service from "@/service";

    export default {
        name: 'party-menu-item',
        data() {
            return {
                path: 'party-menu-products',
                partyName: '',
                menuLabel: '',
                datatable: {
                    headers: [
                        {text: 'Produto', value: 'product.name'},
                        {text: 'Preço', value: 'price'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: []
                },
            }
        },
        methods: {
            get() {
                Service.get(this.path, {party_menu_id: this.$route.params.id}).then((res) => {
                    this.partyName = res.data.data[0].party_name;
                    this.menuLabel = res.data.data[0].menu_label;
                    this.datatable.items = res.data.data;
                });
            },
            goBack() {
                this.$router.push({name: 'partyMenuItem'});
            }
        },
        mounted() {
            this.get();
        }
    }

</script>