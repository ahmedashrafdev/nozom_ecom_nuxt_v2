<template lang="html">
    <div class="ps-product--detail ps-product--fullwidth">
        <div class="ps-product__header">
            <thumbnail-default />
        </div>
    </div>
</template>

<script>
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';

export default {
    name: 'ProductDetailFullwidth',
    components: { ThumbnailDefault }
};
</script>

<style lang="scss" scoped></style>
