<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <wishlist />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Wishlist from '~/components/partials/account/Wishlist';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    middleware: 'auth',
    transition: 'zoom',
    components: {
        HeaderMobile,
        Wishlist,
        BreadCrumb
    },

    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Wishlist'
                }
            ]
        };
    },

};
</script>

<style lang="scss" scoped></style>
