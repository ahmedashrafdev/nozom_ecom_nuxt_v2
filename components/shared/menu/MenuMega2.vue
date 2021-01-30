<template>
    <li class=" menu-item-has-children has-mega-menu">
        <nuxt-link  :to="{path:'/shop',query:{GroupCode:menuData.id}}">
            {{ menuData.GroupName }}
        </nuxt-link>
        <div class="mega-menu">
            <div
                v-for="item in menuData.children"
                class="mega-menu__column"
                :key="item.id"
            >
                <h4>{{ item.GroupName }}</h4>
                <ul class="mega-menu__list" v-if="item.children">
                    <li v-for="subItem in item.children" :key="subItem.id" >
                        <nuxt-link :to="{path:'/shop',query:{GroupCode:menuData.id}}" class="cairo">
                            {{ subItem.GroupName }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'MenuMega',
    props: {
        menuData: {
            type: Object,
            defaut: {}
        }
    }
};
</script>

<style scoped></style>
