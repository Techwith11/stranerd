<template>
    <div id="background">
        <div class="container">
            <!--<h5 class="text-center mb-5" id="primary-text">Why Stranerd</h5>-->
            <div class="d-flex flex-column flex-md-row">
                <div class="col-md-4 mb-5 mb-md-0">
                    <img :src="getImages.icons.unlimited_access" alt="" class="icons" />
                    <h3 class="icon-title">Unlimited Access</h3>
                    <p class="icon-subtitle">One subscription unlimited access</p>
                </div>
                <div class="col-md-4 mb-5 mb-md-0">
                    <img :src="getImages.icons.expert_teacher" alt="" class="icons" />
                    <h3 class="icon-title">Expert Teachers</h3>
                    <p class="icon-subtitle">Learn from industry experts who are passionate about teaching</p>
                </div>
                <div class="col-md-4 mb-5 mb-md-0">
                    <img :src="getImages.icons.learn_anywhere" alt="" class="icons" />
                    <h3 class="icon-title">Learn Anywhere</h3>
                    <p class="icon-subtitle">Switch between your computer, tablet, or mobile device.</p>
                </div>
            </div>
            <!--<div class="d-flex flex-md-row flex-column justify-content-center text-left align-items-stretch" id="spacer">
                <img :src="getImages.why_us_hero" alt="" class="img">
                <div class="pl-4">
                    <h2 class="font-weight-light">Learn a skill.</h2>
                    <h2 class="font-weight-light">Build your portfolio.</h2>
                    <h2 class="font-weight-bold">Get Hired.</h2>
                    <p class="small">StraNerd is an online education platform that delivers video courses, programs and resources for Individual, Advertising & Media Specialist, Online Marketing Professionals, Freelancers and anyone looking to pursue a career in digital marketing, Accounting, Web development, Programming. Multimedia and CAD design.</p>
                    <button class="btn primary-button mt-1"><router-link class="text-white text-decoration-none" to="/courses">Discover</router-link></button>
                </div>
            </div>-->
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
        background: $primary-light;
        color: $text-black;
        text-align: center;
        padding: 4rem 0 4rem;
    }
    #primary-text{
        color: $primary-dark;
    }
    #spacer{
        margin-top: 10rem;
        img {
            width: 60%;
        }
    }
    .icons{
        height: 100px;
    }
    .icon-title{
        margin: 1rem 0 0.5rem;
        font-weight: bold;
        font-size: 1.25rem;
    }
    .icon-subtitle{
        margin: 0.5rem 0;
        font-size: 0.875rem;
    }
    @media screen and (max-width: 768px){
        #spacer{
            margin-top: 4rem;
            img{
                width: 100%;
                margin-bottom: 2rem;
            }
        }
    }
</style>
