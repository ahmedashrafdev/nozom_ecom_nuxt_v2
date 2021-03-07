<template lang="html">
    <section
        class="ps-product-list ps-section--carousel-outside"
        :id="`place2-consumer-electronic-${group.id}`"
    >
        <div class="container">
            <div class="ps-section__header">
                <h3>{{group.GroupName}}</h3>
                <ul class="ps-section__links">
                    <li>
                        <nuxt-link :to="`/shop?GroupCode=${group.id}`" >
                            {{$t('view_all')}}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="ps-section__content">
                <carousel-arrows type="simple" />
                <div class="ps-carousel" v-swiper:mySwiper="carouselSetting">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="product in group.products">
                            <product-default :product="product" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ProductDefault from '~/components/elements/product/ProductDefault2';
import { mapState } from 'vuex';
import { carouselStandard } from '~/utilities/carousel-helpers';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
    name: 'Market2ConsumerElectronics',
    components: { CarouselArrows, ProductDefault },
    props: {
        collectionSlug: {
            type: String,
            default: ''
        },
        group: {
            type : Object,
            required : true
        }
    },
    computed: {
        ...mapState({
            categories: state => state.collection.categories
        }),

        // products() {
        //     return getColletionBySlug(this.categories, this.collectionSlug);
        // }
    },
    data() {
        return {
            carouselSetting: {
                ...carouselStandard,
                navigation: {
                    nextEl: `#place2-consumer-electronic-${this.group.id} .swiper-next`,
                    prevEl: `#place2-consumer-electronic-${this.group.id} .swiper-prev`
                }
            },
            
        };
    },
};
</script>
<style lang="scss" scoped></style>
