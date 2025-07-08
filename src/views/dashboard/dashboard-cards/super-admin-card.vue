<template>

    <div class="card-container">


	<v-card>

	    <v-card-title>
		Super admin
	    </v-card-title>

	    <v-card-text>

		<v-row>
		    <v-col>
			<v-card class="pa-4" color="blue lighten-1" dark>
			    <div class="d-flex align-center">
				<v-icon size="36" class="mr-4">celebration</v-icon>
				<div>
				    <div class="text-caption font-weight-light">Festas cadastradas</div>
				    <div class="text-h5 font-weight-bold">13</div>
				</div>
			    </div>
			</v-card>
		    </v-col>
		    <v-col>
			<v-card class="pa-4" color="orange lighten-2" dark>
			    <div class="d-flex align-center">
				<v-icon size="36" class="mr-4">event_available</v-icon>
				<div>
				    <div class="text-caption font-weight-light">Festas realizadas</div>
				    <div class="text-h5 font-weight-bold">10</div>
				</div>
			    </div>
			</v-card>
		    </v-col>
		    <v-col>
			<v-card class="pa-4" color="purple lighten-3" dark>
			    <div class="d-flex align-center">
				<v-icon size="36" class="mr-4">calendar_month</v-icon>
				<div>
				    <div class="text-caption font-weight-light">Festas futuras</div>
				    <div class="text-h5 font-weight-bold">3</div>
				</div>
			    </div>
			</v-card>
		    </v-col>
		</v-row>

		<v-row>
		    <v-col>
			<v-card class="pa-4" color="light-green darken-3" dark>
			    <div class="d-flex align-center">
				<v-icon size="36" class="mr-4">currency_exchange</v-icon>
				<div>
				    <div class="text-caption font-weight-light">Total transacionado</div>
				    <div class="text-h5 font-weight-bold">R$ 255.894,06</div>
				</div>
			    </div>
			</v-card>
		    </v-col>
		    <v-col>
			<v-card class="pa-4" color="pink lighten-1" dark>
			    <div class="d-flex align-center">
				<v-icon size="36" class="mr-4">shopping_bag</v-icon>
				<div>
				    <div class="text-caption font-weight-light">Média vendas por hora</div>
				    <div class="text-h5 font-weight-bold">755</div>
				</div>
			    </div>
			</v-card>
		    </v-col>
		    <v-col>
			<v-card class="pa-4" color="brown lighten-1" dark>
			    <div class="d-flex align-center">
				<v-icon size="36" class="mr-4">timera</v-icon>
				<div>
				    <div class="text-caption font-weight-light">Tempo médio de compra</div>
				    <div class="text-h5 font-weight-bold">5:25</div>
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

    import Service from "@/service";

    export default {
	name: 'super-admin-card',
	data() {
	    return {
		path: 'super-admin-dashboard'
	    }
	},
	mounted() {
	    // this.getData();
	},
	methods: {
	    getData(path = this.path) {
		Service.get(path, {userId: this.$store.getters.getUser.user.id }).then((res) => {
		    console.log(res);
		});
	    }
	}

    }

</script>

<style scoped>
    .row+.row {
	margin-top: 0;
	margin-bottom: 0.5%;
    }

</style>
