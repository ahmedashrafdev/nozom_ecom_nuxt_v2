<template lang="html">
    <div class="ps-panel--sidebar">
        <div class="ps-panel__header">
            <h3>Menu</h3>
            <a
                href="#"
                class="ps-panel__close"
                @click.prevent="handleClosePanel"
            >
                <i class="icon icon-cross"></i>
            </a>
        </div>
        <div class="ps-panel__content">
            <div class="ps-site-actions">
                <div class="row">
                    <div class="col-12">
                        <mobile-languge-switcher />
                    </div>
                </div>
            </div>
            <v-list class="menu--mobile">
                <template v-for="menuItem in menu">
                    <v-list-item>
                        <v-list-item-content>
                            <nuxt-link
                                :to="menuItem.url"
                                @click="handleClosePanel"
                            >
                                {{ $t(menuItem.text) }}
                            </nuxt-link>
                        </v-list-item-content>
                    </v-list-item>
                </template>
                <template v-for="group in groups">
                    <v-list-item>
                        <v-list-item-content>
                            <a
                                @click="goToGroup(group.id)"
                            >
                                {{ $t(group.GroupName) }}
                            </a>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </div>
    </div>
</template>

<script>
import {addParamsToLocation } from '@/utilities/product-helper.js'
import { mapGetters } from 'vuex';
import { mainMenu } from '~/static/data/menu.json';
import MobileSubmenu from '~/components/shared/mobile/modules/MobileSubmenu';
import MobileCurrencySwitcher from '~/components/shared/mobile/modules/MobileCurrencySwitcher';
import MobileLangugeSwitcher from '~/components/shared/mobile/modules/MobileLangugeSwitcher';
export default {
    name: 'PanelMenu',
    components: {
        MobileLangugeSwitcher,
        MobileCurrencySwitcher,
        MobileSubmenu
    },

    computed: {
         ...mapGetters({
            groups: 'collection/featuredGroups',
            loading: 'collection/loading',
        }),
         menu() {
            return mainMenu;
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
    }
};
</script>

<style lang="scss" scoped></style>
