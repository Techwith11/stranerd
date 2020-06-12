<template>
    <div id="background">
        <div class="container">
            <h2>What Students Say</h2>
            <p class="small mx-auto">Stranerd is an online educational platform that offers academic assistance to students worldwide.</p>
            <div class="row mt-3">
                <div class="col-md-6 col-lg-3 mt-2" v-for="index in 4" :key="index">
                    <div class="card">
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <img :src="getImages.students[0]" alt="" class="rounded">
                            </div>
                            <p class="card-text">
                                Stranerd is an online education platform that delivers video courses, programs and resources for Individual,
                                Advertising & Media Specialist, Online Marketing Professionals, Freelancers and anyone.
                            </p>
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
        computed: mapGetters(['getImages'])
    }
</script>

<style lang="scss" scoped>
    @import '../../../style/index.scss';
    #background{
        background: $white;
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
