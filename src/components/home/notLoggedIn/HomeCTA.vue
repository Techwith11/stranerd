<template>
    <div id="background" :style="{backgroundImage: `url(${getImages.landing_hero})`}">
        <div class="container">
            <div class="text-left">
                <h1 class="font-weight-bold" id="headline">Get Access to Unlimited Educational Resources. Everywhere, Every time!</h1>
                <p id="subtitle">Premium access to more than 10,000 resources ranging from courses, events e.t.c.</p>
                <button class="primary-button" id="ctaButton"><router-link class="text-decoration-none text-white" to="/courses">Get Access</router-link></button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: mapGetters(['getImages'])
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/index.scss';
    #background{
        padding: 10rem 0;
        color: $text-black;
        background-size: cover;
        background-color: $gradient;
    }
    #ctaButton{
        background: $primary-dark;
        color: $white;
    }
    #headline{
        font-size: 2.75rem;
        line-height: 4.0rem;
    }
    #subtitle{
        font-size: 1.125rem;
        line-height: 1.2rem;
    }
    @media screen and (max-width: 767px){
        #background{
            padding: 7rem 0;
        }
        #headline{
            font-size: 2.0rem;
            line-height: 2.5rem;
        }
        #subtitle{
            font-size: 1rem;
            line-height: 1.2rem;
        }
    }
    @media screen and (max-width: 575px){
        #background{
            padding: 5rem 0;
        }
        #headline{
            font-size: 1.6rem;
            line-height: 2.0rem;
        }
        #subtitle{
            font-size: 1rem;
            line-height: 1.2rem;
        }
    }
</style>
