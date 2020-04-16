<template>
    <header class="container">
        <nav class="navbar navbar-expand-md navbar-light">
            <a class="navbar-brand" href="#">STRANERD</a>
            <button class="navbar-toggler" id="toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav ml-auto align-items-center">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
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
                        <button class="primary-button d-none d-md-inline" @click="openModal">Get Started</button>
                        <a class="nav-link d-md-none" @click.prevent="openModal">Get Started</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style lang="scss">
    @import '../../style/index';
    #navbar {
        background: $white;
        a {
            color: $primary;
            font-size: 0.875rem;
        }
        button a{
            color: $white;
            padding: 0;
            border: none !important;
        }
    }
    #toggler{
        border: none;
        border-radius: 0;
        box-shadow: none;
    }
</style>

<script>
    import { mapActions } from 'vuex'
    export default {
        methods: mapActions(['openModal'])
    }
</script>
