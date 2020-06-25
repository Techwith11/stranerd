<template>
    <div id="background">
        <div class="container d-flex flex-column flex-md-row justify-content-center align-items-center">
            <div class="mb-5">
                <h2 class="font-weight-bold">Our Pricing Plans</h2>
                <p class="small">Stranerd is an online educational platform that offers academic assistance to students worldwide.</p>
                <button class="primary-button" @click="setAuthModalOverview">Start Free Trial</button>
            </div>
            <div class="price-card" v-for="(plan, index) in plans" :key="index">
                <p class="font-weight-light">{{ plan.title }}</p>
                <p>
                    <span class="display-2 price">${{ plan.price }}</span>
                    <span>/month</span>
                </p>
                <p class="price-subtitle w-75">{{ plan.description }}</p>
                <ul>
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>{{ plan.questions }} free questions monthly</span>
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
                        <span>Save 16% for ${{ plan.yearly }}/year</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        data: () => ({
            plans: [
                {
                    title: 'Amateur',
                    description: 'Perfect for newbies and those just looking to stay for a short while.',
                    price: 9.99,
                    yearly: 100,
                    questions: 5
                },
                {
                    title: 'Intermediate',
                    description: 'Perfect for those trying to get the best while saving a few dollars as well.',
                    price: 19.99,
                    yearly: 200,
                    questions: 9
                },
                {
                    title: 'Master',
                    description: 'Perfect for those that believe they are going to be with us a while.',
                    price: 49.99,
                    yearly: 500,
                    questions: 15
                }
            ]
        }),
        methods: mapActions(['setAuthModalOverview'])
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/index.scss';
    #background{
        background: $primary-light;
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
