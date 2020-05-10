<template>
    <header class="bg-dark">
        <nav class="container navbar navbar-dark bg-dark" :class="isLoggedIn ? 'navbar-expand-md' : 'navbar-expand-sm'">
            <router-link class="navbar-brand" to="/">STRANERD</router-link>
            <button class="navbar-toggler shadow-none rounded-0" @click="toggleNavbar" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse text-center">
                <ul class="navbar-nav ml-auto align-items-md-center" v-if="isLoggedIn">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/chats">Chats</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/sessions">Sessions</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/courses">Courses</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/tutors">Tutors</router-link>
                    </li>
                    <li class="nav-item dropdown d-none d-md-inline">
                        <a class="nav-link dropdown-toggle" href="#" @click="toggleDropDown" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            My account
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <router-link class="dropdown-item" to="/my_account">My Account</router-link>
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
                </ul>
                <ul class="navbar-nav ml-auto align-items-md-center" v-else>
                    <li class="nav-item d-inline">
                        <a href="#" class="nav-link" @click.prevent="openModal">Sign Up</a>
                    </li>
                    <li class="nav-item d-inline">
                        <a href="#" class="nav-link" @click.prevent="openModal">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style>
	header{
        position: relative;
		z-index: 3;
		height: 60px;
	}
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions(['openModal', 'logout']),
            toggleNavbar: () => window.toggleNavbar(),
            toggleDropDown: () => {
                let dropdown = document.getElementsByClassName('dropdown-menu')[0]
                dropdown.classList.toggle('show')
                let dropdownToggle = document.getElementsByClassName('dropdown-toggle')[0]
                dropdownToggle.classList.toggle('show')
            }
        },
        computed: mapGetters(['isLoggedIn'])
    }
</script>
