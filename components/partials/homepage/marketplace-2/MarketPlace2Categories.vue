<template lang="html">
    <div class="ps-home-categories">
        <div class="container">
            <div class="ps-section__header">
                <h3>{{$t('top_cats')}}</h3>
            </div>
            <div class="ps-section__content">
                <div class="row align-content-lg-stretch">
                    <div v-if="loading">Loading</div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 " v-else v-for="group in groups" :key="group.id">
                        <nuxt-link :to="{path:'/shop',query:{GroupCode:group.id}}">
                            <div class="ps-block--category-2" :style="`background-image: url(${group.image});`" data-mh="categories">
                                <div class="ps-block__content">
                                    <h4>{{group.GroupName}}</h4>
                                    <a href="" class="ps-btn">{{$t('shopping_now')}}</a>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'MarketPlace2Categories',
    computed: {
         ...mapGetters({
            groups: 'collection/featuredGroups',
            loading: 'collection/loading',
        })
    },
    created(){
        this.$store.dispatch('collection/getGroups' , {featured : 1})
    }
};
</script>

<style lang="scss" scoped></style>
