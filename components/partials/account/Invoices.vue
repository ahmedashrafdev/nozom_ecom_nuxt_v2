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
                    <div class="ps-page__content">
                        <div class="ps-section--account-setting">
                            <div class="ps-section__header">
                                <h3>Invoices</h3>
                            </div>
                            <div class="ps-section__content">
                                <TableInvoices :orders="orders"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import SideLayout from '@/components/partials/account/modules/SideLayout.vue';
import TableInvoices from './modules/TableInvoices';
import { mapGetters } from 'vuex';
export default {
    name: 'InvoiceDetail',
    components: { TableInvoices, SideLayout },
     computed: {
        ...mapGetters({
            orders : 'myCart/orders',
            loading : 'myCart/loading'
        }),

    },
    created(){
        this.$store.dispatch('myCart/getOrders')
    },
    
};
</script>

<style lang="scss" scoped></style>
