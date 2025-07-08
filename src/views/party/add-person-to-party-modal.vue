<template>
    <v-dialog v-model="status" persistent width="60%">
	<v-card>
	    <v-card-title>
		Adicione uma pessoa à festa: {{partyName}}
	    </v-card-title>

	    <v-card-text>

		<v-text-field
		    label="Digite o nome da pessoa"
		    placeholder="Digite o nome"
		    v-model="userSearch"
		></v-text-field>


		<v-data-table
		    :headers="datatable.headers"
		    :items="datatable.items"
		    hide-default-footer
		    v-if="datatable.items.length > 0"
		>

		    <template v-slot:item.actions="{ item }">

			<v-tooltip bottom>
			    <template v-slot:activator="{ on }">
				<v-btn icon v-on="on" @click="addPerson(item)">
				    <v-icon>person_add</v-icon>
				</v-btn>
			    </template>
			    <span>Adicionar pessoa</span>
			</v-tooltip><!-- rate by business -->

		    </template>

		</v-data-table>

		<!-- USERS TO Add -->

	    </v-card-text>

	    <div v-if="datatable.usersToAddItems.length > 0">
		<v-card-title>
		    Pessoas para adicionar
		</v-card-title>

		<v-card-text>

		    <v-data-table
			:headers="datatable.headers"
			:items="datatable.usersToAddItems"
			hide-default-footer
		    >

			<template v-slot:item.actions="{ item }">

			    <v-tooltip bottom>
				<template v-slot:activator="{ on }">
				    <v-btn icon v-on="on" @click="removePersonFromAddArray(item)">
					<v-icon>person_remove</v-icon>
				    </v-btn>
				</template>
				<span>Remover pessoa</span>
			    </v-tooltip><!-- rate by business -->

			</template>

		    </v-data-table>

		</v-card-text>
	    </div>

	    <v-card-actions>
		<v-spacer></v-spacer>
		<v-btn text @click="closeModal">
		    Cancelar
		</v-btn>
		<v-btn class="primary" :disabled="this.datatable.usersToAddItems.length <= 0" @click="addPersonsToParty()">
		    Adicionar
		</v-btn>
	    </v-card-actions>

	</v-card>
    </v-dialog>
</template>

<script>

    import Service from "@/service";

    export default {
	name: 'add-person-to-party-modal',
	props: {
	    status: Boolean,
	    partyId: String,
	    partyName: String
	},
	data() {
	    return {
		userPath: 'user',
		addUsersToPartyPath: 'party/assign-users',
		userSearch: '',
		datatable: {
		    headers: [
			{text: 'Nome', value: 'name'},
			{text: 'Email', value: 'email'},
			{text: '', value: 'actions', align: 'end'}
		    ],
		    items: [],
		    usersToAddItems: []
		},
		userAddedFlag: false,
	    }
	},
	methods: {
	    closeModal() {
		this.$emit('close', this.userAddedFlag);
	    },
	    addPerson(item) {
		let index = this.datatable.usersToAddItems.find((it) => it.id == item.id);
		if(index) {
		    return;
		}

		index = this.datatable.items.findIndex((it) => it.id == item.id);
		this.datatable.items.splice(index,1);
		this.datatable.usersToAddItems.push(item)
	    },
	    removePersonFromAddArray(item) {
		let index = this.datatable.usersToAddItems.findIndex((it) => it.id == item.id);
		this.datatable.usersToAddItems.splice(index,1);

		this.datatable.items.push(item);
	    },
	    addPersonsToParty() {
		let request = {
		    users: this.datatable.usersToAddItems.map((item) => item.id),
		    party_id: this.partyId
		};
		Service.save(this.addUsersToPartyPath, request)
		.then((res) => {
		    this.datatable.usersToAddItems = [];
		    this.datatable.items = [];
		    this.userSearch = '';
		    this.userAddedFlag = true;
		})
		.catch((res) => {console.log('aaa');
		    console.log(res);
		    //TODO WORK HERE TO SHOW THAT THE USER IS ALREADY ADDED
		});
	    }
	},
	watch: {
	    userSearch(val) {
		if(val.length <= 2 || this.searchIsLoading) {
		    return;
		}

		this.searchIsLoading = true;

		Service.get(this.userPath, {name: val, email: val})
		.then((res) => {
		    this.datatable.items = res.data.data;
		})
		.finally(() => {
		    this.searchIsLoading = false;
		})

	    }
	}
    }

</script>