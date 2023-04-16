<template>
    <div>
        <v-app-bar app absolute>

            <v-btn icon @click.stop="toggleMenu">
                <v-icon>menu</v-icon>
            </v-btn>

            <v-toolbar-title>SMP - WEB</v-toolbar-title>

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

                 <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn text center v-on="on">
                            <v-icon>
                                account_circle
                            </v-icon>
                        </v-btn>
                    </template>
                    <span>Login / Logout</span>
                </v-tooltip>

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
            toggleMenu() {
                this.$store.dispatch('toggleMenu');
            },
            toggleDark() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
                localStorage.setItem('dark_theme', this.$vuetify.theme.dark);
            }
        }
    }

</script>
