<template lang="html">
    <div class="header__actions">
        <nuxt-link to="/account/wishlist" class="header__extra">
            <i class="icon-heart"></i>
            <span>
                <i>{{wishlistLength}}</i>
            </span>
        </nuxt-link>
        <mini-cart />
        <div class="ps-block--user-header" v-if="!$auth.loggedIn">
            <div class="ps-block__left">
                <i class="icon-user"></i>
            </div>
            <div class="ps-block__right">
                <nuxt-link to="/account/login">
                    Login
                </nuxt-link>
                <nuxt-link to="/account/register">
                    Register
                </nuxt-link>
            </div>
        </div>
        <div v-else class="ps-block--user-account">
        <i class="icon-user"></i>
        <div class="ps-block__content">
            <ul class="ps-list--arrow">
                <li v-for="link in accountLinks" :key="link.text">
                    <nuxt-link :to="link.url">
                        {{ link.text }}
                    </nuxt-link>
                </li>
                <li class="ps-block__footer">
                    <a href="" @click.prevent="handleLogout">
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import AccountLinks from '~/components/partials/account/modules/AccountLinks';
import { mapGetters } from 'vuex';
export default {
    name: 'HeaderActions2',
    components: { AccountLinks, MiniCart },
     data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information'
                },
                {
                    text: 'Invoices',
                    url: '/account/invoices'
                },
                {
                    text: 'Address',
                    url: '/account/addresses'
                },
                {
                    text: 'Wishlist',
                    url: '/account/wishlist'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            wishlistLength : 'myWishlist/wishlistLength',
        }),

    },
     methods: {
        async handleLogout() {
            await this.$auth.logout();
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `Logged out  successfully`
            });
        }
    }
};
</script>

<style lang="scss" scoped></style>
