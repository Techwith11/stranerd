<template>
    <div id="background" :style="{backgroundImage: `url(${getImages.success_hero})`}">
        <div class="container d-flex justify-content-center align-items-center">
            <div>
                <h2 class="font-weight-bold">Success Stories From Our Students WorldWide!</h2>
                <p class="small">Semaj Africa is an online education platform that delivers video courses, programs and resources for Individual, Advertising & Media Specialist, Online Marketing Professionals,
                    Freelancers and anyone looking to pursue a career in digital marketing, Accounting, Web development, Programming. Multimedia and CAD design.
                </p>
                <button class="white-button"><router-link class="text-secondary text-decoration-none" to="/tutors">Discover</router-link></button>
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
    #background{
        background-color: $gradient-reversed;
        padding: 5rem 0;
        color: $white;
    }
    h2{
        line-height: 4rem;
    }
</style>
