<template lang="html">
    <client-only>
        <div class="ps-product__thumbnail " data-vertical="true">
            <img :src="image"/>
        </div>
    </client-only>
</template>

<script>
export default {
    name: 'ThumbnailDefault',
    props:['image']
};
</script>

<style lang="scss" scoped></style>
