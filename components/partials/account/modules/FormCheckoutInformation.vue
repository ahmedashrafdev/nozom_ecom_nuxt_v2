<template lang="html">
    <div class="ps-form__billing-info">
        <h3 class="ps-form__heading">
            Checkout
        </h3>
        <div v-if="addresses.length > 0">
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <div class="form-group"  >
                    <label>
                        Address
                    </label>
                    <v-select
                    v-model="form.address_id"
                    @change="applyAddress"
                    :items="addresses"
                    item-value="id"
                    item-text="BuildingNo"
                    :rules="[v => !!v || 'Item is required']"
                    label="Select Address"
                    required
                    ></v-select>
                
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
                        <button class="ps-btn" @click.prevent="cehckout">
                            Checkout
                        </button>
                    </div>
                </div>
            </v-form>
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
            valid: true,
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
            this.$refs.form.validate()
            if(this.valid){
                this.$store.dispatch('myCart/checkout')
                .then(() => {
                    this.$notify({
                        group: 'addCartSuccess',
                        title: 'Success!',
                        text: `Order Placed Successfully!`
                    });
                    this.$router.push('/account/invoices')
                })
            }
        },
        applyAddress() {
            this.$store.dispatch('myCart/applyAddress' , this.form.address_id)
        },
        addressCreated(id){
            this.form.address_id = id
            this.$store.dispatch('myCart/applyAddress' , this.form.address_id)
            .then(() => {
                this.$store.dispatch('myCart/checkout')
                .then(() => {
                    this.$notify({
                        group: 'addCartSuccess',
                        title: 'Success!',
                        text: `Order Placed Successfully!`
                    });
                    this.$router.push('/account/invoices')
                })
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
