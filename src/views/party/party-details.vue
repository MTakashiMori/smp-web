<template>
    <div>

	<v-card>
	    <v-card-title>
		{{model.name}}
		<v-spacer></v-spacer>
	    	<v-btn class="primary" @click="goBack">Retornar</v-btn>
	    </v-card-title>

	    <v-card-text>

		<v-row>
		    <!-- Data -->
		    <v-col cols="12" md="6">
                <v-icon left>calendar_today</v-icon>
                <span>Data:</span>
                {{ model.date[0] }} ~ {{ model.date[1] }}
		    </v-col>
		    <!-- Local -->
		    <v-col cols="12" md="6">
                <v-icon left>place</v-icon>
                <span>Local:</span> {{ model.address.address }} - {{model.address.city}} - {{model.address.cep}}
		    </v-col>
		    <!-- Responsável -->
		    <v-col cols="12">
                <v-icon>person</v-icon>
                <span>Responsável:</span> {{ model.reference }}
		    </v-col>
		</v-row>

		<br>

		<div class="d-flex align-center">

		    <h2>{{model.menus && model.menus.length > 1 ? 'Cardápios' : 'Cardápio' }}</h2>

		    <v-spacer></v-spacer>

		    <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn class="primary" v-on="on">
                        Adicionar cardápio
                    </v-btn>
                </template>
                <span>Adicionar cardápio</span>
		    </v-tooltip><!-- rate by business -->
		</div>

		<br>

		<v-expansion-panels multiple>
		    <v-expansion-panel v-for="(item, i) in model.menus">
			<v-expansion-panel-header>
			    Cardápio / Menu - {{item.label}}
			</v-expansion-panel-header>
			<v-expansion-panel-content>

                <v-tabs fixed-tabs icons-and-text v-model="tab">
                    <v-tab v-for="(productGroup, key) in item.productList" :key="key">
                        {{productGroup.name}}
                        <v-icon> {{productGroup.icon}} </v-icon>
                    </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="(productGroup, key) in item.productList" :key="key">


                        <v-list>
                            <v-list-item v-for="(product, pkey) in productGroup.products" :key="pkey">
                                <v-list-item-avatar>
                                    <v-img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title> {{ product.name }} </v-list-item-title>
                                    <v-list-item-subtitle> R$ {{ product.price }} </v-list-item-subtitle>
                                </v-list-item-content>

                            </v-list-item>

                        </v-list>


                    </v-tab-item>
                </v-tabs-items>

			</v-expansion-panel-content>
		    </v-expansion-panel>
		</v-expansion-panels>

		<br>

		<div class="d-flex align-center">
		    <h2>Usuarios relacionados</h2>
		    <v-spacer></v-spacer>
		    <v-tooltip bottom>
			<template v-slot:activator="{ on }">
			    <v-btn class="primary" v-on="on" @click="addPersonToParty">
<!--				<v-icon>person_add</v-icon>-->
				Adicionar pessoas
			    </v-btn>
			</template>
			<span>Adicionar pessoa</span>
		    </v-tooltip><!-- rate by business -->
		</div>


		<v-data-table
		    :headers="datatable.headers"
		    :items="datatable.items"
		></v-data-table>

	    </v-card-text>
	</v-card>

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

    import Service from "@/service";
    import AddPersonToPartyModal from "@/views/party/add-person-to-party-modal.vue";

    export default {
        name: 'party-details',
        components: {AddPersonToPartyModal},
        data() {
            return {
                path: 'party',
                menuPath: 'party-menu/products',
                model: {
                    id: null,
                    name: '',
                    date: [],
                    menus: [],
                    address: []
                },
                datatable: {
                    headers: [
                        {text: 'Nome', value: 'name'},
                        {text: 'Email', value: 'email'}
                    ],
                    items: []
                },
                addPersonToPartyModal: {
                    index: 0,
                    status: false,
                    partyId: null,
                    partyName: null
                },
                tab: 0
            }
        },
        mounted() {
            this.getPartyData()
        },
        methods: {
            getPartyData() {
                Service.get(this.path, {id: this.$route.params.id}).then((res) => {
                    const data = res.data.data[0];
                    this.model.id = data.id;
                    this.model.name = data.name;
                    this.model.date = data.date;
                    this.model.address = data.address
                    this.datatable.items = data.users;

                    data.party_menu.forEach((menu) => {
                        this.getProductsByParty(menu.id);
                    })
                }).finally(() => {

                });
            },
            getProductsByParty(partyMenuId) {
                Service.get(this.menuPath, { party_menu_id: partyMenuId })
                    .then((res) => {
                        this.model.menus.push({
                            'label': res.data.data.menu_label,
                            'productList': res.data.data.product_groups.map(groups => ({
                                ...groups,
                                products: res.data.data.products.filter((product) => product.party_menu_group_id === groups.id)
                            }))
                        });
                    });
            },
            goBack() {
                this.$router.push({name: 'partyList'});
            },
            addPersonToParty() {
                this.addPersonToPartyModal.partyName = this.model.name;
                this.addPersonToPartyModal.partyId = this.model.id;
                this.addPersonToPartyModal.index++;
                this.addPersonToPartyModal.status = true;
            },
            closeAddPersonToPartyModal(response) {
                if(response) {
                    this.getPartyData();
                }
                this.addPersonToPartyModal.status = false;
                this.addPersonToPartyModal.partyId = null;
                this.addPersonToPartyModal.partyName = null;
            }
        }
    }

</script>

<style>

    span {
	    font-weight: bold;
    }

</style>