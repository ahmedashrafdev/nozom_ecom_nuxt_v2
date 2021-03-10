<template lang="html">
    <div class="martfury">
        <bread-crumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="ps-page--product">
            <div class="ps-container">
                <div class="ps-page__container">
                    <div class="ps-page__left" v-if="!loading">
                        <product-detail-fullwidth v-if="product !== null" :product="product" />
                    </div>
                    <div class="ps-page__left" v-else>
                        Loading
                    </div>
                </div>
            </div>
        </div>
        <newsletters layout="fullwidth"/>
    </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import LayoutProduct from '~/layouts/layout-product';
import Newsletters from '~/components/partials/commons/Newsletters';
export default {
    layout: 'layout-product',
    transition: 'zoom',
    layout: 'layout-market-place-2',
    components: {
        Newsletters,
        LayoutProduct,
        ProductWidgets,
        RelatedProduct,
        CustomerBought,
        BreadCrumb,
        ProductDetailFullwidth
    },

    computed: {
        ...mapGetters({
            product:"myProduct/product",
            loading:"myProduct/loading",
            qtys: 'ui/qtys',
            weights: 'ui/weights',
        })
    },
    data() {
        return {
            productId: this.$route.params.id,
            qty : 1,
            breadCrumb: null,
            pageLoading: true
        };
    },
    async created() {
        this.$store.dispatch('myProduct/getProduct' ,  this.$route.params.id)
    },
    mounted() {
        this.$store.commit('app/setAppDrawer', false);
    }
};
</script>

<style lang="scss" scoped></style>
