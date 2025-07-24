<template>
    <div>
        <v-app-bar app>

            <v-btn icon @click.stop="toggleMenu" v-if="user">
                <v-icon>menu</v-icon>
            </v-btn>

            <v-toolbar-title @click="notify">SMP - WEB</v-toolbar-title>

            <v-spacer></v-spacer>

	    <v-tooltip bottom>
		<template v-slot:activator="{ on }">
		    <v-btn text v-on="on" @click.stop="selectParty" >
			<v-icon>celebration</v-icon>
			{{currentParty ? currentParty.party.party_name : ''}}
		    </v-btn>
		</template>
		<span>Selecionar festa</span>
	    </v-tooltip><!-- rate by business -->

            <v-toolbar-items>

                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn text center v-on="on" @click.stop="toggleDark">
                            <v-icon>
                                invert_colors
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Inverter cores</span>
                </v-tooltip>

                <span>{{ user ? user.name : '' }}</span>

                <v-menu bottom origin="center center" transition="scale-transition" min-width="10%" v-if="user">

                    <template v-slot:activator="{ on }">
                        <v-btn text center v-on="on">
                            <span style="margin-left: 3%">{{ user ? user.user.name : '' }}</span>
                            <v-icon>
                                account_circle
                            </v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item v-if="!$store.getters.isLogged" @click="loginOrLogout"> Login </v-list-item>
                        <v-list-item v-if="$store.getters.isLogged" @click="profile"> Perfil </v-list-item>
                        <v-list-item v-if="$store.getters.isLogged" @click="help"> Ajuda </v-list-item>
                        <v-list-item v-if="$store.getters.isLogged" @click="loginOrLogout"> Sair </v-list-item>
                    </v-list>

                </v-menu>


            </v-toolbar-items>
<!--
            <v-progress-linear
                v-show="loading"
                indeterminate
                :color="$vuetify.theme.dark ? 'white' : 'primaryDarken'"
                absolute
                class="progressBar">
            </v-progress-linear> -->

        </v-app-bar>

	<select-party-modal
	    v-if="selectPartyModalStatus"
	    :status="selectPartyModalStatus"
	    @close="closeSelectPartyModal"
	/>

    </div>
</template>

<script>

    import SelectPartyModal from "@/views/party/select-party-modal.vue";

    export default {
        name: 'app-bar',
	    components: {SelectPartyModal},
        data() {
            return {
                drawer: false,
                group: null,
                selectPartyModal: {
                    modalKey: 1,
                    status: false
                }
            }
        },
        methods: {
            loginOrLogout() {
                if(this.$store.getters.getUser) {
                    this.$store.dispatch('logout');
                }
                this.$router.push({name: 'login'});
            },
            toggleMenu() {
                this.$store.dispatch('toggleMenu');
            },
            toggleDark() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                localStorage.setItem('dark_theme', this.$vuetify.theme.dark);
            },
            selectParty() {
                this.$store.dispatch('setSelectPartyModalStatus', true);
            },
            profile() {
                this.$router.push({name: 'profile', params: {id: this.$store.getters.getUser.id}});
            },
            help() {

            },
            notify() {
                this.$store.dispatch('notify', {
                    'message': 'Que deus te elimine',
                    'type': 'warning'
                })
            },
            closeSelectPartyModal() {
                this.$store.dispatch('setSelectPartyModalStatus', false);
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
            currentParty() {
                return this.$store.getters.getCurrentParty;
            },
            selectPartyModalStatus() {
                return this.$store.getters.getSelectPartyModalStatus;
            }
        }
    }

</script>
