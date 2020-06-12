<template>
    <div id="background">
        <div class="container d-flex flex-column flex-md-row justify-content-center align-items-center">
            <div class="mb-5">
                <h2 class="font-weight-bold">Our Pricing Plans</h2>
                <p class="small">Stranerd is an online educational platform that offers academic assistance to students worldwide.</p>
                <button class="primary-button" @click="setAuthModalOverview">Start Free Trial</button>
            </div>
            <div class="price-card">
                <span class="font-weight-light">Amateur</span>
                <span>
                    <span class="price">$10</span>
                    <span>/month</span>
                </span>
                <span class="price-subtitle w-75">Perfect for newbies and those just looking to stay for a short while.</span>
                <ul>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>5 free questions monthly</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Unlimited Access</span>
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
                        <span>Save 16% for $100/year</span>
                    </li>
                </ul>
            </div>
            <div class="price-card">
                <p class="font-weight-light">Intermediate</p>
                <p>
                    <span class="display-2 price">$15</span>
                    <span>/month</span>
                </p>
                <p class="price-subtitle w-75">Perfect for those trying to get the best while saving a few dollars as well.</p>
                <ul>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>10 free questions monthly</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Unlimited Access</span>
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
                        <span>Save 16% for $150/year</span>
                    </li>
                </ul>
            </div>
            <div class="price-card">
                <p class="font-weight-light">Master</p>
                <p>
                    <span class="display-2 price">$20</span>
                    <span>/month</span>
                </p>
                <p class="price-subtitle w-75">Perfect for those that believe they are going to be with us a while .</p>
                <ul>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>15 free questions monthly</span>
                    </li>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>Unlimited Access</span>
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
                        <span>Save 16% for $200/year</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        methods: mapActions(['setAuthModalOverview'])
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/index.scss';
    #background{
        background: $white;
        padding: 4rem 0;
        color: $text-black;
    }
    .price-card{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem 0;
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
        font-size: 2.5rem;
    }
    .price-subtitle{
        font-size: 0.65rem;
    }
    @media screen and (max-width: 767px){
        .price-subtitle{
            font-size: 0.90rem;
        }
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
