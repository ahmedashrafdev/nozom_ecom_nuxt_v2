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
                    <FormCreateAddress @created="$router.push('/account/addresses')"/>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SideLayout from '@/components/partials/account/modules/SideLayout.vue';
import FormCreateAddress from '~/components/partials/account/modules/FormCreateAddress';

export default {
    name: 'CreateAddress',
    components: { SideLayout, FormCreateAddress },
    
};
</script>

<style lang="scss" scoped></style>
