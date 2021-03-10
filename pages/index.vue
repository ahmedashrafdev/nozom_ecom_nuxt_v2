<template lang="html">
    <main id="homepage-4">
        <market-place2-banner />
        <market-place-deal-of-day
         v-if="!loading"
            collection-slug="deal-of-the-day"
        />
        <products-loading v-else/>
        
        <market-place2-categories />
        <market-place2-promotions />
        <div v-if="!loading">
            <market2-consumer-electronics
                v-for="group in homeGroups"
                :group="group"
            />
        </div>
        <products-loading v-else/>

        
        <!-- <market-place2-download /> -->
    </main>
</template>

<script>
import { mapState } from 'vuex';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import MarketPlace2Categories from '~/components/partials/homepage/marketplace-2/MarketPlace2Categories';
import ProductsLoading from '~/components/partials/ProductsLoading';
import MarketPlace2Promotions from '~/components/partials/homepage/marketplace-2/MarketPlace2Promotions';
import MarketPlace2Download from '~/components/partials/homepage/marketplace-2/MarketPlace2Download';
import Market2ConsumerElectronics from '~/components/partials/homepage/marketplace-2/Market2ConsumerElectronics';
import Market2Clothing from '~/components/partials/homepage/marketplace-2/Market2Clothing';
import Market2ComputerAndTechnology from '~/components/partials/homepage/marketplace-2/Market2ComputerAndTechnology';
import Market2GardenAndKitchen from '~/components/partials/homepage/marketplace-2/Market2GardenAndKitchen';
import Market2HealthyAndBeauty from '~/components/partials/homepage/marketplace-2/Market2HealthyAndBeauty';
import MarketPlace2Banner from '~/components/partials/homepage/marketplace-2/MarketPlace2Banner';
import HeaderMarketPlace2 from '~/components/shared/headers/HeaderMarketPlace2';
import MarketPlaceDealOfDay from '~/components/partials/homepage/marketplace/MarketPlaceDealOfDay';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    layout: 'layout-market-place-2',
    components: {
        HeaderMobile,
        MarketPlaceDealOfDay,
        HeaderMarketPlace2,
        MarketPlace2Banner,
        ProductsLoading,
        Market2HealthyAndBeauty,
        Market2GardenAndKitchen,
        Market2ComputerAndTechnology,
        Market2Clothing,
        Market2ConsumerElectronics,
        MarketPlace2Download,
        MarketPlace2Promotions,
        MarketPlace2Categories,
        FooterDefault
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections,
            categories: state => state.collection.categories
        })
    },
    data(){
        return {
            homeGroups : [],
            loading: true,
        }
    },
    async created() {
        this.$store.dispatch('collection/getGroups' , {home : 1})
        .then(d => {
            this.homeGroups = d
            this.loading = false
        })
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/market-place-2.scss';
</style>
