<template lang="html">
    <client-only>
        <div class="ps-product__thumbnail " data-vertical="true">
            <img :src="product.ItemImage"/>
        </div>
    </client-only>
</template>

<script>
import { mapState , mapGetters} from 'vuex';
import { baseUrl } from '~/repositories/Repository';

export default {
    name: 'ThumbnailDefault',
    computed: {
        ...mapState({
            baseURL() {
                return baseUrl;
            }
            
        }),
        ...mapGetters({
            product:"myProduct/product",
            loading:"myProduct/loading"
        })
    },
    data() {
        return {
            swiperOptionTop: {
                loop: false,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev'
                }
            },
            swiperOptionThumbs: {
                direction: 'vertical',
                loop: false,
                spaceBetween: 10,
                slidesPerView: 3,
                centeredSlides: false,
                slideToClickedSlide: false
            },
            activeSlide: 0
        };
    },
    methods: {
        handleClickSlide(index) {
            this.activeSlide = index;
            this.swiperVariants.activeIndex = index;
            this.swiperGallery.slideTo(index, 500, false);
        }
    }
};
</script>

<style lang="scss" scoped></style>
