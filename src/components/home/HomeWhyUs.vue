<template>
    <div id="background">
        <div class="container">
            <div class="d-flex flex-column flex-md-row">
                <div class="col-md-4 mb-5 mb-md-0">
                    <img src="@/assets/images/icons/Unlimited Access.svg" alt="" class="icons" />
                    <h3 class="icon-title">Unlimited Access</h3>
                    <p class="icon-subtitle">One subscription unlimited access</p>
                </div>
                <div class="col-md-4 mb-5 mb-md-0">
                    <img src="@/assets/images/icons/Expert Teacher.svg" alt="" class="icons" />
                    <h3 class="icon-title">Expert Teachers</h3>
                    <p class="icon-subtitle">Learn from industry experts who are passionate about teaching</p>
                </div>
                <div class="col-md-4 mb-5 mb-md-0">
                    <img src="@/assets/images/icons/Learn Anywhere.svg" alt="" class="icons" />
                    <h3 class="icon-title">Learn Anywhere</h3>
                    <p class="icon-subtitle">Switch between your computer, tablet, or mobile device.</p>
                </div>
            </div>
            <div class="d-flex flex-md-row flex-column justify-content-center text-left align-items-stretch" id="spacer">
                <img src="@/assets/images/shallow-focus-photo-of-people-discussing-3182826.jpg" alt="" class="img">
                <div class="pl-4">
                    <h2 class="font-weight-light">Learn a skill.</h2>
                    <h2 class="font-weight-light">Build your portfolio.</h2>
                    <h2 class="font-weight-bold">Get Hired.</h2>
                    <p class="small">StraNerd is an online education platform that delivers video courses, programs and resources for Individual, Advertising & Media Specialist, Online Marketing Professionals, Freelancers and anyone looking to pursue a career in digital marketing, Accounting, Web development, Programming. Multimedia and CAD design.</p>
                    <button class="btn primary-button mt-1">Discover</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../style/index.scss';
    #background{
        background: $primary-light;
        color: $text-black;
        text-align: center;
        padding: 8rem 0 4rem;
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
