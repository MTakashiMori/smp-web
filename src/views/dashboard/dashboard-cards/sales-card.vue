<template>

    <v-card>

	<v-card-title>
	    Sales
	</v-card-title>

	<v-card-text>
	    <v-row>
		<v-col>
		    <v-card class="pa-4" color="blue lighten-1" dark>
			<div class="d-flex align-center">
			    <v-icon size="36" class="mr-4">leaderboard</v-icon>
			    <div>
				<div class="text-caption font-weight-light">Quantidade de vendas</div>
				<div class="text-h5 font-weight-bold">153</div>
			    </div>
			</div>
		    </v-card>
		</v-col>
		<v-col>
		    <v-card class="pa-4" color="orange lighten-2" dark>
			<div class="d-flex align-center">
			    <v-icon size="36" class="mr-4">stars</v-icon>
			    <div>
				<div class="text-caption font-weight-light">Produto mais vendido</div>
				<div class="text-h5 font-weight-bold">Cachorro-quente</div>
			    </div>
			</div>
		    </v-card>
		</v-col>
		<v-col>
		    <v-card class="pa-4" color="purple lighten-3" dark>
			<div class="d-flex align-center">
			    <v-icon size="36" class="mr-4">timer</v-icon>
			    <div>
				<div class="text-caption font-weight-light">Vendas por hora</div>
				<div class="text-h5 font-weight-bold">80</div>
			    </div>
			</div>
		    </v-card>
		</v-col>
	    </v-row>

	</v-card-text>

    </v-card>

</template>

<script>

export default {
    name: 'sales-card'
}

</script>