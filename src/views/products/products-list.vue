<template>

    <div>
        <v-card>

            <v-card-title>
                Produtos

                <v-spacer></v-spacer>

		<v-btn icon @click="searchModel.status = true" v-if="!searchModel.status">
		    <v-icon>
			search
		    </v-icon>
		</v-btn>

                <v-btn class="primary" @click="addOrEdit">Adicionar</v-btn>
            </v-card-title>

	    <search-list-component
		:active="searchModel.status"
		:items="searchModel.items"
		@close="closeSearch()"
		@search="search($event)"
	    />

            <v-card-text>

                <v-data-table
                    :headers="datatable.headers"
                    :items="datatable.items">
                    <template v-slot:item.actions="{ item }">

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Remover</span>
                        </v-tooltip><!-- rate by business -->

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="">
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip><!-- rate by business -->

                    </template>

                </v-data-table>

            </v-card-text>

        </v-card>

        <v-dialog v-model="modal.status" persistent width="60%">
            <products-add @close="closeModal"/>
        </v-dialog>

    </div>

</template>

<script>

import Service from "@/service";
import ProductsAdd from "@/views/products/products-add.vue";
import SearchListComponent from "@/components/search-list-component.vue";

export default {
    name: 'Products',
    components: {SearchListComponent, ProductsAdd},
    data() {
        return {
            path: 'product',
            datatable: {
                headers: [
                    {text: 'Nome', value: 'name'},
                    {text: 'Grupo', value: 'group_name'},
                    {text: '', value: 'actions', align: 'end'},
                ],
                items: []
            },
            searchModel: {
                status: false,
                items: [
                    {label: 'Nome', field: 'name', type: 'String'},
                ]
            },
            modal: {
                status: false
            }
        }
    },
    methods: {
	getData(data = null) {
            Service.get(this.path, data).then((res) => {
                this.datatable.items = res.data.data;
            })
        },
        addOrEdit(item) {
            this.modal.status = true;
        },
        closeModal(res) {
            if(res) {
                this.get();
            }
            this.modal.status = false;
        },
	search(item) {
	    this.getData(item);
	},
	closeSearch() {
	    this.searchModel.status = false;
	    this.getData();
	},
    },
    mounted() {
        this.getData();
    }
}

</script>
