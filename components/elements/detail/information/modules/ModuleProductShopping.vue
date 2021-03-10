<template lang="html">
    <div class="ps-product__shopping">
        <figure>
            <figcaption>Quantity</figcaption>
            <div class="form-group--number">
               
                <v-select v-if="!product.ByWeight" :items="qtys" v-model="quantity"></v-select>
                <v-select v-else :items="weights" v-model="quantity"></v-select>
            </div>
        </figure>
        <a
            class="ps-btn ps-btn--black"
            href="#"
            @click.prevent="handleAddToCart"
        >
            Add to cart
        </a>
        <div class="ps-product__actions">
            <a href="#" @click.prevent="handleAddItemToWishlist">
                <i class="icon-heart"></i>
            </a>
           
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'ModuleProductShopping',
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
       ...mapGetters({
            qtys: 'ui/qtys',
            weights: 'ui/weights',
        }),
    },
    data() {
        return {
            quantity: 1
        };
    },
    methods: {
        handleIncreaseQuantity() {
            this.quantity++;
        },

        handleDescreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },

        handleAddToCart() {
             if(this.$auth.loggedIn){
            this.$store.dispatch('myCart/create', {product: this.product.id})
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
                 localStorage.setItem('product' , this.product.id )
                localStorage.setItem('qty' , this.qty )
                this.$router.push('/account/login')
            }
        },
        
    }
};
</script>

<style lang="scss" scoped></style>
