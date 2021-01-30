<template lang="html">
    <div>
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="ps-page--shop" id="shop-sidebar">
            <div class="container">
                <div class="ps-layout--shop">
                    <div class="ps-layout__left">
                        <shop-widget/>
                    </div>
                    <div class="ps-layout__right">
                        <div class="ps-page__header">
                            <h1 class="text-uppercase">{{$t('shopPage')}}</h1>
                        </div>
                        <layout-shop-sidebar />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import LayoutShop from '~/components/partials/shop/LayoutShop';
import ShopWidget from '~/components/partials/shop/modules/ShopWidget';
import ShopBanner from '~/components/partials/shop/sections/ShopBanner';
import ShopBrands from '~/components/partials/shop/sections/ShopBrands';
import ShopCategories from '~/components/partials/shop/sections/ShopCategories';
import ShopSidebarBestSeller from '~/components/partials/shop/sections/ShopSidebarBestSeller';
import LayoutShopSidebar from '~/components/partials/shop/LayoutShopSidebar';
import ShopSidebarBanner from '~/components/partials/shop/sections/ShopSidebarBanner';

export default {
    components: {
        ShopSidebarBanner,
        LayoutShopSidebar,
        ShopSidebarBestSeller,
        ShopCategories,
        ShopBrands,
        ShopBanner,
        ShopWidget,
        LayoutShop,
        BreadCrumb
    },
    layout: 'layout-market-place-2',
    transition() {
        return 'fadeIn';
    },
    data() {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Shop'
                }
            ],
            
        };
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections,
            categories: state => state.product.categories,
            brands: state => state.product.brands
        })
    },
    
};
</script>

<style lang="scss" scoped></style>
