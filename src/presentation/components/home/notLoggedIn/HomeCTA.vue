<template>
    <div>
        <div id="carouselExampleIndicators" class="carousel slide carousel-fade" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active d-none d-sm-inline"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1" class="d-none d-sm-inline"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2" class="d-none d-sm-inline"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active" data-interval="3000">
                    <img src="@/assets/images/slides_1.jpg" class="d-block w-100" alt="">
                    <div class="carousel-caption">
                        <h1 class="font-weight-bold cta">Get Access to Unlimited Educational Resources. Everywhere, Every time!</h1>
                        <p class="subhead">Premium access to loads of resources ranging from courses, tests e.t.c.</p>
                        <button class="primary-button ctaButton"><router-link class="text-decoration-none text-white" to="/courses">Get Access</router-link></button>
                    </div>
                </div>
                <div class="carousel-item" data-interval="3000">
                    <img src="@/assets/images/slides_2.jpg" class="d-block w-100" alt="">
                    <div class="carousel-caption">
                        <h1 class="font-weight-bold cta">Get Access to Unlimited Educational Resources. Everywhere, Every time!</h1>
                        <p class="subhead">Premium access to loads of resources ranging from courses, tests e.t.c.</p>
                        <button class="primary-button ctaButton"><router-link class="text-decoration-none text-white" to="/courses">Get Access</router-link></button>
                    </div>
                </div>
                <div class="carousel-item" data-interval="3000">
                    <img src="@/assets/images/slides_3.jpg" class="d-block w-100" alt="">
                    <div class="carousel-caption">
                        <h1 class="font-weight-bold cta">Get Access to Unlimited Educational Resources. Everywhere, Every time!</h1>
                        <p class="subhead">Premium access to loads of resources ranging from courses, tests e.t.c.</p>
                        <button class="primary-button ctaButton"><router-link class="text-decoration-none text-white" to="/courses">Get Access</router-link></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    img{
        min-height: 50vh;
    }
    .carousel-caption{
        left: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        display: flex;
        padding: 0 0.5rem;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #00000044;
    }
    @media (min-width: 768px){
        .carousel-caption{
            padding: 0 8rem;
        }
    }
    .ctaButton{
        background: $primary-dark;
        color: $white;
    }
    @media (max-width: 720px){
        .cta{ font-size: 2rem !important; }
        .subhead{ font-size: 0.95rem; }
    }
    @media (max-width: 600px){
        .cta{font-size: 1.8rem !important;}
        .subhead{ font-size: 0.92rem; }
    }
    @media (max-width: 543px){
        .cta{font-size: 1.7rem !important;}
        .subhead{ font-size: 0.9rem; }
        .ctaButton{ font-size: 0.9rem; }
    }
    @media (max-width: 520px){
        .cta{font-size: 1.6rem !important;}
        .subhead{ font-size: 0.87rem; }
        .ctaButton{ font-size: 0.87rem; }
    }
    @media (max-width: 493px){
        .cta{font-size: 1.5rem !important;}
        .subhead{ font-size: 0.85rem; }
        .ctaButton{ font-size: 0.85rem; }
    }
    @media (max-width: 467px){
        .cta{font-size: 1.4rem !important;}
        .subhead{ font-size: 0.83rem; }
        .ctaButton{ font-size: 0.83rem; }
    }
   @media (max-width: 443px){
        .cta{font-size: 1.3rem !important;}
       .subhead{ font-size: 0.8rem; }
       .ctaButton{ font-size: 0.8rem; }
    }
    @media (max-width: 417px){
        .cta{font-size: 1.2rem !important;}
        .subhead{ font-size: 0.78rem; }
        .ctaButton{ font-size: 0.78rem; }
    }
    @media (max-width: 400px){
        .carousel-caption{ padding-top: 3rem !important; padding-bottom: 1rem !important; }
        .cta{font-size: 1.1rem !important;}
        .subhead{ font-size: 0.75rem; }
        .ctaButton{ font-size: 0.75rem; }
    }
</style>
