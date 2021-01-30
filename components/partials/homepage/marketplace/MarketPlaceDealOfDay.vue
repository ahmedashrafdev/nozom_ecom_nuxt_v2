<template lang="html">
    <div class="ps-deal-of-day ps-section--carousel-outside">
        <div class="container">
            <div class="ps-section__header">
                <div class="ps-block--countdown-deal">
                    <div class="ps-block__left">
                        <h3>{{$t('deal_of_day')}}</h3>
                    </div>
                    <div class="ps-block__right">
                        <figure>
                            <figcaption>{{$t('end_at')}}:</figcaption>
                            <count-down-simple
                                time="12 30 2020, 6:00 am"
                                time-format="MM DD YYYY, h:mm a"
                            />
                        </figure>
                    </div>
                </div>
                <nuxt-link to="/shop">
                    <a>{{$t('view_all')}}</a>
                </nuxt-link>
            </div>
            <div class="ps-section__content">
                <carousel-arrows type="simple" />
                <div class="ps-carousel " v-swiper:mySwiper="carouselSetting">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-if="!loading" v-for="product in products">
                            <product-default :product="product" />
                        </div>
                        <div v-else>Loading</div>
                    </div>
                    <!--Carousel controls-->
                    <div class="swiper-pagination swiper-pagination-bullets" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductDefault from '~/components/elements/product/ProductDefault2';
import { mapState } from 'vuex';
import { carouselStandard } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';
import CountDown from '~/components/elements/commons/CountDown';
import CountDownSimple from '~/components/elements/commons/CountDownSimple';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
    name: 'MarketPlaceDealOfDay',
    components: { CarouselArrows, CountDownSimple, CountDown, ProductDefault },
    props: {
        collectionSlug: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections,
            categories: state => state.collection.categories
        }),

        carouselSetting() {
            return carouselStandard;
        },
    },
    data(){
        return{
            products : [],
            loading: true
        }
    },
    created(){
        this.$store.dispatch('myProduct/getProducts' , {Sale : 1})
        .then(res => {
            this.products = res.data
            this.loading = false
        })
    }
};
</script>
<style lang="scss" scoped></style>
