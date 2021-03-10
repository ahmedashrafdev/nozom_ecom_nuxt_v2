<template lang="html">
    <div class="ps-product--detail ps-product--fullwidth">
        <div class="ps-product__header">
            <thumbnail-default :image="product.ItemImage" />
            <information-default :product="product" />
        </div>
    </div>
</template>

<script>
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import InformationDefault from '~/components/elements/detail/information/InformationDefault';

export default {
    name: 'ProductDetailFullwidth',
    props:['product'],
    components: { InformationDefault , ThumbnailDefault }
};
</script>

<style lang="scss" scoped></style>
