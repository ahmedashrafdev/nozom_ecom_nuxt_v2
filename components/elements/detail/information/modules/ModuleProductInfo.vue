<template lang="html">
    <div>
        <h1>{{ product.title }}</h1>
        <div class="ps-product__meta">
            
            <div class="ps-product__rating">
                <rating />
                <span>(1 review)</span>
            </div>
        </div>
        <h4 v-if="product.NewPOSPP" class="ps-product__price sale">
            <del class="mr-2"> EGP{{ product.POSPP }}</del>
            EGP{{ product.NewPOSPP }}
        </h4>
        <h4 v-else class="ps-product__price">
            EGP{{ product.NewPOSPP }}
        </h4>
    </div>
</template>

<script>
import Rating from '~/components/elements/Rating';
export default {
    name: 'ModuleProductInfo',
    components: { Rating },
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" scoped></style>
