<template lang="html">
    <div class="ps-promotions">
        <div class="container">
            <nuxt-link to="/shop" class="ps-collection ad">
                <div>
                    <h3>sweets&</h3>
                    <h1>snacks</h1>
                    <a href="" class="ps-btn">{{$t('shopping_now')}}</a>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MarketPlace2Promotions'
};
</script>

<style lang="scss" scoped>
.ad{
    padding: 20px 30px;
    background-image: url('https://spinneys-egypt.com/storage/slider_images/Spinneys%20Online%20Shop/BuacjKWXiYeTM4tcVAab0LmdHQmQFBgo6rCHXT1k.jpeg');
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-size: cover;
    &:hover{
        & h3 , & h1 , & a{
            transform: translateY(-10px);
        }
    }
   &  div{
       & h3{
           color: #333;
           line-height: 1;
           font-size: 64px;
           font-weight: 300;
           text-transform: uppercase;
           transition: all .3s ease-in-out;
       }
       & h1{
           color: #333;
           line-height: 1;
           font-size: 64px;
           text-transform: uppercase;
           transition: all .3s ease-in-out;
       }
       & a{
           transition: all .3s ease-in-out;

       }
   }
}
</style>
