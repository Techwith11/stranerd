<template>
    <footer class="bg-dark py-5 text-white mt-auto">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <p class="lead">Stranerd</p>
                    <p class="small">Stranerd is an online educational platform that offers academic assistance to students worldwide.</p>
                    <p>
                        <a href="https://facebook.com/officialstranerd" target="_blank"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://instagram.com/officialstranerd" target="_blank"><i class="fab fa-instagram"></i></a>
                        <a href="https://twitter.com/stranerds" target="_blank"><i class="fab fa-twitter"></i></a>
                    </p>
                </div>
                <div class="col-4 col-md-2">
                    <h6>Quick Links</h6>
                    <router-link class="links" to="/">Home</router-link>
                    <router-link class="links" to="/blog">Blog</router-link>
                    <router-link class="links" to="/about">About Us</router-link>
                </div>
                <div class="col-4 col-md-2">
                    <h6>Contact Us</h6>
                    <a class="links" href="tel:+14040435611">Call us</a>
                    <a class="links" href="mailto:officialstranerd@gmail.com">Mail us</a>
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
        width: 2rem;
        height: 2rem;
        border: 1px solid transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 0.5rem;
        margin-bottom: 0.25rem;
        color: white;
        &.fa-facebook-f{
            background: #3B5998;
        }
        &.fa-twitter{
            background: #00ACED;
        }
        &.fa-instagram{
            background: #F56040;
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
