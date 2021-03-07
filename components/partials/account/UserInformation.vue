<template lang="html">
    <section class="ps-my-account ps-page--account">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="ps-section__left">
                        <SideLayout/>
                    </div>
                </div>
                <div class="col-lg-8">
                    <section class="ps-section--account-setting">
                        <div class="ps-section__content">
                            <div class="flex-space mb-20">
                                <ul>
                                    <li>email :{{$auth.user.email}}</li>
                                    <li>name :{{$auth.user.name}}</li>
                                </ul>
                                <nuxt-link to="/account/user-edit" class="btn mr-5"
                                ><i class="icon-edit"></i>Edit Account</nuxt-link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import SideLayout from '@/components/partials/account/modules/SideLayout.vue';
export default {
    name: 'UserInformation',
    components: { SideLayout },
};
</script>

<style lang="scss" scoped></style>
