<template lang="html">
    <div class="ps-form__billing-info">
        <h3 class="ps-form__heading">
            Checkout
        </h3>
        <div v-if="addresses.length > 0">
            <div class="form-group"  >
                <label>
                    Address
                </label>
                <select class="form-control" @change="applyAddress"  v-model="form.address_id">
                    <option disabled selected>Select Address</option>
                    <option v-for="address in addresses" :key="address.id" :value="address.id">{{address.BuildingNo}}</option>
                </select>
                <div class="err-list" v-if="msg.address_id">
                        <ul>
                        <li class="error" v-for="err in msg.address_id">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
                <!-- <span @click.>Add New Address</span> -->
            <div class="ps-form__submit mt-8">
                <nuxt-link to="/account/shopping-cart">
                    <i class="icon-arrow-left mr-1"></i>
                    Return to shopping cart
                </nuxt-link>
                <div class="ps-block__footer">
                    <button class="ps-btn" @click="cehckout">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
        <FormCreateAddress v-else class="mt-8" @created="addressCreated"/>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FormCreateAddress from '~/components/partials/account/modules/FormCreateAddress';
export default {
    name: 'FormCheckoutInformation',
    data(){
        return {
            form : {
                address_id : null
            },
            isLoading:false,
            msg:"",
        }
    },
    components:{
        FormCreateAddress
    },
    computed: {
        ...mapGetters({
            addresses: 'user/addresses'
        })
    },
    methods: {
        cehckout() {
            this.$store.dispatch('myCart/checkout')
            .then(() => {
                this.$notify({
                    group: 'addCartSuccess',
                    title: 'Success!',
                    text: `Order Placed Successfully!`
                });
                this.$router.push('/account/invoices')
            })
        },
        applyAddress() {
            this.$store.dispatch('myCart/applyAddress' , this.form.address_id)
        },
        addressCreated(id){
            this.form.address_id = id
            this.$store.dispatch('myCart/applyAddress' , this.form.address_id)
            .then(() => {
                this.cehckout()
            })
        }
        
    },
    created(){
        this.$store.dispatch('user/getAddresses')
        this.$store.dispatch('myCart/get')
        .then(res => {
            this.address_id = res.address_id
        })
    }
};
</script>

<style lang="scss" scoped></style>
