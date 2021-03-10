<template lang="html">
    <table class="table ps-table--responsive ps-table--shopping-cart">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in cart.products" :key="product.id">
                <td data-label="Product">
                    <product-shopping-cart :product="product" />
                </td>
                <td data-label="Price" class="price">EGP{{ product.POSPP }}</td>
                <td data-label="Quantity">
                    <div class="form-group--number">
                        <!-- <button class="up" @click.prevent="update({id : product.id , qty : product.qty + 1})">+</button>
                        <button class="down" @click.prevent="update({id : product.id , qty : product.qty - 1})">-</button>
                         -->
                        <v-select @change="update({id : product.id , qty : product.qty})"  v-if="!product.ByWeight" :items="qtys" v-model="product.qty"></v-select>
                        <v-select @change="update({id : product.id , qty : product.qty})" v-else :items="weights" v-model="product.qty"></v-select>
                    </div>
                </td>
                <td data-label="Total">
                    EGP{{
                        (product.qty * product.POSPP).toFixed(2)
                    }}
                </td>
                <td data-label="Action">
                    <a
                        href="#"
                        @click.prevent="handleRemoveProductFromCart(product.id)"
                    >
                        <i class="icon-cross"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';

export default {
    name: 'TableShoppingCart',
    components: { ProductShoppingCart },
     computed: {
        ...mapGetters({
            cart : 'myCart/cart',
            qtys: 'ui/qtys',
            weights: 'ui/weights',
            CouponLoading: 'myCart/couponLoading',
            loading : 'myCart/loading'
        }),

    },
    methods: {
        handleRemoveProductFromCart(id) {
            this.$store.dispatch('myCart/remove', id)
           .then(() => {
               this.$notify({
                    group: 'addCartSuccess',
                    title: 'Delete Cart',
                    text: `item has been deleted from your Cart !`
                });
           })
        },
        update(payload){
            this.$store.dispatch('myCart/update', payload)
            .then(() => {
                this.$notify({
                        group: 'addCartSuccess',
                        title: 'Delete Cart',
                        text: `item has been updated from your Cart !`
                    });
            })
        }
    }
};
</script>

<style lang="scss" scoped></style>
