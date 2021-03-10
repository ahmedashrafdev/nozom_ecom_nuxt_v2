<template lang="html">
    <div class="ps-product">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="product.ItemImage"
                    alt="product.ItemName"
                />
            </nuxt-link>
            <div v-if="product.NewPOSPP" class="ps-product__badge">sale</div>
           
        </div>
        <div class="ps-product__container">
            <div class="ps-product__content">
                <nuxt-link
                    :to="`/product/${product.id}`"
                    class="ps-product__title"
                >
                    {{ product.ItemName }}
                </nuxt-link>
                <p
                    v-if="product.NewPOSPP"
                    class="ps-product__price sale"
                >
                        EGP{{ product.NewPOSPP }}
                    <del class="ml-2">
                        EGP{{ product.POSPP }}
                    </del>
                </p> 
                <p v-else class="ps-product__price">
                        EGP{{ product.POSPP }}
                </p>
                
            </div>
            <div class="ps-product__content hover">
                <nuxt-link :to="`/product/${product.id}`">
                    <a class="ps-product__title">{{ product.ItemName }}</a>
                </nuxt-link>
                <p
                    v-if="product.is_sale === true"
                    class="ps-product__price sale"
                >
                    EGP{{ product.NewPOSPP }}
                    <del class="ml-2"> EGP{{ product.POSPP }}</del>
                </p>
                <p v-else class="ps-product__price">EGP{{ product.POSPP }}</p>
                <!-- <p class="ps-product__price">${{ product.POSPP }}</p> -->
            </div>
             <ul class="actions">
                <v-select v-if="!product.ByWeight" :items="qtys" v-model="qty"></v-select>
                <v-select v-else :items="weights" v-model="qty"></v-select>
                <v-flex class="items-center">
                    <li>
                        <a
                            to="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            class="cart-btn"
                            title="Add to cart"
                            @click.prevent="handleAddToCart"
                        >
                            <i class="icon-bag2"></i>
                            {{$t('add_to_cart')}}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Add to wishlist"
                            @click.prevent="handleAddItemToWishlist"
                        >
                            <i class="icon-heart"></i>
                        </a>
                    </li>

                </v-flex>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Rating from '../Rating';
import ProductQuickview from '~/components/elements/detail/ProductQuickview';

export default {
    components: { ProductQuickview, Rating },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {}
        }
    },

    computed: {
        ...mapGetters({
            qtys: 'ui/qtys',
            weights: 'ui/weights',
        }),
        isSale() {
            if (this.product.is_sale) {
                return true;
            }
            return false;
        }
    },

    data: () => ({
        productRating: 5,
        qty : 1,
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
        quickviewDialog: false
    }),
    methods: {
        handleAddToCart() {
            if(this.$auth.loggedIn){
            this.$store.dispatch('myCart/create', {product: this.product.id , qty :this.qty})
            .then(() => {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `${this.product.ItemName} has been added to your cart!`
                });
            })
            } else {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Please Login To Continue`
                });
                localStorage.setItem('product' , this.product.id )
                localStorage.setItem('qty' , this.qty )

                this.$router.push('/account/login')
            }
        },

        handleAddItemToWishlist() {
            if(this.$auth.loggedIn){
                this.$store.dispatch('myWishlist/create', {product: this.product.id})
                .then(() => {
                    this.$notify({
                        group: 'addCartSuccess',
                        title: 'Success!',
                        text: `${this.product.ItemName} has been added to your cart!`
                    });
                })
            } else {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Please Login To Continue`
                });
                this.$router.push('/account/login')
            }
        },

    }
};
</script>
