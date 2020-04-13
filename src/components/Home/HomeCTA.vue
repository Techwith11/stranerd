<template>
    <div id="background">
        <div class="container d-flex flex-md-row-reverse align-items-center" id="contain">
            <div class="text-left" id="ctaText">
                <h1 class="font-weight-bold" id="headline">Get Access to Unlimited Educational Resources. Everywhere, Everytime!</h1>
                <p id="subtitle">Premium access to more than 10,000 resources ranging from courses, events e.t.c.</p>
                <button class="btn primary-button" id="ctaButton">Get Access</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../../style/index.scss';
    #background{
        padding: 10rem 0;
        color: $text-black;
        background-size: cover;
        background: url("../../assets/images/photo-of-three-people-smiling-while-having-a-meeting-3184338.jpg"), $gradient, none;
    }
    #ctaButton{
        background: $primary-dark;
        color: $white;
    }
    #headline{
        font-size: 2.75rem;
        line-height: 4.0rem;
    }
    #subtitle{
        font-size: 1.125rem;
        line-height: 1.2rem;
    }
    @media screen and (max-width: 768px){
        #headline{
            font-size: 2.0rem;
            line-height: 2.5rem;
        }
        #subtitle{
            font-size: 1rem;
            line-height: 1.2rem;
        }
    }
    @media screen and (max-width: 576px){
        #headline{
            font-size: 1.6rem;
            line-height: 2.0rem;
        }
        #subtitle{
            font-size: 1rem;
            line-height: 1.2rem;
        }
    }
</style>
