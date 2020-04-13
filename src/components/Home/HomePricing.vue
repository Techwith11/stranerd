<template>
    <div id="background">
        <div class="container d-flex flex-column flex-md-row justify-content-center align-items-center">
            <div>
                <h2 class="font-weight-bold">Our Pricing Plans</h2>
                <p class="small">StraNerd is an online education platform that delivers video courses, programs and resources for</p>
                <button class="btn primary-button">Start Free Trial</button>
            </div>
            <div class="price-card">
                <p class="font-weight-light">Premium</p>
                <p>
                    <span class="display-2 price">$15</span>
                    <span>/monthly</span>
                </p>
                <p class="price-subtitle w-50">StraNerd is an online education platform that delivers video courses, programs and resources for</p>
                <ul>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Unlimited Downloads</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Offline Accessibility</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>24/7 Support</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Job Opportunities</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>2.0% Transaction Fee</span>
                    </li>
                </ul>
            </div>
            <div class="price-card">
                <p class="font-weight-light">Premium</p>
                <p>
                    <span class="display-2 price">$150</span>
                    <span>/yearly</span>
                </p>
                <p class="price-subtitle w-50">StraNerd is an online education platform that delivers video courses, programs and resources for</p>
                <ul>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Unlimited Downloads</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Offline Accessibility</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>24/7 Support</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Job Opportunities</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>2.0% Transaction Fee</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../style/index.scss';
    #background{
        background: $white;
        padding: 4rem 0;
        color: $text-black;
    }
    .price-card{
        //border: 2px solid $text-black;
    }
    h2{
        font-size: 2.5rem;
    }
    h2, i{
        color: $primary-dark;
        margin-right: 0.25rem;
    }
    ul{
        padding: 0;
    }
    li{
        list-style: none;
        font-size: 0.75rem;
        margin: 0.25rem 0;
    }
    .price{
        color: $primary-dark;
    }
    .price-subtitle{
        font-size: 0.625rem;
    }
    @media screen and (max-width: 767px){
        #background{
            text-align: center;
        }
        h2{
            font-size: 1.5rem;
        }
        ul{
            text-align: left;
        }
    }
</style>
