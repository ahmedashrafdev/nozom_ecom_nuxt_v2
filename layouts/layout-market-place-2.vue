<template lang="html">
    <client-only>
        <v-app  :class="$i18n.locale">
            <v-main>
                <header-market-place2 />
                <header-mobile />
                <nuxt></nuxt>
                <notify/>
                <footer-default />
                <navigation-list />
                <mobile-drawer />
            </v-main>
        </v-app>
    </client-only>
</template>

<script>
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import HeaderMarketPlace from '~/components/shared/headers/HeaderMarketPlace';
import NavigationList from '~/components/shared/mobile/NavigationList';
import MobileDrawer from '~/components/shared/mobile/MobileDrawer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import HeaderMarketPlace2 from '~/components/shared/headers/HeaderMarketPlace2';
import Notify from '~/components/elements/commons/notify';
export default {
    components: {
        Notify,
        HeaderMarketPlace2,
        FooterDefault,
        MobileDrawer,
        NavigationList,
        HeaderMarketPlace,
        HeaderMobile,
        HeaderDefault
    }
};
</script>

<style lang="scss" scoped></style>
