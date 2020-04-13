<template>
    <div id="background">
        <div class="container">
            <h2>Courses</h2>
            <ul class="nav justify-content-center">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">All</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/maths">Maths</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/physics">Physics</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/chemistry">Chemistry</router-link>
                </li>
            </ul>
            <div class="row mt-2">
                <div class="col-md-6 col-lg-4">
                    <div class="card my-3">
                        <img src="@/assets/images/full-frame-shot-of-abstract-pattern-249798.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">Become A Social Media Expert</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card my-3">
                        <img src="@/assets/images/full-frame-shot-of-abstract-pattern-249798.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">Become A Social Media Expert</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card my-3">
                        <img src="@/assets/images/full-frame-shot-of-abstract-pattern-249798.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">Become A Social Media Expert</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card my-3">
                        <img src="@/assets/images/full-frame-shot-of-abstract-pattern-249798.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">Become A Social Media Expert</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card my-3">
                        <img src="@/assets/images/full-frame-shot-of-abstract-pattern-249798.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">Become A Social Media Expert</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 col-lg-4">
                    <div class="card my-3">
                        <img src="@/assets/images/full-frame-shot-of-abstract-pattern-249798.jpg" class="card-img-top" alt="">
                        <div class="card-body">
                            <h5 class="card-title">Become A Social Media Expert</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn primary-button">Discover</button>
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
    .nav-link{
        color: $text-black !important;
    }
    h2{
        color: $primary-dark;
    }
    .card-body{
        background: $gradient;
        color: $white;
    }
</style>
