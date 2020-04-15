<template>
    <div id="background">
        <div class="container">
            <h2>What Students Say</h2>
            <p class="small  mx-auto">Semaj Africa is an online education platform that delivers video courses, programs and resources for Individual, Advertising & Media Specialist,.</p>
            <div class="row mt-3">
                <div class="col-md-6 col-lg-3 mt-2" v-for="index in 4" :key="index">
                    <div class="card">
                        <div class="card-body">
                            <h1 class="font-weight-bold">&ldquo;</h1>
                            <p class="card-text">
                                Semaj Africa is an online education platform that delivers video courses, programs and resources for Individual,
                                Advertising & Media Specialist, Online Marketing Professionals, Freelancers and anyone.
                            </p>
                            <p>
                                <span class="font-weight-bold">Arthur Brown</span><br/>
                                <span>3D Modelling, University of Illinios</span>
                            </p>
                        </div>
                    </div>
                </div>
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
        text-align: center;
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
