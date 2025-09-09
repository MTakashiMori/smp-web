<template>

    <div>
        <v-card>

            <v-card-title>
                Festas

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

                    <template v-slot:item.date="{ item }">
                        {{ item.date.join(' ~ ') }}
                    </template>


                    <template v-slot:item.actions="{ item }" class="button-section">

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="addPersonToParty(item)">
                                <v-icon>person_add</v-icon>
                            </v-btn>
                            </template>
                            <span>Adicionar pessoa</span>
                        </v-tooltip><!-- rate by business -->

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

                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn icon v-on="on" @click="goToMenu(item)">
                                    <v-icon>tapas</v-icon>
                                </v-btn>
                            </template>
                            <span>Visualizar cardápio</span>
                        </v-tooltip><!-- rate by business -->

			<v-tooltip bottom>
			    <template v-slot:activator="{ on }">
				<v-btn icon v-on="on" @click="view(item)">
				    <v-icon>visibility</v-icon>
				</v-btn>
			    </template>
			    <span>Visualizar festa</span>
			</v-tooltip><!-- rate by business -->

                    </template>

                </v-data-table>

            </v-card-text>

        </v-card>

        <v-dialog v-model="modal.status" persistent width="60%">
            <party-add @close="closeModal"/>
        </v-dialog>

        <add-person-to-party-modal
            :key="addPersonToPartyModal.index"
            :partyId="addPersonToPartyModal.partyId"
            :partyName="addPersonToPartyModal.partyName"
            :status="addPersonToPartyModal.status"
            @close="closeAddPersonToPartyModal"
        />

    </div>

</template>

<script>

import PartyAdd from "@/views/party/party-add.vue";
import Service from "@/service";
import AddPersonToPartyModal from "@/views/party/add-person-to-party-modal.vue";
import SearchListComponent from "@/components/search-list-component.vue";

export default {
    name: 'Party',
    components: {SearchListComponent, AddPersonToPartyModal, PartyAdd},
    data() {
        return {
            path: 'party',
            datatable: {
                headers: [
                    {text: 'Nome', value: 'name'},
                    {text: 'Data', value: 'date'},
                    {text: 'Referencia', value: 'reference'},
                    {text: 'Endereço', value: 'address.address'},
                    {text: '', value: 'actions', align: 'end'},
                ],
                items: []
            },
            searchModel: {
                status: false,
                items: [
                    {label: 'Nome', field: 'name', type: 'string'},
                ]
            },
            modal: {
                status: false
            },
            addPersonToPartyModal: {
                index: 0,
                status: false,
                partyId: null,
                partyName: null
            }
        }
    },
    methods: {
        getData(data = null) {
            Service.get(this.path, data, false).then((res) => {
                this.datatable.items = res.data.data;
            });
        },
        search(item) {
            this.getData(item);
        },
        closeSearch() {
            this.searchModel.status = false;
            this.getData();
        },
        addOrEdit(item) {
            this.modal.status = true;
        },
        view(item) {
            this.$router.push({name: 'partyDetails', params: {id: item.id}});
        },
        closeModal(res) {
            if(res) {
                this.getData();
            }
            this.modal.status = false;
        },
        goToMenu(item) {
            // if(item.party_menu.length === 1) {
                this.$router.push({name: 'partyMenuItemShow', params: {id: item.party_menu[0].id}});
            // }
            // this.$router.push({name: 'partyMenuItem'});
        },
        addPersonToParty(item) {
            this.addPersonToPartyModal.partyName = item.name;
            this.addPersonToPartyModal.partyId = item.id;
            this.addPersonToPartyModal.index++;
            this.addPersonToPartyModal.status = true;
        },
        closeAddPersonToPartyModal() {
            this.addPersonToPartyModal.status = false;
            this.addPersonToPartyModal.partyId = null;
            this.addPersonToPartyModal.partyName = null;
        }
    },
    mounted() {
        this.getData();
    }
}

</script>
