<template>

    <v-card>
        <v-card-title>Vendas - Barraca - Produtos diversos</v-card-title>

        <v-card-text>

           <v-row>
                <v-col v-for="item, key in products" :key="key" class="d-flex child-flex" cols="4">
                    <v-card>
                        <v-img
                            :src="item.link"
                            :lazy-src="item.link"
                            aspect-ratio="3"
                            cover
                            class="bg-grey-lighten-2"
                            @click="addProduct(item)">
                        </v-img>
                        <v-card-title class="text-h6">
                            {{ item.name }}
                            <v-spacer></v-spacer>

                            <!-- <section v-if="(selected.findIndex((i) => i.id == item.name) != -1)" style="te;"> -->
                                <v-btn icon rounded color="red" outlined @click="removeProduct(item)"><v-icon>remove</v-icon></v-btn>
                                <p style="margin: 0px 5px 0px 5px "> {{ selectedProductQty(item.name) }} </p>
                                <v-btn icon rounded color="green" outlined @click="addProduct(item)"><v-icon>add</v-icon></v-btn>
                            <!-- </section> -->

                            <v-spacer></v-spacer>
                            R$ {{ item.price }}
                        </v-card-title>
                    </v-card>

                </v-col>
            </v-row>

        </v-card-text>


        <v-card-actions v-if="selected.length > 0" class="elevation-3" style="position:sticky; bottom: 5%; background-color: inherit">

            <div>
                <h2>Total de itens: {{ selected.reduce((a, b) => a + b.quantity, 0) }} </h2>
                <h2>Valor total: R$ {{ selected.reduce((a, b) => a + b.price, 0) }} </h2>
            </div>



            <v-spacer></v-spacer>
            <div>
                <v-btn class="danger" text> Cancelar </v-btn>
                <v-btn class="warning" @click="selected = []"> Limpar </v-btn>
                <v-btn class="primary"> Finalizar compra</v-btn>
            </div>


        </v-card-actions>


    </v-card>

</template>

<script>

    export default {
        name: 'SampleSells',
        data() {
            return {
                products: [
                    {name: 'Cachorro-quente', price: 5, link: 'https://cozinhasimples.com.br/wp-content/uploads/cachorro-quente-cozinha-simples-780x470.jpg'},
                    {name: 'Chopp', price: 10, link: 'https://static3.tcdn.com.br/img/img_prod/682190/caneca_para_chopp_bavaria_p_vidro_300ml_80645_1_35f65a897b5e5715538d99fec1459cb4_20220524090225.jpg'},
                    {name: 'Coca-Cola', price: 5, link: 'https://res.cloudinary.com/mrancho/cardapio/2018/05/coca-cola-lata-350ml-min.png'},
                    {name: 'Guaraná', price: 5, link: 'https://www.imigrantesbebidas.com.br/bebida/images/products/full/1935-refrigerante-guarana-antarctica-lata-350ml.jpg'},
                    {name: 'Suco', price: 5, link: 'https://www.imigrantesbebidas.com.br/bebida/images/products/full/1935-refrigerante-guarana-antarctica-lata-350ml.jpg'},
                    {name: 'Caldo de carne', price: 5, link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkHBdrmhTt2PUdQvwXT9qWQi7WanuKfTZ7QkB37Un_wutjYKgcQ2e9EEya8FXfKjpF3YQ&usqp=CAU'},
                    {name: 'Caldo verde', price: 5, link: 'https://www.mariareceita.com.br/wp-content/uploads/2022/03/receita-caldo-verde-sopa.jpg'},
                    {name: 'Caldo de frango', price: 5, link: 'https://comidinhasdochef.com/wp-content/uploads/2018/06/Caldo-de-Frango.jpg'},
                    {name: 'Pastel de carne', price: 5, link: 'https://www.sabornamesa.com.br/images/receitas/pins_image/r2179-pastel-de-carne-pin.jpg'},
                    {name: 'Pastel de queijo', price: 5, link: 'https://www.sabornamesa.com.br/media/k2/items/cache/990810f9242641a8e264ce996a78ed28_XL.jpg'},
                    {name: 'Pastel de misto', price: 5, link: 'https://sabornoponto.com.br/wp-content/uploads/2023/04/pastel-misto.jpg'},
                    {name: 'Pastel de calabresa', price: 5, link: 'https://storage.googleapis.com/domain-images/9a7f8c48-c986-4025-83df-00548d77bd7a/products/gallery_d9fbdd7e-e035-4f2e-9f72-45958d536a1a.jpg'},

                    {name: 'Canjica de coco', price: 5, link: 'https://img.cybercook.com.br/imagens/receitas/87/canjica-com-coco-2.jpg'},
                    {name: 'Canjica de amendoim', price: 5, link: 'https://anamariabraga.globo.com/wp-content/uploads/2020/06/canjica-com-amendoim.jpg'},
                    {name: 'Churrasquinho - Carne', price: 5, link: 'https://minervafoods.com/wp-content/uploads/2022/12/espetinho_bovino_-_blog-3.jpg'},
                    {name: 'Churrasquinho - Frango', price: 5, link: 'https://i0.wp.com/emagrecercerto.com/wp-content/uploads/2015/07/churrasquinho-de-frango.jpg?fit=1080%2C720&ssl=1'},
                    {name: 'Churrasquinho - Lenguiça', price: 5, link: 'https://www.vivaespetos.com.br/wp-content/uploads/2021/04/linguica.jpg'},
                    {name: 'Galinhada', price: 5, link: 'https://s2.glbimg.com/ajGTiNj2FxByx96WP-01zz-wW4k=/e.glbimg.com/og/ed/f/original/2021/03/16/galinhada_camil.jpg'},
                    {name: 'Bolo', price: 5, link: 'https://static.itdg.com.br/images/1200-630/92ab14d076bc6dfcc72ed10712924cd1/320646-original.jpg'},
                    {name: 'Quentão', price: 5, link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbsm3lmSly1h8THBdwSycU0xKFZn6gr8RpZkO-EIvWbQbmEaE9vBlZJwSSaEpkUd9RW5g&usqp=CAU'},
                    {name: 'Batata-frita', price: 5, link: 'https://www.sabornamesa.com.br/media/k2/items/cache/377829b055e89e3afb894e7528a10996_XL.jpg'},

                ],
                selected: []
            }
        },
        methods: {
            addProduct(item) {
                let index = this.selected.findIndex((i) => i.id == item.name);
                if(index != -1) {
                    this.selected[index].quantity++;
                    this.selected[index].price += item.price;
                    return;
                }
                this.selected.push({
                    id: item.name,
                    quantity: 1,
                    price: item.price
                });
            },
            removeProduct(item) {
                let index = this.selected.findIndex((i) => i.id == item.name);
                if(index != -1) {
                    this.selected[index].quantity--
                    this.selected[index].price -= item.price;
                }
            },
            selectedProductQty(id) {
                const i = this.selected.find((item) => item.id == id);
                return i ? i.quantity : 0
            }
        }
    }

</script>
