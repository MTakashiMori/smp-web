<template>
    <div>
        <v-app-bar app>

            <v-btn icon @click.stop="toggleMenu" v-if="user">
                <v-icon>menu</v-icon>
            </v-btn>

            <v-toolbar-title @click="notify">SMP - WEB</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">

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

    </div>
</template>

<script>

    export default {
        name: 'app-bar',
        data() {
            return {
                drawer: false,
                group: null,
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
            profile() {

            },
            help() {

            },
            notify() {
                this.$store.dispatch('notify', {
                    'message': 'Que deus te elimine',
                    'type': 'warning'
                })
            }
        },
        computed: {
            user() {
                return this.$store.getters.getUser;
            },
        }
    }

</script>
