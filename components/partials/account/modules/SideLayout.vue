<template>
    <aside class="ps-widget--account-dashboard">
        <div class="ps-widget__header">
            <img src="/img/users/3.jpg" />
            <figure>
                <figcaption>Hello</figcaption>
                <p>{{this.$auth.user.email}}</p>
            </figure>
        </div>
        <div class="ps-widget__content">
            <AccountLinks :links="accountLinks" />
        </div>
    </aside>
</template>
<script>
import AccountLinks from '@/components/partials/account/modules/AccountLinks';
export default {
    components: { AccountLinks },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information',
                    icon: 'icon-user'
                },
                {
                    text: 'Invoices',
                    url: '/account/invoices',
                    icon: 'icon-papers'
                },
                {
                    text: 'Address',
                    url: '/account/addresses',
                    icon: 'icon-map-marker'
                },
                {
                    text: 'Wishlist',
                    url: '/account/wishlist',
                    icon: 'icon-heart'
                }
            ]
        };
    }
}
</script>