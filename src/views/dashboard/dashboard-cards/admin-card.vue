<template>

    <div class="card-container">

	<v-card>

	    <v-card-title>
		Admin
	    </v-card-title>

	    <v-card-text>

		<v-row>
		    <v-col>
			<v-card class="pa-4" color="light-green darken-3" dark>
			    <div class="d-flex align-center">
				<v-icon size="36" class="mr-4">attach_money</v-icon>
				<div>
				    <div class="text-caption font-weight-light">Total da festa</div>
				    <div class="text-h5 font-weight-bold">75.850,50</div>
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
				    <div class="text-caption font-weight-light">Vendas por minuto</div>
				    <div class="text-h5 font-weight-bold">3</div>
				</div>
			    </div>
			</v-card>
		    </v-col>
		</v-row>

	    </v-card-text>

	</v-card>

    </div>

</template>

<script>

export default {
    name: 'admin-card'
}

</script>

<style scoped>

.row+.row {
    margin-top: 0;
    margin-bottom: 0.5%;
}

</style>