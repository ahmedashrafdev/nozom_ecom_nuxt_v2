<template lang="html">
    <div class="ps-form__orders ps-block--checkout-order">
        <h3>Your Order</h3>
        <div class="ps-block--checkout-order" v-if="cart.subtotal">
            <div class="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure class="ps-block__items">
                    <template v-if="loading === true">
                        <loading />
                    </template>
                    <nuxt-link
                        v-else
                        v-for="(product, index) in cart.products"
                        :to="`/product/${product.id}`"
                        :key="product.id"
                        class="ps-product__title"
                    >
                        {{ product.ItemName }}
                        <br />
                        {{ product.qty }} x EGP{{
                            product.POSPP.toFixed(2)
                        }}
                    </nuxt-link>
                </figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>EGP {{ cart.subtotal.toFixed(2) }}</small>
                    </figcaption>
                </figure>
                <figure v-if="cart.discounVal">
                    <figcaption v-if="cart.percentOff">
                        <strong>{{ $t('header.miniCart.discountPer' ,{ per : cart.percentOff}) }}</strong>
                        <small>EGP{{ cart.discounVal.toFixed(2) }}</small>
                    </figcaption>
                    <figcaption v-else>
                        <strong>{{ $t('header.miniCart.discount') }}</strong>
                        <small>EGP{{ cart.discounVal.toFixed(2) }}</small>
                    </figcaption>
                </figure>
                <figure v-if="cart.shipping">
                    <figcaption>
                        <strong>Shipping</strong>
                        <small>EGP{{cart.shipping}}</small>
                    </figcaption>
                </figure>
                <figure v-else class="ps-block__shipping">
                    <h3>Shipping</h3>
                    <p>Choos Address to Calculate Shipping</p>
                </figure>
                <figure>
                    <figcaption>
                        <strong>Total</strong>
                        <small>EGP{{ cart.total.toFixed(2) }}</small>
                    </figcaption>
                </figure>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ModuleOrderSummary',
    computed: {
        ...mapGetters({
            cart : 'myCart/cart',
            loading : 'myCart/loading'
        }),
    }
};
</script>

<style lang="scss" scoped></style>
