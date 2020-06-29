<template>
    <div id="background">
        <div class="container">
            <h2>What Students Say</h2>
            <p class="small mx-auto">Stranerd is an online educational platform that offers academic assistance to students worldwide.</p>
            <div class="row mt-3">
                <div class="col-lg-4 mt-2" v-for="(testimonial,index) in testimonials" :key="index">
                    <div class="card">
                        <div class="card-body rounded-lg">
                            <div class="text-center mb-3">
                                <img src="@/assets/icons/Cassette.svg" alt="" class="rounded">
                            </div>
                            <p class="card-text">{{ testimonial.testimonial }}</p>
                            <div>
                                <div class="d-flex justify-content-center align-items-center">
                                    <span class="font-weight-bold">Arthur Brown</span><br/>
                                </div>
                                <span>3D Modelling, University of Illinios</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data: () => ({
            testimonials: [
                {
                    testimonial: 'Stranerd not only exhibited standard and professional attributes, but quick and guaranteed responses, quality tutors, and assured understanding of the desired course.\n' +
                        'Stranerd aided me in science courses ranging from Calculus, Physics to Chemistry, across various academic levels. With step by step in-detail explanations, to diagrammatic problem solving techniques, Stranerd puts the understanding of students as their topmost priority. For extra academic aid, and success in future courses, Stranerd should be your primary option.'
                },
                {
                    testimonial: ' I took a physics course last semester that was giving me a seriously hard time, I told a friend and they recommended that I message stranerd. They helped me solve problems that I could not and they helped me with assignments. They tutored me for my exams as well. I had a whopping 96% percent In my finals and I could not be happier.\n' +
                        'I recommend Stranerd to students that are having issues finding solutions for difficult problems. They take their time to explain and ensure that you know what you are supposed to know'
                },
                {
                    testimonial: 'They have great customer service, they’re very fast and efficient and also they ensure you get good grades! Totally recommend. If there was a rating higher than a 5 star I’d totally give them! ⭐️'
                }
            ]
        }),
        computed: mapGetters(['getImages'])
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/index.scss';
    #background{
        background: $primary-light;
        padding: 4rem 0;
        color: $text-black;
        text-align: center;
    }
    img{
        width: 100px;
        height: 100px;
    }
    h2{
        color: $primary-dark;
        font-size: 2.0rem;
        font-weight: bold;
    }
    @media screen and (max-width: 767px){
        h2{
            font-size: 1.5rem;
        }
    }
</style>
