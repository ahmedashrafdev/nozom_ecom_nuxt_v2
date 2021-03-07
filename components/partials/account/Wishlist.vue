<template lang="html">
    <div class="ps-section--shopping ps-whishlist">
        <div class="container">
            <div class="ps-section__header">
                <h1>Wishlist</h1>
            </div>
            <div class="ps-section__content" v-if="!loading">
                <div class="table-responsive">
                    <table class="table ps-table--whishlist">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product name</th>
                                <th>Unit Price</th>
                                <th>Vendor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody v-if="wishlistLength > 0">
                            <tr
                                v-for="product in wishlist"
                                :key="product.id"
                            >
                                <td>
                                    <a
                                        href="#"
                                        @click.prevent="
                                            handleRemoveItemFromWishlist(
                                                product
                                            )
                                        "
                                    >
                                        <i class="icon-cross"></i>
                                    </a>
                                </td>
                                <td>
                                    <product-shopping-cart :product="product" />
                                </td>
                                <td class="price">
                                   EGP{{ product.POSPP.toFixed(2) }}
                                </td>
                                <td>
                                    <a
                                        class="ps-btn"
                                        href="#"
                                        @click.prevent="
                                            handleAddToCart(product)
                                        "
                                    >
                                        Switch to cart
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            No Products
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else>
                loading
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';
import { getListOfProductId } from '~/utilities/product-helper';
export default {
    name: 'Wishlist',
    components: { ProductShoppingCart },
    computed: {
        ...mapGetters({
            wishlist : 'myWishlist/wishlist',
            wishlistLength : 'myWishlist/wishlistLength',
            loading : 'myWishlist/loading'
        }),
    },
    methods: {
        handleAddToCart(product) {
            this.$store.dispatch('myCart/create', {product: product.id})
            .then(() => {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `${product.ItemName} has been added to your cart!`
                });
                this.handleRemoveItemFromWishlist(product)
            })
        },
        handleRemoveItemFromWishlist(product) {
            this.$store.dispatch('myWishlist/remove', product.id)
            .then(() => {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `${product.ItemName} has been deleted from Wishlist!`
                });
            })
        },
    }
};
</script>

<style lang="scss" scoped></style>
