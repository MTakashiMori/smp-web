<template>

    <div>
        <v-card>
            <v-card-title> Produtos </v-card-title>
        </v-card>
    </div>

</template>

<script>

    import Service from "@/service";
    export default {
        name: 'sales-by-product',
        data() {
            return {
                path: 'party-menu-products'
            }
        },
        methods: {
            getData() {
                Service.get(this.path).then((res) => {
                    this.products = res.data.data;
                });
            }
        },
        mounted() {
            this.getData()
        }
    }

</script>