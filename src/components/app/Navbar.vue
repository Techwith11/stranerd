<template>
    <header class="bg-dark">
        <nav class="container navbar navbar-dark bg-dark text-white d-flex justify-content-between flex-row-reverse" :class="isLoggedIn ? 'navbar-expand-lg flex-lg-row' : 'navbar-expand-md flex-md-row'">
            <router-link class="navbar-brand" to="/"><img src="@/assets/images/stranerd_logo.png" alt="STRANERD" height="50px"></router-link>
            <button class="navbar-toggler rounded-0" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse text-white" id="navbar">
                <ul class="navbar-nav ml-auto" v-if="isLoggedIn">
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/posts">Posts</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/sessions">Sessions</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/courses">Courses</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/tutors">Tutors</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/shop">Shop</router-link>
                    </li>
                    <li class="nav-item dropdown" id="accountDropdown">
                        <a class="nav-link dropdown-toggle text-white" id="accountDropdownToggle" @click.prevent="toggleAccountDropDown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            My account
                        </a>
                        <div class="dropdown-menu bg-dark py-0 py-lg-2" aria-labelledby="accountDropdownToggle`" id="accountDropdownMenu">
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/account">My Account</router-link>
                            <a class="dropdown-item nav-link py-1 py-lg-2" @click.prevent="showCartModal">My Cart
                                <span class="badge badge-pill badge-primary" v-if="getCartLength">{{ getCartLength }}</span>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-white nav-link py-1 py-lg-2"  @click.prevent="logout">Logout</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown" v-if="isAdmin" id="adminDropdown">
                        <a class="nav-link dropdown-toggle text-white" @click.prevent="toggleAdminDropDown" id="adminDropdownToggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Admin Pages
                        </a>
                        <div class="dropdown-menu bg-dark py-0 py-lg-2" aria-labelledby="adminDropdownToggle" id="adminDropdownMenu">
                            <router-link class="dropdown-item text-white nav-link py-1 py-lg-2" to="/admins/questions">Tests Questions</router-link>
                            <router-link class="dropdown-item text-white nav-link py-1 py-lg-2" to="/admins/notes">Shop Notes</router-link>
                            <router-link class="dropdown-item text-white nav-link py-1 py-lg-2" to="/admins/subjects">Subjects</router-link>
                            <router-link class="dropdown-item text-white nav-link py-1 py-lg-2" to="/admins/upgrades">Upgrade Users</router-link>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto align-items-md-center" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/pricing-plans">Pricing Plans</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/ask-a-question">Ask a Question</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/blog">Blog</router-link>
                    </li>
                    <li class="nav-item d-inline">
                        <a class="nav-link text-white" @click.prevent="setAuthModalOverview">Sign Up</a>
                    </li>
                    <li class="nav-item d-inline">
                        <a class="nav-link text-white" @click.prevent="setAuthModalOverview">Login</a>
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
		height: 76px;
	}
    .dropdown{
        cursor: pointer;
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
            ...mapActions(['setAuthModalOverview', 'logout','setCartModalOverview']),
            toggleAccountDropDown: () => window.closeAdminDropdown(),
            toggleAdminDropDown: () => window.closeAccountDropdown(),
            showCartModal(){
                window.closeNavbar()
                this.setCartModalOverview()
            }
        },
        computed: mapGetters(['isLoggedIn','isAdmin','getCartLength','getImages'])
    }
</script>
