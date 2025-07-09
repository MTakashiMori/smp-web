<template>

   <div>

       <v-card>

           <v-card-title>
               Adicionar um cardápio
               <v-spacer></v-spacer>
               <v-btn icon @click="close">
               <v-icon>close</v-icon>
               </v-btn>
           </v-card-title>

           <v-card-text>
               <div>
               <v-form ref="partyMenuAdd">
                    <v-autocomplete
                        label="Festa"
                        placeholder="Selecione uma festa"
                        v-model="model.party_id"
                        :items="items"
                        :rules="rules.item"
                    ></v-autocomplete>

                    <v-text-field
                        label="Nome da festa"
                        placeholder="Cardápio n°1"
                        persistent-hint
                        hint="Digite o nome do cardápio"
                        v-model="model.label"
                        :rules="rules.item"
                    ></v-text-field>
               </v-form>
               </div>
           </v-card-text>

           <v-card-actions>
               <v-spacer></v-spacer>
               <v-btn text @click="close">Cancelar</v-btn>
               <v-btn class="primary" @click="save">Salvar</v-btn>
           </v-card-actions>

       </v-card>

   </div>

</template>

<script>

import Service from "@/service";

export default {
    name: 'party-menu-add-modal',
    props: {},
    data() {
        return {
            partyMenuAdded: false,
            items: [],
            model: {
                party_id: null,
                label: null
            },
            rules: {
                item: [
                    v => !!v || 'Este item é obrigatório.',
                ]
            }
        }
    },
    methods: {
        getPartyList() {
            Service.get('party').then((res) => {
                this.items = res.data.data.map((item) => {
                    return {
                        text: item.name,
                        value: item.id
                    }
                });
            })
        },
        save() {
            if(!this.$refs.partyMenuAdd.validate()) {
                return;
            }
            Service.save('party-menu', {
                party_id: this.model.party_id,
                label: this.model.label
            }).then(() => {
                this.partyMenuAdded = true;
                this.$emit('close', this.partyMenuAdded);
                this.model.party_id = null;
                this.model.label = null;
            });
        },
        close() {
            this.$emit('close', this.partyMenuAdded);
        }

    },
    mounted() {
	    this.getPartyList();
    }
}

</script>