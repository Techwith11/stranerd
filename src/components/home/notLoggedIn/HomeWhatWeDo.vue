<template>
    <div id="background">
        <div class="container">
            <h2>What We Do</h2>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <img :src="getImages.what_we_do[0]" alt="" class="w-100">
                    <p class="lead text-center">
                        We understand how difficult studying can be especially as students. But that's why Stranerd is here!
                    </p>
                </div>
                <div class="col-md-4 mb-4">
                    <img :src="getImages.what_we_do[1]" alt="" class="w-100">
                    <p class="lead text-center">
                        We are a group of talented individuals with the aim of helping students to succeed effortlessly.
                    </p>
                </div>
                <div class="col-md-4 mb-4">
                    <img :src="getImages.what_we_do[2]" alt="" class="w-100">
                    <p class="lead text-center">
                        We help you like we have helped others get ahead with assignments, projects, tests and exams.
                    </p>
                </div>
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
        padding: 4rem 0;
        background: $primary-light;
        color: $text-black;
        text-align: center;
    }
    h2{
        color: $primary-dark;
        margin-bottom: 3rem;
        font-size: 2.0rem;
        font-weight: bold;
    }
    p{
        margin-top: 2rem;
        margin-bottom: 3rem;
    }
</style>
