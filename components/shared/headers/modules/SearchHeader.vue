<template lang="html">
    <form
        class="ps-form--quick-search"
        @submit.prevent="handleSubmit"
        v-click-outside="handleClickOutside"
    >
        <div class="ps-form__categories">
            <select class="form-control" v-model="group">
                <option :value="null">
                    {{$t('all')}}
                </option>
                <option v-for="item in groups" :value="item.id" v-if="!loading">
                    {{ item.GroupName }}
                </option>
                <span v-else>{{$t('loading')}}</span>
                    
            </select>
        </div>
        <div class="ps-form__input">
            <input
                v-model="searchText"
                class="form-control"
                type="text"
                :placeholder="$t('search_placeholder')"
                @keyup="handleSearchProduct"
            />
            <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="#fcb800"
                width="2"
                size="16"
            />
        </div>

        <button>{{ $t('menu.navigationList.search') }}</button>
        <div
            :class="
                `ps-panel--search-result ${
                    isSearching === true && isLoading === false ? 'active' : ''
                }`
            "
        >
            <div class="ps-panel__content">
                <template v-if="searchResults && searchResults.length > 0">
                    <product-result
                        v-for="product in searchResults"
                        :product="product"
                        :key="product.id"
                    />
                </template>
                <span>{{$t('search_notfound')}}</span>
            </div>
            <div class="ps-panel__footer text-center">
                <nuxt-link :to="`/shop?search=${searchText}&GroupCode=${group}`">
                    {{$t('see_all')}}
                </nuxt-link>
            </div>
        </div>
    </form>
</template>

<script>
import { mapState , mapGetters } from 'vuex';
import ProductResult from '~/components/elements/product/ProductResult2';

export default {
    name: 'SearchHeader',
    components: { ProductResult },
    computed: {
        ...mapGetters({
            loading: 'collection/loading',
        })
    },
    data() {
        return {
            groups : [],
            searchResults: [],
            group:null,
            isSearching: false,
            isLoading: false,
            searchText: ''
        };
    },
    methods: {
        async handleSearchProduct(e) {
            if (e.target.value.length > 2) {
                this.isSearching = true;
                const query = {
                    Search: e.target.value
                };
                this.group != null ? query.GroupCode = this.group : ''
                this.isLoading = true;
                setTimeout(()=>{
                    this.$store.dispatch('myProduct/searchProducts',query)
                    .then(d => {
                        this.searchResults = d
                        setTimeout(
                            function() {
                                this.isLoading = false;
                            }.bind(this),
                            500
                        );
                    });
                }, 2000)
            } else {
                this.isSearching = false;
            }
        },
        handleClickOutside() {
            this.searchText = '';
            this.isSearching = false;
            this.isLoading = false;
        },

        handleSubmit() {
            if (this.searchText !== null || this.searchText !== '') {
                this.$router.push(`/search?keyword=${this.searchText}`);
            }
        }
    },
    created(){
        this.$store.dispatch('collection/getGroups' , {})
        .then(d => {
            this.groups = d
        })
    }
};
</script>

<style lang="scss" scoped>
.ps-form--quick-search {
    .ps-form__input {
        position: relative;
        width: 100%;
        .v-progress-circular {
            @include vertical-align();
            right: 10px;
            z-index: 20;
        }
    }
}
</style>
