<template>
    <div class="card-container">

	<v-card>
	    <v-card-title>
		{{
		    currentParty ?
		    currentParty.party.party_name + '&#127881;' :
		    username
		}}
	    </v-card-title>
	</v-card>

	<super-admin-card/>

	<admin-card/>

	<sales-card/>


    </div>
</template>

<script>

    import SuperAdminCard from "@/views/dashboard/dashboard-cards/super-admin-card.vue";
    import AdminCard from "@/views/dashboard/dashboard-cards/admin-card.vue";
    import SalesCard from "@/views/dashboard/dashboard-cards/sales-card.vue";

    export default {
    	name: "Home",
	components: {SalesCard, AdminCard, SuperAdminCard},
	data() {
	    return {

	    }
	},
	computed: {
	    username() {
		let user = this.$store.getters.getUser ? this.$store.getters.getUser.user.name : '';
		return 'Bem vindo ' + user;
	    },
	    currentParty() {
		return this.$store.getters.getCurrentParty;
	    }
	}

    };

</script>

<style scoped>

    .card-container > * {
	margin-bottom: 1%; /* Define o espaçamento entre os elementos */
    }

    /* Remove o último margin-bottom */
    .card-container > *:last-child {
	margin-bottom: 0;
    }

</style>
