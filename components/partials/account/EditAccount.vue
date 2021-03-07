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
                    <FormEditAccount />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import FormEditAccount from '~/components/partials/account/modules/FormEditAccount';
import SideLayout from '@/components/partials/account/modules/SideLayout.vue';

export default {
    name: 'EditAccount',
    components: { SideLayout, FormEditAccount },
};
</script>

<style lang="scss" scoped></style>
