<template lang="html">
    <div class="ps-section--shopping ps-shopping-cart">
        <div class="container">
            <div class="ps-section__header">
                <h1>Shopping Cart</h1>
            </div>
            <div class="ps-section__content">
                <table-shopping-cart v-if="typeof cart.products !== 'undefined' && cart.products.length > 0" />
                <p v-else class="cart-nodata">Cart empty</p>
                <div class="ps-section__cart-actions">
                    <nuxt-link to="/shop" class="ps-btn">
                        <i class="icon-arrow-left mr-2"></i>
                        Back to Shop
                    </nuxt-link>
                </div>
            </div>
            <div class="ps-section__footer"  v-if="typeof cart.products !== 'undefined' && cart.products.length > 0" >
                <div class="row justify-content-end">
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <figure>
                            <figcaption>Coupon Discount</figcaption>
                            <div class="form-group">
                                <input
                                    class="form-control"
                                    type="text"
                                    v-model="couponForm.code"
                                    placeholder=""
                                />
                            </div>
                            <div class="form-group">
                                <button class="ps-btn ps-btn--outline" @click.prevent="applyCoupon">
                                    <span v-if="CouponLoading">Loading</span>
                                    <span v-else>Apply</span>
                                </button>
                            </div>
                        </figure>
                    </div>
                    <div
                        class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 "
                    ></div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <div class="ps-block--shopping-total">
                            <div class="ps-block__header">
                                <p>
                                    Subtotal <span> EGP{{ cart.subtotal.toFixed(2) }}</span>
                                </p>
                                <p v-if="cart.percentOff">
                                    {{ $t('header.miniCart.discountPer' ,{ per : cart.percentOff}) }}
                                    <span>EGP{{ cart.discounVal }}</span>
                                </p>
                                <p v-else>
                                    {{ $t('header.miniCart.discount') }}
                                    <span>EGP{{ cart.discounVal }}</span>
                                </p>
                            </div>
                            <div class="ps-block__content">
                                <ul class="ps-block__product">
                                    <li
                                        v-for="(product, index) in cart.products"
                                    >
                                        <span class="ps-block__estimate">
                                            <nuxt-link
                                                :to="`/product/${product.id}`"
                                                class="ps-product__title"
                                            >
                                                {{ product.ItemName }}
                                                <br />
                                                x
                                                {{ product.qty }}
                                            </nuxt-link>
                                        </span>
                                    </li>
                                </ul>
                                <h3>
                                    Total <span>EGP{{ cart.total.toFixed(2) }}</span>
                                </h3>
                            </div>
                        </div>
                        <nuxt-link
                            to="/account/checkout"
                            class="ps-btn ps-btn--fullwidth"
                        >
                            Proceed to checkout
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';
import TableShoppingCart from '~/components/partials/account/modules/TableShoppingCart';

export default {
    name: 'ShoppingCart',
    layout: 'layout-market-place-2',
    components: { TableShoppingCart, ProductShoppingCart },
    computed: {
        ...mapGetters({
            cart : 'myCart/cart',
            CouponLoading: 'myCart/couponLoading',
            loading : 'myCart/loading'
        }),

    },
    data(){
        return {
            couponForm :{
                code : null,
            }
        }
    },
    created(){
        this.$store.dispatch('myCart/get')
    },
    methods: {
        applyCoupon(){
            if(this.CouponLoading) return
            this.$store.dispatch('myCart/applyCoupon' , this.couponForm)
            .then(() => {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Apply Coupon',
                    text: `Coupon Applied Successfully`
                });
            })
            .catch(e => {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Apply Coupon',
                    text: e
                });
            })
        }
    }
};
</script>

<style lang="scss" scoped></style>
