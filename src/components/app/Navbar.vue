<template>
    <header class="bg-dark">
        <nav class="container navbar navbar-dark bg-dark" :class="isLoggedIn ? 'navbar-expand-lg' : 'navbar-expand'">
            <router-link class="navbar-brand" to="/">STRANERD</router-link>
            <button class="navbar-toggler rounded-0" @click="toggleNavbar" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav ml-auto" v-if="isLoggedIn">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/posts">Posts</router-link>
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
                    <li class="nav-item">
                        <router-link class="nav-link" to="/shop">Shop</router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="isAdmin">
                        <a class="nav-link dropdown-toggle" @click.prevent="toggleAdminDropDown" id="adminDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Admin Pages
                        </a>
                        <div class="dropdown-menu bg-dark py-0 py-lg-2" aria-labelledby="adminDropdown">
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/admins/questions">Tests Questions</router-link>
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/admins/upgrades">Upgrade Users</router-link>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" @click.prevent="toggleAccountDropDown" id="accountDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            My account
                        </a>
                        <div class="dropdown-menu bg-dark py-0 py-lg-2" aria-labelledby="accountDropdown">
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/account">My Account</router-link>
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/cart">My Cart
                                <span class="badge badge-pill badge-primary" v-if="getCartLength">{{ getCartLength }}</span>
                            </router-link>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item nav-link py-1 py-lg-2"  @click.prevent="logout">Logout</a>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto align-items-md-center" v-else>
                    <li class="nav-item d-inline">
                        <a class="nav-link" @click.prevent="openModal">Sign Up</a>
                    </li>
                    <li class="nav-item d-inline">
                        <a class="nav-link" @click.prevent="openModal">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
	header{
        position: relative;
		z-index: 3;
		height: 60px;
	}
    .dropdown-menu{
        border: none !important;
        margin-left: 1rem !important;
        .nav-link{
            display: inline-block;
        }
        .nav-link:hover {
            color: green;
            background: initial !important;
        }
    }
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions(['openModal', 'logout']),
            toggleNavbar: () => window.toggleNavbar(),
            toggleAccountDropDown: () => window.toggleAccountDropDown(),
            toggleAdminDropDown: () => window.toggleAdminDropDown()
        },
        computed: mapGetters(['isLoggedIn','isAdmin','getCartLength'])
    }
</script>
