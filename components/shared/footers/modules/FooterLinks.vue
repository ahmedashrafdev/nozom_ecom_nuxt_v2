<template lang="html">
    <div class="ps-footer__links" v-if="!loading">
        <p v-for="group in groups" :key="group.id">
            <strong>{{group.GroupName}}</strong>
            <nuxt-link
                v-for="item in group.children"
                to="/"
                :key="item.id"
            >
                {{ item.GroupName }}
            </nuxt-link>
        </p>
    </div>
    <div v-else>Loading</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'FooterLinks',
    data() {
        return {
            groups:[],
        };
    },
    computed:{
        ...mapGetters({
            loading: 'collection/twoLayersLoading',
        })
    },
    created(){
        this.$store.dispatch('collection/getGroupsTwoLayers')
        .then(d => {
            this.groups = d
        })
    }
};
</script>
