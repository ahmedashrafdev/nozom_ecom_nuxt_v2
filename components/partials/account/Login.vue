<template lang="html">
    <form>
        <div class="ps-form__content">
            <div class="mb-10" v-if="errMsg">
                <span class="error" v-if="typeof errMsg == 'string'">{{errMsg}}</span>
            </div>
            <h5>Log In Your Account</h5>
            <div class="form-group">
                <v-text-field
                    v-model="username"
                    class="ps-text-field"
                    :error-messages="usernameErrors"
                    @input="$v.username.$touch()"
                    placeholder="Usernamer or email"
                    height="50"
                    outlined
                />
                <div  class="err-list" v-if="errMsg && errMsg.email">
                     <ul>
                        <li class="error" v-for="err in errMsg.email">
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
                <!-- <div  class="err-list" v-if="errMsg.password">
                     <ul>
                        <li class="error" v-for="err in errMsg.password">
                            {{err}}
                        </li>
                    </ul>
                </div> -->
            </div>
            <div class="form-group">
                <v-checkbox label="Remember me" color="warning" />
            </div>
            <div class="form-group submit">
                <button
                    type="submit"
                    class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleSubmit"
                >
                    Login
                </button>
            </div>
        </div>
        <div class="ps-form__footer">
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
        </div>
    </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import { mapGetters } from 'vuex';

export default {
    name: 'Login',
    computed: {
        usernameErrors() {
            const errors = [];
            if (!this.$v.username.$dirty) return errors;
            !this.$v.username.required && errors.push('This field is required');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required && errors.push('This field is required');
            return errors;
        },
         ...mapGetters({
            errMsg: 'ui/errMsg',
        })
    },
    data() {
        return {
            username: "test@test.com",
            password: 1234561,
            isLoading: false
        };
    },
    validations: {
        username: { required },
        password: { required }
    },
    methods: {
        async handleSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
               try {
                    await this.$auth.loginWith('local', { data: {emailOrPhone : this.username , password :this.password} })
                    this.isLoading = false

                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
