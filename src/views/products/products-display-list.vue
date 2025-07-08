<template>

    <div>

	<v-row justify="center" align="center" no-gutters>
	    <v-col v-for="(item, i) in products" :key="i" cols="12" sm="6" md="4" lg="3" class="mb-4">
		<v-card outlined>
			<v-card-title>{{ item.name }} - R$ {{item.price}}</v-card-title>
		</v-card>
	    </v-col>
	</v-row>

    </div>

</template>

<script>

    export default {
	name: 'products-display-list',
	props: {
	    products: Array
	}
    }

</script>