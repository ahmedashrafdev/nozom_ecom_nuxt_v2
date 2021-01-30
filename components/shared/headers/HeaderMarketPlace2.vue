<template lang="html">
    <header
        class="header header--standard header--market-place-2"
        id="headerSticky"
    >
        <div class="header__top">
            <div class="container">
                <div class="header__left">
                    <p>{{$t("welcomeText")}}</p>
                </div>
                <div class="header__right">
                    <ul class="header__top-links">
                        <li>
                            <nuxt-link to="/vendor/store-list">
                                {{$t('store_location')}}
                            </nuxt-link>
                        </li>
                        <li>
                            <language-swicher />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="header__content">
            <div class="container">
                <div class="header__content-left">
                    <nuxt-link to="/" class="ps-logo">
                        <img src="~/static/img/logo.png" alt="logo" />
                    </nuxt-link>
                </div>
                <div class="header__content-center">
                    <search-header />
                </div>
                <div class="header__content-right">
                    <header-actions2 />
                </div>
            </div>
        </div>
        <nav class="navigation">
            <div class="container">
                <ul class="menu menu--market-2 flex">
                    <!-- <menu-categories /> -->
                    <div class="menu--product-categories">
                        <nuxt-link class="menu__toggle" :to="{path:'/shop'}">
                            <span> {{$t('all_cats')}}</span>
                        </nuxt-link>
                        <div class="menu__content">
                            <menu-categories />
                        </div>
                    </div>
                    <li v-for="group in groups" :key="group.id">
                        <nuxt-link :to="{path : '/shop' , query : {GroupCode : group.id}}" class="cairo">
                            {{ group.GroupName }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import MenuCategories from '~/components/shared/menu/MenuCategories';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import HeaderActions2 from '~/components/shared/headers/modules/HeaderActions2';
import { stickyHeader } from '~/utilities/common-helpers';
import { mapGetters } from 'vuex';
export default {
    name: 'HeaderMarketPlace2',
    components: {
        HeaderActions2,
        SearchHeader,
        MenuCategories,
        LanguageSwicher,
        CurrencyDropdown
    },
    computed: {
         ...mapGetters({
            groups: 'collection/featuredGroups',
            loading: 'collection/loading',
        })
    },
    data() {
        return {
            menuMarket2: [
                {
                    text: 'Computers',
                    url: '/shop'
                },
                {
                    text: 'Furnitures',
                    url: '/shop'
                },
                {
                    text: 'Mom & baby',
                    url: '/shop'
                },
                {
                    text: 'Book & More',
                    url: '/shop'
                }
            ]
        };
    },
    created(){
        this.$store.dispatch('collection/getGroups' , {featured : 1})
    },
    mounted() {
        window.addEventListener('scroll', stickyHeader);
    }
};
</script>

<style lang="scss" scoped></style>
