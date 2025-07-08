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
			<span>Local:</span> {{ model.location }}
		    </v-col>
		    <!-- Responsável -->
		    <v-col cols="12">
			<v-icon>person</v-icon>
			<span>Responsável:</span> {{ model.responsible }}
		    </v-col>
		</v-row>

		<br>

		<div class="d-flex align-center">
		    <h2>{{model.menu.length > 1 ? 'Cardápios' : 'Cardápio' }}</h2>
		    <v-spacer></v-spacer>
		    <v-tooltip bottom>
			<template v-slot:activator="{ on }">
			    <v-btn class="primary" v-on="on">
<!--				<v-icon>menu_book</v-icon>-->
				Adicionar cardápio
			    </v-btn>
			</template>
			<span>Adicionar cardápio</span>
		    </v-tooltip><!-- rate by business -->
		</div>

		<br>

		<v-expansion-panels>
		    <v-expansion-panel v-for="(item,i) in model.menu">
			<v-expansion-panel-header>
			    Cardápio / Menu - {{item.label}}
			</v-expansion-panel-header>
			<v-expansion-panel-content>
			    <products-display-list :products="item.products"/>
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
    import ProductsDisplayList from "@/views/products/products-display-list.vue";
    import AddPersonToPartyModal from "@/views/party/add-person-to-party-modal.vue";

    export default {
	name: 'party-details',
	components: {AddPersonToPartyModal, ProductsDisplayList},
	data() {
	    return {
		path: 'party',
		model: {
		    id: null,
		    name: '',
		    date: null,
		    menu: null
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
		}
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
		    this.model.menu = data.party_menu
		    this.datatable.items = data.users;
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