<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="#">STRANERD</a>
            <button class="navbar-toggler" id="toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav ml-auto align-items-center">
                    <li class="nav-item active">
                        <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/courses">Courses</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/blog">Blog</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About Us</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">Contact Us</router-link>
                    </li>
                    <li class="nav-item">
                        <button class="btn primary-button d-none d-lg-inline">Be a contributor</button>
                        <router-link class="nav-link d-lg-none" to="/be_a_contributor">Be a contributor</router-link>
                    </li>
                    <li class="nav-item">
                        <button class="btn primary-button d-none d-lg-inline">Login</button>
                        <router-link class="nav-link d-lg-none" to="/login">Login</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style lang="scss">
    @import '../../style/index';
    #navbar {
        background: $white;
        a {
            color: $primary;
            font-size: 0.875rem;
        }
        button{
            border-radius: 50rem!important;
            padding: 0.75rem 2.5rem !important;
            font-size: 1rem;
            margin: 0.25rem 0.5rem !important;
        }
    }
    #toggler{
        border: none;
    }
</style>
