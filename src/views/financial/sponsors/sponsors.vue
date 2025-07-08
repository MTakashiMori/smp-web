<template>

    <div>
        <v-card>

            <v-card-title>
                Patrocinadores

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
		:filterOptions="searchModel.filterItems"
		@close="closeSearch()"
		@search="search($event)"
	    />

            <v-card-text>

                <v-data-table
                    :headers="datatable.headers"
                    :items="datatable.items">

<!--                    <template v-slot:item.sponsored_events="{ item }">-->
<!--                        {{ item.sponsored_events.join(', ') }}-->
<!--                    </template>-->

		    <template v-slot:item.sponsored_parties="{ item }">
			<v-chip v-for="(party, index) in item.sponsored_parties" :key="index" class="ma-1">
			    {{ party }}
			</v-chip>
		    </template>

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

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="">
                                    <v-icon>contact_phone</v-icon>
                                </v-btn>
                            </template>
                            <span>Contato</span>
                        </v-tooltip><!-- rate by business -->

                    </template>

                </v-data-table>

            </v-card-text>

        </v-card>

        <v-dialog v-model="modal.status" persistent width="60%">
            <sponsors-add @close="closeModal"/>
        </v-dialog>

    </div>

</template>

<script>

import SponsorsAdd from "@/views/financial/sponsors/sponsors-add.vue";
import Service from "@/service";
import SearchListComponent from "@/components/search-list-component.vue";

export default {
        name: 'Sponsors',
        components: {SearchListComponent, SponsorsAdd},
        data() {
            return {
                path: 'sponsor',
                datatable: {
                    headers: [
                        {text: 'Nome', value: 'name'},
                        {text: 'Telefone', value: 'telephone'},
                        {text: 'Evento patrocinadas', value: 'sponsored_parties'},
                        {text: '', value: 'actions', align: 'end'},
                    ],
                    items: []
                },
		searchModel: {
		    status: false,
		    items: [
			{label: 'Nome', field: 'name', type: 'string'},
			{label: 'Telefone', field: 'telephone', type: 'string'},
			{label: 'Festas', field: 'sponsored_parties', type: 'select'},
		    ],
		    filterItems: {
			sponsored_parties: []
		    }
		},
                modal: {
                    status: false
                }
            }
        },
        methods: {
	    getData(data = null) {
                Service.get(this.path, data).then((res) => {
		    this.datatable.items = res.data.data.map((item) => {
			return {
			    ...item,
			    sponsored_parties: item.sponsored_parties.map((party) => {
				return party.name
			    })
			}
		    });
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
	    getFilterData() {
		Service.get(this.path + '/filter-data').then((res) => {
		    this.searchModel.filterItems.sponsored_parties = res.data.data.parties.map((item) => {
			return {
			    'text': item.name,
			    'value': item.id
			}
		    });
		});
	    },
        },
        mounted() {
	    this.getFilterData();
            this.getData();

        }
    }

</script>
