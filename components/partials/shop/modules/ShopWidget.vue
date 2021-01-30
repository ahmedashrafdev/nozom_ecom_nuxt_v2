<template lang="html">
    <div id="shop-widgets">
        <div v-if="loading">
            Loading
        </div>
        <div v-else>
            <aside class="widget widget_shop" v-if="groups.length > 0">
                <h4 class="widget-title">
                    {{ $t('shop.widget.categories') }}
                </h4>
                <ul  class="ps-list--categories">
                    <li>
                        <a href="#" @click.prevent="handleGotoCategory(null)">
                            {{$t('all_cats')}}
                        </a>
                    </li>
                    <li v-for="group in groups" :key="groups.id">
                        <a
                            href="#"
                            @click.prevent="handleGotoCategory(group.id)"
                        >
                            {{ group.GroupName }}
                        </a>
                    </li>
                </ul>
            </aside>
        </div>
        <aside class="widget widget_shop">
            <figure>
                <div class="flex">
                    <h4 class="widget-title">
                        {{ $t('shop.widget.byPrice') }}
                    </h4>
                     <div class="flex">
                         <v-text-field
                            v-model="priceRange[0]"
                            class="ps-text-field"
                            :placeholder="$t('from')"
                            height="30"
                            outlined
                        />
                        <v-text-field
                            v-model="priceRange[1]"
                            class="ps-text-field"
                            :placeholder="$t('to')"
                            height="30"
                            outlined
                        />
                        
                    </div>
                </div>
                <v-range-slider
                    v-model="priceRange"
                    color="warning"
                    min="0"
                    max="1500"
                    track-color="#dddddd"
                    @end="handleFilterByPriceRagne"
                />
                <p>
                    Price: EGP{{ priceRange[0].toFixed(2) }} - EGP{{
                        priceRange[1].toFixed(2)
                    }}
                </p>
            </figure>
        </aside>
    </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex';
import { getColletionBySlug } from '~/utilities/product-helper';
import { serializeQuery } from '~/repositories/Repository';

export default {
    name: 'ShopWidget',
    watchQuery: true,
    computed: {
        ...mapState({
            categories: state => state.product.categories,
            brands: state => state.product.brands,
            products: state => state.product.products
        }),
        ...mapGetters({
            groups:"collection/shopGroups",
            loading:"collection/loading"
        }),
        categorySlug() {
            return this.$route;
        }
    },
    data() {
        return {
            priceRange: [100, 1000],
            selectedBrands: [],
        };
    },
    methods: {
        handleGotoCategory(id) {
            if(id === null){
                const query = Object.assign({}, this.$route.query);
                query.page = 1;
                delete query.GroupCode;
                this.$router.push({ query });
                this.getGroups()
                console.log('asd')
                this.$store.dispatch('myProduct/getProducts' , query)
            } else {
                const query = Object.assign({}, this.$route.query);
                query.page = 1;
                query.GroupCode = id;
                this.$router.push({ query });
                console.log('asd')
                this.$store.dispatch('myProduct/getProducts' , query)
                this.getGroups()
            }
        },
        async handleFilterByPriceRagne() {
            const query = Object.assign({}, this.$route.query);
            query.page = 1;
            query.PriceFrom = this.priceRange[0];
            query.PriceTo = this.priceRange[1];
            this.$router.push({ query });
            this.$store.dispatch('myProduct/getProducts' , query)
            this.getGroups()
        },

        getGroups(){
            const payload = this.$route.query.GroupCode ? {FatherCode : this.$route.query.GroupCode} : {}
            this.$store.dispatch('collection/getShopGroups' , payload)
        }
        
    },
    created(){
        this.getGroups()
    }
};
</script>

<style lang="scss" scoped></style>
