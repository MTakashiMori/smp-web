<template>

    <div>
        <v-card>

            <v-card-title>
                Adicionar produtos
                <v-spacer></v-spacer>
                <v-btn icon @click="close">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>

                <v-form ref="sponsorAdd">

                    <v-text-field
                        v-model="search"
                        @input="searchProducts"
                        :disabled="searching"
                        placeholder="Produto"
                        hint="Digite para pesquisar, pelo menos 3 caracteres"
                        persistent-hint
                    ></v-text-field>

                </v-form>

                <v-data-table
                    v-if="datatable.items.length > 0"
                    :headers="datatable.headers"
                    :items="datatable.items"
                    hide-default-footer
                >

                    <template v-slot:item.actions="{ item }">

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="addProductToList(item)">
                                    <v-icon>add</v-icon>
                                </v-btn>
                            </template>
                            <span>Adicionar produto</span>
                        </v-tooltip><!-- rate by business -->

                    </template>

                </v-data-table>

                <v-card-title v-if="datatable.productToAddList.length > 0">
                    Lista de produtos para adicionar
<!--                    <v-spacer></v-spacer>-->
<!--                    <v-btn icon @click="close">-->
<!--                        <v-icon>close</v-icon>-->
<!--                    </v-btn>-->
                </v-card-title>

                <v-data-table
                    v-if="datatable.productToAddList.length > 0"
                    :headers="datatable.productToAddListHeaders"
                    :items="datatable.productToAddList"
                    hide-default-footer
                >

                    <template v-slot:item.price="{item, header}">
                        <v-text-field v-model.lazy="item[header.value]" v-money="money"></v-text-field>
                    </template>

                    <template v-slot:item.actions="{ item }">

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="removeProductFromList(item)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Remover</span>
                        </v-tooltip><!-- rate by business -->

                    </template>

                </v-data-table>

            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close">Cancelar</v-btn>
                <v-btn class="primary" @click="save">Salvar</v-btn>
            </v-card-actions>

        </v-card>
    </div>

</template>

<script>

    import Service from "@/service";
    import {VMoney} from 'v-money';

    export default {
        name: 'party-menu-item-add',
        directives: {money: VMoney},
        props: {
            party_menu_id: null
        },
        data() {
            return {
                search: null,
                searching: false,
                datatable: {
                    headers: [
                        {text: 'Nome', value: 'name'},
                        {text: 'Descrição', value: 'description'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: [],
                    productToAddList: [],
                    productToAddListHeaders: [
                        {text: 'Nome', value: 'name'},
                        {text: 'Descrição', value: 'description'},
                        {text: 'Preço', value: 'price'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                },
                money: {
                    decimal: ',',
                    thousands: '.',
                    prefix: 'R$ ',
                    precision: 2,
                    masked: false
                },
                wasProductAdded: false
            }
        },
        methods: {
            save() {
                Service.save('party-menu/add-products', {
                    items: this.datatable.productToAddList,
                    party_menu_id: this.party_menu_id
                }).then((res) => {
                    this.wasProductAdded = true;
                    this.$emit('close', this.wasProductAdded);
                }).finally(() => {

                });

            },
            close() {
                this.$emit('close', this.wasProductAdded);
            },
            searchProducts() {
                if(!(this.search.length > 3) || this.searching) {
                    return;
                }
                this.searching = true;

                Service.get('product', {name: this.search}).then((res) => {
                    this.datatable.items = res.data.data;
                }).finally(() => {
                    this.searching = false;
                });
            },
            addProductToList(item) {
                if(this.datatable.productToAddList.find((i) => i.id === item.id)) {
                    return;
                }
                this.datatable.productToAddList.push(item);
            },
            removeProductFromList(item) {
                const index = this.datatable.productToAddList.indexOf(item);
                if(index) {
                    this.datatable.productToAddList.splice(index, 1);
                }
            }
        }
    }

</script>