<template>
    <div id="background">
        <div class="container">
            <div class="d-flex flex-column flex-md-row row justify-content-center">
                <div class="col-md-4 mb-5">
                    <img :src="getImages.icons.unlimited_access" alt="" class="icons" />
                    <h3 class="icon-title">Unlimited Access</h3>
                    <p class="icon-subtitle">One subscription, unlimited access.</p>
                </div>
                <div class="col-md-4 mb-5">
                    <img :src="getImages.icons.expert_teacher" alt="" class="icons" />
                    <h3 class="icon-title">Expert Teachers</h3>
                    <p class="icon-subtitle">Learn from expert teachers who are passionate about teaching.</p>
                </div>
                <div class="col-md-4 mb-5">
                    <img :src="getImages.icons.study_anywhere" alt="" class="icons" />
                    <h3 class="icon-title">Study Anywhere</h3>
                    <p class="icon-subtitle">Improve your academic performance with courses made by experts..</p>
                </div>
                <div class="col-md-4 mb-5">
                    <img :src="getImages.icons.test_preps" alt="" class="icons" />
                    <h3 class="icon-title">Test Preps</h3>
                    <p class="icon-subtitle">Identify your strengths and improve your weaknesses with our concise tests.</p>
                </div>
                <div class="col-md-4 mb-5">
                    <img :src="getImages.icons.post_questions" alt="" class="icons" />
                    <h3 class="icon-title">Ask questions</h3>
                    <p class="icon-subtitle">Asks questions for free and get answers from our expert tutors.</p>
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
