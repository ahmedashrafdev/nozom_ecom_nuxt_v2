<template lang="html">
    <form>
        <div class="ps-form__content">
            <div class="mb-10" v-if="msg">
                <span class="error" v-if="typeof msg == 'string'">{{msg}}</span>
            </div>
            <h5>Log In Your Account</h5>
            <div class="form-group">
                <v-text-field
                    v-model="emailOrPhone"
                    class="ps-text-field"
                    :error-messages="emailOrPhoneErrors"
                    @input="$v.emailOrPhone.$touch()"
                    placeholder="Phone or email"
                    height="50"
                    outlined
                />
                <div  class="err-list" v-if="msg && msg.email">
                     <ul>
                        <li class="error" v-for="err in msg.email">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    type="password"
                    class="ps-text-field"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    placeholder="Please enter password"
                    height="50"
                    outlined
                />
                <div  class="err-list" v-if="msg && msg.passowrd">
                     <ul>
                        <li class="error" v-for="err in msg.passowrd">
                            {{err}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="form-group">
                <v-checkbox label="Remember me" color="warning" />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                    v-if="isLoading"
                >
                    Loading
                </button>
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                    v-else
                >
                    Login
                </button>
            </div>
        </div>
       <!-- <div class="ps-form__footer">
            <p>Connect with:</p>
            <ul class="ps-list--social">
                <li>
                    <a href="#" class="facebook">
                        <i class="fa fa-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="google">
                        <i class="fa fa-google-plus"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="twitter">
                        <i class="fa fa-twitter"></i>
                    </a>
                </li>
                <li>
                    <a href="#" class="instagram">
                        <i class="fa fa-instagram"></i>
                    </a>
                </li>
            </ul>
        </div>!-->
    </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mapGetters } from 'vuex';


export default {
    name: 'Login',
    computed: {
        emailOrPhoneErrors() {
            const errors = [];
            if (!this.$v.emailOrPhone.$dirty) return errors;
            !this.$v.emailOrPhone.required && errors.push('This field is required');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('This field is required');
            return errors;
        },
        ...mapGetters({
            msg: 'ui/errMsg',
            cartPyaload: 'myAuth/cartPayload',
        })
    },
    data() {
        return {
            emailOrPhone: "test@test.com",
            password: "123456",
           
            isLoading: false,

        };
    },
    validations: {
        emailOrPhone: { required },
        password: { required },
    },
    methods: {
       async handleSubmit()  {
            this.isLoading = true
            this.$v.$touch();
            if (!this.$v.$invalid) {
                const payload = {emailOrPhone : this.emailOrPhone , password :this.password}
                    this.$auth
                    .loginWith('local', { data: payload })
                    .then(()=>{
                        this.$notify({
                            group: 'addCartSuccess',
                            title: 'Success!',
                            text: `you have been logged in successfully`
                        });
                        if(localStorage.getItem('product')){
                            const payload = {
                                product : localStorage.getItem('product'),
                                qty : localStorage.getItem('qty')
                            }
                            this.$store.dispatch('myCart/create' , payload)
                            .then(() => {
                                localStorage.removeItem('product')
                                localStorage.removeItem('qty')
                            })
                        }
                        this
                        this.$store.dispatch('myCart/get')
                        this.isLoading = false

                    })  
               
                
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ps-form--account .ps-form__content {
    padding: 30px;
}
</style>
