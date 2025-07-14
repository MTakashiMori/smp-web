<template>

    <div>

        <v-card>

            <v-card-title>
                Grupo de produto
            </v-card-title>

            <v-card-text>
                <v-row>
                    <v-col>
                        <v-text-field
                            label="Nome do grupo"
                            v-model="model.name"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            label="Icone do grupo"
                            v-model="model.icon"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            label="Cor do grupo"
                            v-model="model.color"
                        ></v-text-field>
<!--                        <v-color-picker-->
<!--                            hide-canvas-->
<!--                            mode="hexa"-->
<!--                            swatches-max-height="100"-->
<!--                        ></v-color-picker>-->
                    </v-col>
                </v-row>

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
        name: 'party-menu-group-modal',
        props: {
            party_menu_id: String
        },
        data() {
            return {
                path: 'party-menu-groups',
                groupSaved: false,
                model: {
                    name: '',
                    icon: '',
                    color: ''
                }
            }
        },
        methods: {
            save() {
                Service.save(this.path, {
                    party_menu_id: this.party_menu_id,
                    name: this.model.name,
                    icon: this.model.icon,
                    color: this.model.color,
                }).then(() => {
                    this.groupSaved = true;
                    this.close();
                });
            },
            close() {
                this.$emit('close', this.groupSaved);
            }
        },
    }

</script>