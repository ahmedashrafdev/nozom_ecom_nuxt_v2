<template>
    <li class=" menu-item-has-children dropdown">
        <nuxt-link  :to="{path:'/shop',query:{GroupCode:menuData.id}}" class="cairo">
            {{ menuData.GroupName }}
        </nuxt-link>
        <ul v-if="menuData.children.length > 0" class="sub-menu">
            <MenuDropdown
                v-for="item in menuData.children"
                :menu-data="item"
                :key="item.id"
            />
        </ul>
    </li>
</template>

<script>
export default {
    name: 'MenuDropdown',
    props: {
        menuData: {
            type: Object,
            defaut: {}
        }
    },
    data: () => {
        return {};
    }
};
</script>

<style scoped>
.menu-item-has-children:hover > ul.sub-menu{
    visibility: visible !important;
    opacity: 1 !important;
}
ul.sub-menu{
    left: 100%  !important;
    top: 0!important;

}
</style>
