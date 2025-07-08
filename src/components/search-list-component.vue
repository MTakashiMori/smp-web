<template>

    <div>
	<v-expand-transition>
	    <div>
		<v-card-text v-show="active">

		    <v-form @submit.prevent="search" ref="searchForm" lazy-validation>

			<div v-for="(row, index) in chunkedItems" :key="index" @keydown.esc="close()">
			    <v-row>
				<v-col
				    v-for="(item, i) in row"
				    :key="i"
				    :cols="row.length === 1 ? 12 : row.length === 2 ? 6 : 4"
				>
				    <div v-if="item.type === 'string' ">
					<v-text-field
					    :label="item.label"
					    v-model="model[item.field]">
					</v-text-field>
				    </div>

				    <div v-if="item.type === 'select' ">
					<v-autocomplete
					    :label="item.label"
					    v-model="model[item.field]"
					    :items="filterOptions[item.field]"
					>
					</v-autocomplete>
				    </div>


				</v-col>
			    </v-row>
			</div>

			<v-card-actions>
			    <v-spacer/>
			    <v-btn text @click="close()">Cancelar</v-btn>
			    <v-btn class="primary" @click="search()">Pesquisar</v-btn>
			</v-card-actions>

		    </v-form>

		</v-card-text>


	    </div>

	</v-expand-transition>
    </div>

</template>

<script>

    export default {
	name: 'searchListComponent',
	props: {
	    active: Boolean,
	    items: Array,
	    filterOptions: Array
	},
	data() {
	    return {
		model: {}
	    }
	},
	methods: {
	    close() {
		this.model = {};
		this.$emit('close');
	    },
	    chunkArray(array, size) {
		const chunkedArr = [];
		for (let i = 0; i < array.length; i += size) {
		    chunkedArr.push(array.slice(i, i + size));
		}
		return chunkedArr;
	    },
	    search() {
		const cleanedObj = Object.fromEntries(
		    Object.entries(this.model).filter(entry => entry[1] !== "")
		);
		this.$emit('search', cleanedObj);
	    }
	},
	computed: {
	    chunkedItems() {
		return this.chunkArray(this.items, 3);
	    },
	}
    }

</script>