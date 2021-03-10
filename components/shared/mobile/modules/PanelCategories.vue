<template lang="html">
    <div class="ps-panel--sidebar">
        <div class="ps-panel__header">
            <h3>Categories</h3>
            <a
                href="#"
                class="ps-panel__close"
                @click.prevent="handleClosePanel"
            >
                <i class="icon icon-cross"></i>
            </a>
        </div>
        <div class="navigation__content">
            <ul class="menu--mobile">
                <li v-for="category in groups">
                    <a @click.prevent="goToGroup(category.id)">{{ category.GroupName }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import categories from '~/static/data/static-categories.json';
import {addParamsToLocation } from '@/utilities/product-helper.js'

export default {
    name: 'PanelCategories',
    data(){
        return {
            groups : [],
            loading: true
        }
    },
    computed: {
        categories() {
            return categories;
        }
    },
    methods: {
        handleClosePanel() {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        },
        goToGroup(code){
                this.$route.query.GroupCode = code
                if(this.$route.path == '/shop'){
                    addParamsToLocation(this.$route.query , this.$store , this.$route)
                } else {
                    this.$router.push({path : '/shop' , query : this.$route.query} )
                }
                this.handleClosePanel()
        }
    },
    created(){
        this.$store.dispatch('collection/getGroupsThreeLayers')
        .then(d => {
            this.groups = d
        })
    },
};
</script>

<style lang="scss" scoped></style>
