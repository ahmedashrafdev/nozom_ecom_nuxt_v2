<template lang="html">
    <div class="ps-shopping" v-if="!loading">
        <div class="ps-shopping__header">
            <p>
                <strong class="mr-2">{{ products.total }}</strong>
               {{$t('products_not_found')}}
            </p>
            <div class="ps-shopping__actions">
                <select
                    class="ps-select form-control"
                    data-placeholder="Sort Items"
                    v-model="sort"
                    @change="handleSorting"
                >
                    <option value="" selected disabled>{{$t('sort_by')}}</option>
                    <option value="created_at">{{$t('sort_latest')}}</option>
                    <option value="price_low">{{$t('sort_price_low')}}</option>
                    <option value="price_high">{{$t('sort_high')}}</option>
                </select>
                <div class="ps-shopping__view">
                    <p>{{$t('view')}}</p>
                    <ul class="ps-tab-list">
                        <li :class="listView === false ? 'active' : ''">
                            <a href="#" @click.prevent="handleChangeViewMode('grid')">
                                <i class="icon-grid"></i>
                            </a>
                        </li>
                        <li :class="listView !== false ? 'active' : ''">
                            <a href="#" @click.prevent="handleChangeViewMode('list')">
                                <i class="icon-list4"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ps-shopping__content" v-if="products.data.length > 0">
            <div v-if="queries" class="ps-shopping__queries">
                <a v-for="query in queries" href="#" @click.prevent="">
                    {{ query }}
                </a>
            </div>
            <div v-if="listView === false" class="ps-shopping-product">
                <div class="row">
                    <div
                        v-for="product in products.data"
                        class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 "
                        :key="product.id"
                    >
                        <product-default :product="product" />
                    </div>
                </div>
                <footer class="mt-30">
                    <v-pagination
                        v-model="page"
                        :length="paginationLenght"
                        @input="handleChangePagination"
                    />
                </footer>
            </div>
            <div v-else class="ps-shopping-product" >
                <product-wide
                    v-for="product in products.data"
                    :product="product"
                    :key="product.id"
                />
                <footer class="mt-30">
                    <v-pagination
                        v-model="page"
                        :length="paginationLenght"
                        @input="handleChangePagination"
                    />
                </footer>
            </div>
        </div>
    </div>
    <div v-else>loading</div>
</template>

<script>
import { mapState , mapGetters } from 'vuex';
import ProductDefault from '~/components/elements/product/ProductDefault2';
import ProductWide from '~/components/elements/product/ProductWide2';

export default {
    name: 'LayoutShopSidebar',
    watchQuery: true,
    components: { ProductWide, ProductDefault },
    computed: {
        ...mapState({
            total: state => state.product.total,
            queries: state => state.collection.queries
        }),
        ...mapGetters({
            products: "myProduct/products",
            loading: "myProduct/loading",
        }),
        paginationLenght() {
            if (this.products.total % 12 === 0) {
                return parseInt(this.products.total / this.pageSize);
            } else {
                return parseInt(this.products.total / 12 + 1);
            }
        }
    },
    data() {
        return {
            listView: false,
            sort:null,
            page: 1,
            
        };
    },
    methods: {
        async handleChangePagination(value) {
            const query = Object.assign({}, this.$route.query);
            query.page = value;
            this.$router.push({ query });
            this.$store.dispatch('myProduct/getProducts' , query)

        },
        handleSorting() {
            const query = Object.assign({}, this.$route.query);
            query.sort = this.sort;
            this.$router.push({ query });
            this.$store.dispatch('myProduct/getProducts' , query)
        },
        handleChangeViewMode(val) {
            this.listView = val == 'list' ? true :false;
        }
    },
    created(){
        this.$store.dispatch('myProduct/getProducts' , this.$route.query)
    }
};
</script>

<style lang="scss" scoped></style>
