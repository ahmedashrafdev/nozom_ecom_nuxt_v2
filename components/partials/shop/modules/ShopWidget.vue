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
                    Price: EGP{{ parseInt(priceRange[0]).toFixed(2) }} - EGP{{
                        parseInt(priceRange[0]).toFixed(2)
                    }}
                </p>
            </figure>
        </aside>
    </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex';
import {addParamsToLocation } from '@/utilities/product-helper.js'
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
            let query = this.$route.query
            id == null ? delete query.GroupCode : query.GroupCode = id 
            addParamsToLocation(query , this.$store , this.$route)
        },
        async handleFilterByPriceRagne() {
            const query = this.$route.query;
            query.PriceFrom = this.priceRange[0];
            query.PriceTo = this.priceRange[1];
            addParamsToLocation(query , this.$store , this.$route)
        },
    },
    created(){
        const payload =  this.$route.query.GroupCode ? {FatherCode : this.$route.query.GroupCode} : {}
        this.$store.dispatch('collection/getShopGroups' , payload)
    }
};
</script>

<style lang="scss" scoped></style>
