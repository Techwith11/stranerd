<template>
    <header class="container">
        <nav class="navbar navbar-expand-md navbar-light">
            <a class="navbar-brand" href="#">STRANERD</a>
            <button class="navbar-toggler" @click="toggleNavbar" id="toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse text-center" id="navbar">
                <ul class="navbar-nav ml-auto align-items-md-center">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/chats">Chats</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/courses">Courses</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/tutors">Tutors</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/blog">Blog</router-link>
                    </li>
                    <template v-if="isLoggedIn">
                        <li class="nav-item dropdown d-none d-md-inline">
                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                My account
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <router-link class="dropdown-item" to="/my_account">My Account</router-link>
                                <router-link class="dropdown-item" to="/cart">My cart</router-link>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item"  @click.prevent="logout">Logout</a>
                            </div>
                        </li>
                        <li class="nav-item d-md-none">
                            <router-link class="nav-link" to="/my_account">My Account</router-link>
                        </li>
                        <li class="nav-item d-md-none">
                            <a class="nav-link" @click.prevent="logout">Logout</a>
                        </li>
                    </template>
                    <li class="nav-item" v-else>
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
            color: $text-black;
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
    import { mapGetters, mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions(['openModal', 'logout']),
            toggleNavbar(){
                let collapse = document.getElementsByClassName('navbar-collapse')[0]
                collapse.classList.toggle('collapse')
                collapse.classList.toggle('in')
            }
        },
        computed: mapGetters(['isLoggedIn'])
    }
</script>
