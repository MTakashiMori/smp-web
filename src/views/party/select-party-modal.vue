<template>

    <v-dialog v-model="status" persistent width="50%">

        <v-card>
            <v-card-title>Selecione uma festa</v-card-title>

            <v-card-text>
                <v-autocomplete
                    v-model="party"
                    :items="parties"
                ></v-autocomplete>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close"> Cancelar </v-btn>
                <v-btn class="primary" @click="selectParty(party)"> Confirmar </v-btn>
            </v-card-actions>

        </v-card>

    </v-dialog>

</template>

<script>

    import Service from "@/service";
    import router from "@/router";

    export default {
        name: 'select-party-modal',
        props: {
            status: Boolean
        },
        data() {
            return {
                path: 'party/related-user',
                party: null,
                parties: []
            }
        },
        methods: {
            getRelatedParties(){
                const userId = this.$store.getters.getUser;
                if(!userId) {
                    // this.$store.dispatch('setSelectPartyModalStatus', false);
                    return;
                }
                Service.get(this.path, {user_id: this.$store.getters.getUser.user.id})
                    .then((res) => {
                        if(res.data.data.length === 1) {
                            this.selectParty(res.data.data[0]);
                            return;
                        }
                        this.parties = res.data.data.map((item) => {
                            return {
                                'text': item.party_name,
                                'value': item
                            }
                        });
                });
            },
            close() {
                this.$emit('close');
            },
            selectParty(item = null) {
                this.$store.dispatch('setCurrentParty', {party: item});
                this.$emit('close');
            }
        },
        mounted() {
            this.getRelatedParties();
        }
    }

</script>