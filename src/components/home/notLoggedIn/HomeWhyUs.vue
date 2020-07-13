<template>
    <div id="background">
        <div class="container">
            <div class="d-flex flex-column flex-sm-row row justify-content-center">
                <div class="col-sm-6 col-md-4 mb-5">
                    <img src="@/assets/icons/Unlimited Access.svg" alt="" class="icons" />
                    <h3 class="icon-title">Unlimited Access</h3>
                    <p class="icon-subtitle">One subscription, unlimited access.</p>
                </div>
                <div class="col-sm-6 col-md-4 mb-5">
                    <img src="@/assets/icons/Expert Teacher.svg" alt="" class="icons" />
                    <h3 class="icon-title">Expert Teachers</h3>
                    <p class="icon-subtitle">Learn from expert teachers who are passionate about teaching.</p>
                </div>
                <div class="col-sm-6 col-md-4 mb-5">
                    <img src="@/assets/icons/Study Anywhere.svg" alt="" class="icons" />
                    <h3 class="icon-title">Study Anywhere</h3>
                    <p class="icon-subtitle">Improve your academic performance with courses made by experts..</p>
                </div>
                <div class="col-sm-6 col-md-4 mb-5">
                    <img src="@/assets/icons/Test Preps.svg" alt="" class="icons" />
                    <h3 class="icon-title">Test Preps</h3>
                    <p class="icon-subtitle">Identify your strengths and improve your weaknesses with our concise tests.</p>
                </div>
                <div class="col-sm-6 col-md-4 mb-5">
                    <img src="@/assets/icons/Post Questions.svg" alt="" class="icons" />
                    <h3 class="icon-title">Ask questions</h3>
                    <p class="icon-subtitle">Asks questions for free and get answers from our expert tutors.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../../style/index.scss';
    #background{
        background: $primary-light;
        color: $text-black;
        text-align: center;
        padding: 4rem 0 4rem;
    }
    .icons{
        height: 100px;
        padding: 0.5rem;
        border-radius: 10rem;
        background: $primary;
        border: 2px solid black !important;
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
</style>
