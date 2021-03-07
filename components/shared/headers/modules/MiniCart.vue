<template lang="html">
    <div class="ps-cart--mini">
        <a class="header__extra"  href="#">
            <i class="icon-bag2"></i>
            <span v-if="typeof cart.products !== 'undefined' && cart.products.length > 0">
                <i>{{ cart.products.length }}</i>
            </span>
        </a>
        <div v-if="typeof cart.products !== 'undefined' && cart.products.length > 0" class="ps-cart__content">
            <div class="ps-cart__items">
                <template v-if="loading === true">
                    <loading />
                </template>
                <template v-else>
                    <div>
                        <product-mini-cart
                            v-for="product in cart.products"
                            :product="product"
                            :key="product.id"
                        />
                    </div>
                </template>
            </div>
            <div class="ps-cart__footer">
                <h3>
                    {{ $t('header.miniCart.subTotal') }}
                    <strong>EGP{{ cart.subtotal.toFixed(2) }}</strong>
                </h3>
                <div v-if="cart.discounVal">
                    <h3 v-if="cart.percentOff">
                        {{ $t('header.miniCart.discountPer' ,{ per : cart.percentOff}) }}
                        <strong>EGP{{ cart.discounVal.toFixed(2) }}</strong>
                    </h3>
                    <h3 v-else>
                        {{ $t('header.miniCart.discount') }}
                        <strong>EGP{{ cart.discounVal.toFixed(2) }}</strong>
                    </h3>
                </div>
                <h3 v-if="cart.shipping">
                        {{ $t('header.miniCart.shipping') }}
                        <strong>EGP{{ cart.shipping }}</strong>
                    </h3>
                <figure>
                    <div>
                        <nuxt-link to="/account/shopping-cart" class="ps-btn">
                            {{ $t('header.miniCart.viewCart') }}
                        </nuxt-link>
                    </div>
                    <div>
                        <nuxt-link to="/account/checkout" class="ps-btn">
                            {{ $t('header.miniCart.checkout') }}
                        </nuxt-link>
                    </div>
                </figure>
            </div>
        </div>
        <div v-else class="ps-cart__content">
            <div class="ps-cart__items no-products">
                {{ $t('header.miniCart.noProduct') }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductMiniCart from '~/components/elements/product/ProductMiniCart2';
import Loading from '~/components/elements/commons/Loading';

export default {
    name: 'MiniCart',
    components: { Loading, ProductMiniCart },
    computed: {
        ...mapGetters({
            cart : 'myCart/cart',
            loading : 'myCart/loading'
        }),

    }
};
</script>

<style lang="scss" scoped>
.ps-cart__items {
    min-height: 150px;
    &.no-products {
        min-height: 50px;
    }
}
.ps-cart__footer {
    figure {
        display: flex;
        flex-flow: row nowrap;
        margin-right: 0 -5px;

        > * {
            flex-basis: 100%;
            max-width: 50%;
            padding: 0 5px;
        }

        .ps-btn {
            width: 100%;
            text-align: center;
        }
    }
}
</style>
