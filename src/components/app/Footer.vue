<template>
    <footer class="bg-dark py-5 text-white mt-auto">
       <div class="container">
           <div class="row">
               <div class="col-12 col-md-6">
                   <p class="lead">Stranerd</p>
                   <p class="small">Stranerd is an online education platform that delivers video courses, programs and resources.</p>
                   <p>
                       <i class="fab fa-facebook-f"></i>
                       <i class="fab fa-twitter"></i>
                       <i class="fab fa-youtube"></i>
                   </p>
               </div>
               <div class="col-4 col-md-2">
                   <h6>Quick Links</h6>
                   <router-link class="links" to="/">Home</router-link>
                   <router-link class="links" to="/courses">Courses</router-link>
                   <router-link class="links" to="/about">About Us</router-link>
                   <router-link class="links" to="/contact">Contact Us</router-link>
               </div>
               <div class="col-4 col-md-2">
                   <h6>Contact Us</h6>
                   <a class="links" href="tel:xxxxxxxxxx">Phone Number</a>
                   <a class="links" href="mailto:xxxxxxxxxx">Mail address</a>
                   <a class="links" href="">Contact Address</a>
               </div>
               <div class="col-4 col-md-2">
                   <h6>Others</h6>
                   <router-link class="links" to="/privacy_policy">Privacy Policy</router-link>
                   <router-link class="links" to="terms_and_conditions/">Terms And Conditions</router-link>
                   <router-link class="links" to="/faqs">Faqs</router-link>
               </div>
           </div>
       </div>
    </footer>
</template>

<style lang="scss" scoped>
    @import '../../style/index';
   i{
        border-radius: 50rem;
        border: 1px solid transparent;
        padding: 0.5rem;
        margin-right: 0.5rem;
        &.fa-facebook-f{
            background: #272EAE;
        }
        &.fa-twitter{
            background: #1590D8;
        }
        &.fa-youtube{
            background: #D0021B;
        }
    }
    .section{
        padding: 0 1rem;
    }
    h6{
        margin-bottom: 1rem;
    }
    .links{
        display: block;
        color: $white;
        font-size: 0.75rem;
        border: none !important;
    }
</style>
