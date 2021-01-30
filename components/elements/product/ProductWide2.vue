<template lang="html">
    <div class="ps-product ps-product--wide">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="product.ItemImage"
                    alt="nozom"
                />
            </nuxt-link>
        </div>
        <div class="ps-product__container">
            <div class="ps-product__content">
                <nuxt-link
                    :to="`/product/${product.id}`"
                    class="ps-product__title"
                >
                    {{ product.ItemName }}
                </nuxt-link>
            </div>
            <div class="ps-product__shopping">
                <p v-if="product.NewPOSPP === true" class="ps-product__price sale">
                    EGP{{ product.NewPOSPP }}
                    <del class="ml-2">
                        EGP{{ product.POSPP }}
                    </del>
                </p>
                <p v-else class="ps-product__price">
                    EGP{{ product.POSPP }}
                </p>
                <a class="ps-btn" href="#" @click.prevent="handleAddToCart">
                    {{$t('add_to_Cart')}}
                </a>
                <ul class="ps-product__actions">
                    <li>
                        <a href="#" @click.prevent="handleAddItemToWishlist">
                            <i class="icon-heart"></i>
                            {{$t('wishlist')}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';
import Rating from '../Rating';
import ProductQuickview from '~/components/elements/detail/ProductQuickview';
export default {
    name: 'ProductWide',
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {}
        }
    },
    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems
        }),
        baseUrl() {
            return baseUrl;
        }
    },

    data: () => ({
        productRating: 5,
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
        quickviewDialog: false
    }),

    methods: {
        handleAddToCart() {
            let item = {
                id: this.product.id,
                quantity: 1,
                price: this.product.price
            };
            this.$store.dispatch('cart/addProductToCart', item);
            this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.title} has been added to your cart!`
            });
        },

        handleAddItemToWishlist() {
            let item = {
                id: this.product.id
            };

            this.$store.dispatch('wishlist/addItemToWishlist', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Add to wishlist!',
                text: `${this.product.title} has been added to your wishlist !`
            });
        },

        handleAddItemToCompare() {
            let item = {
                id: this.product.id
            };
            this.$store.dispatch('compare/addItemToCompare', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Add to Compare!',
                text: `${this.product.title} has been added to your compare !`
            });
        },

        async getCartProduct(products) {
            let listOfIds = [];
            products.forEach(item => {
                listOfIds.push(item.id);
            });
            const response = await this.$store.dispatch(
                'product/getCartProducts',
                listOfIds
            );
            if (response) {
                this.$store.commit('cart/setLoading', false);
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
