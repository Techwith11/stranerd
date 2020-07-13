<template>
    <div id="background">
        <div class="container d-flex flex-column flex-md-row justify-content-center align-items-center">
            <div class="mb-5">
                <h2 class="font-weight-bold">Our Pricing Plans</h2>
                <p class="small">Stranerd is an online educational platform that offers academic assistance to students worldwide.</p>
                <router-link class="btn primary-button" to="/pricing-plans">See more details</router-link>
            </div>
            <div class="price-card" v-for="plan in getPlans" :key="plan['.key']">
                <p class="font-weight-light">{{ plan.title }}</p>
                <p>
                    <span class="display-2 price">${{ plan.monthlyPrice }}</span>
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
                        <span>Save 16% for ${{ plan.yearlyPrice }}/year</span>
                    </li>
                </ul>
               <router-link class="mx-auto small" to="/pricing-plans">read more...</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
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
        computed: mapGetters(['getPlans'])
    }
</script>

<style lang="scss" scoped>
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
