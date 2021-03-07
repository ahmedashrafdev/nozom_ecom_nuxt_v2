<template lang="html">
    <div class="navigation__right">
        <nuxt-link to="/account/shopping-cart" class="header__extra">
            <i class="icon-bag2"></i>
            <span>
                <i>{{cartLength}}</i>
            </span>
        </nuxt-link>
        <nuxt-link v-if="!$auth.loggedIn" to="/account/login" class="header__extra">
            <i class="icon-user"></i>
        </nuxt-link>
        <nuxt-link v-else to="/account/user-information" class="header__extra">
            <i class="icon-user"></i>
        </nuxt-link>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'MobileHeaderActions',
    computed:{
        ...mapGetters({
            cartLength : 'myCart/cartLength',
            loading : 'myCart/loading'
        }),
    }
};
</script>

<style lang="scss" scoped></style>
