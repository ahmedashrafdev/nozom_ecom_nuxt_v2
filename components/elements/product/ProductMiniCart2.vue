<template lang="html">
    <div class="ps-product--cart-mobile">
        <div class="ps-product__thumbnail">
            <nuxt-link :to="`/product/${product.id}`">
                <img
                    :src="`${product.ItemImage}`"
                    alt="nozom"
                />
            </nuxt-link>
        </div>
        <div class="ps-product__content">
            <a
                class="ps-product__remove"
                href="#"
                @click.prevent="handleRemoveProductFromCart(product.id)"
            >
                <i class="icon-cross"></i>
            </a>
            <nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
                {{ product.title }}
            </nuxt-link>
            <small>
                {{ product.qty }} x EGP{{ product.POSPP }}
            </small>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { baseUrl } from '~/repositories/Repository';
export default {
    name: 'ProductMiniCart',
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        async loadCartProducts() {
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            let queries = [];
            cookieCart.cartItems.forEach(item => {
                queries.push(item.id);
            });
            if (this.cartItems.length > 0) {
                const response = await this.$store.dispatch(
                    'product/getCartProducts',
                    queries
                );
                if (response) {
                    this.$store.commit('cart/setLoading', false);
                }
            } else {
                this.$store.commit('product/setCartProducts', null);
            }
        },
        handleRemoveProductFromCart(id) {
            this.$store.dispatch('myCart/remove', id)
           .then(() => {
               this.$notify({
                    group: 'addCartSuccess',
                    title: 'Delete Cart',
                    text: `${this.product.ItemName} has been deleted from your Cart !`
                });
           })
        }
    }
};
</script>

<style lang="scss" scoped></style>
