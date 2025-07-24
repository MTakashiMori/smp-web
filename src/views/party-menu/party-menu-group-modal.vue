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
                        <label class="body-1 font-weight-medium mb-2 d-block">Ícone do grupo</label>
                        <v-btn
                            v-for="icon in iconList"
                            :key="icon"
                            icon
                            class="ma-2"
                            :color="icon === model.icon ? 'primary' : 'black'"
                            @click="selectIcon(icon)"
                        >
                            <v-icon :color="icon === model.icon ? 'white' : 'black'">
                                {{ icon }}
                            </v-icon>
                        </v-btn>
                        <v-text-field
                            v-model="model.icon"
                            label="Ícone selecionado"
                            readonly
                            outlined
                        >
                            <template v-slot:append>
                                <v-icon>{{ model.icon }}</v-icon>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col>
                        <label class="body-1 font-weight-medium mb-2 d-block">Cor do grupo</label>
                        <v-color-picker
                            v-model="model.color"
                            mode="hex"
                            flat
                            hide-inputs
                            :swatches="pastelColorsList"
                            show-swatches
                        ></v-color-picker>
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
                },
                selectedIcon: '',
                iconList: [
                    "restaurant",
                    "restaurant_menu",
                    "fastfood",
                    "local_dining",
                    "bakery_dining",
                    "ramen_dining",
                    "lunch_dining",
                    "dinner_dining",
                    "icecream",
                    "cake",
                    "coffee",
                    "wine_bar",
                    "breakfast_dining",
                    "kebab_dining",
                    "emoji_food_beverage",
                    'liquor',
                    'bakery_dining',
                    'food_bank',
                    'nightlife',
                    'local_bar'
                ],
                pastelColorsList: [
                    ["#FFB3BA", "#FFDFBA", "#FFFFBA"],
                    ["#BAFFC9", "#BAE1FF", "#E2BAFF"],
                    ["#D5F4E6", "#FFF0F5", "#F0F8FF"],
                    ["#FBE4D5", "#E6E6FA", "#FADADD"]
                ]
            }
        },
        methods: {
            selectIcon(icon) {
                this.model.icon = icon;
            },
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