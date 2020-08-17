<template>
    <header class="bg-white shadow">
        <nav class="navbar container bg-white navbar-light d-flex justify-content-between flex-row-reverse" :class="isLoggedIn ? 'navbar-expand-lg flex-lg-row' : 'navbar-expand-md flex-md-row'">
            <router-link class="navbar-brand" to="/"><img src="@/assets/images/stranerd_logo.png" alt="STRANERD" height="50px"></router-link>
            <button class="navbar-toggler rounded-0" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav ml-auto" v-if="isLoggedIn">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Dashboard</router-link>
                    </li>
                    <li class="nav-item d-none d-lg-inline">
                        <router-link class="nav-link" to="/blog">Blog</router-link>
                    </li>
                    <li class="nav-item d-lg-none">
                        <router-link class="nav-link" to="/posts">Posts</router-link>
                    </li>
                    <li class="nav-item d-lg-none">
                        <router-link class="nav-link" to="/sessions">Sessions</router-link>
                    </li>
                    <li class="nav-item d-lg-none">
                        <router-link class="nav-link" to="/courses">Courses</router-link>
                    </li>
                    <li class="nav-item d-lg-none">
                        <router-link class="nav-link" to="/tutors">Tutors</router-link>
                    </li>
                    <li class="nav-item d-lg-none">
                        <router-link class="nav-link" to="/shop">Shop</router-link>
                    </li>
                    <li class="nav-item dropdown" id="accountDropdown">
                        <a class="nav-link dropdown-toggle" id="accountDropdownToggle" @click.prevent="toggleAccountDropDown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            My account
                        </a>
                        <div class="dropdown-menu bg-white lg-shadow py-0 py-lg-2" aria-labelledby="accountDropdownToggle`" id="accountDropdownMenu">
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/account">My Account</router-link>
                            <a class="dropdown-item nav-link py-1 py-lg-2" @click.prevent="showCartModal">My Cart
                                <span class="badge badge-pill badge-primary" v-if="cartLength">{{ cartLength }}</span>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item nav-link py-1 py-lg-2"  @click.prevent="logout">Logout</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown" v-if="isAdmin" id="adminDropdown">
                        <a class="nav-link dropdown-toggle" @click.prevent="toggleAdminDropDown" id="adminDropdownToggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Admin Pages
                        </a>
                        <div class="dropdown-menu bg-white lg-shadow py-0 py-lg-2" aria-labelledby="adminDropdownToggle" id="adminDropdownMenu">
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/admins/questions">Tests Questions</router-link>
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/admins/notes">Shop Notes</router-link>
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/admins/subjects">Subjects</router-link>
                            <router-link class="dropdown-item nav-link py-1 py-lg-2" to="/admins/upgrades">Upgrade Users</router-link>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto align-items-md-center" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/pricing-plans">Pricing Plans</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/ask-a-question">Ask a Question</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/blog">Blog</router-link>
                    </li>
                    <li class="nav-item d-inline">
                        <a class="nav-link" @click.prevent="setAuthModalRegisterStudent">Sign Up</a>
                    </li>
                    <li class="nav-item d-inline">
                        <a class="nav-link" @click.prevent="setAuthModalLogin">Sign In</a>
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
    @media (max-width: 992px){
        .container{
            margin: 0;
            max-width: 100vw;
        }
        .navbar{
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
    }
    @media (min-width: 992px){
        .lg-shadow{
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
    }
    .nav-link{
        color: $text-black !important;
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.85;
        &:hover{
        color: $link-blue !important;
    }
    }
    .nav-link:hover{
        color: $link-blue !important;
    }
    .dropdown{
        cursor: pointer;
    }
    .dropdown-menu{
        border: none;
        padding: 0 1rem;
        .nav-link{
            display: inline-block;
        }
    }
</style>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'
import { closeNavbar, closeAccountDropdown, closeAdminDropdown } from '@/config'
import { useLogout } from '@/usecases/users/auth'
import store from '@root/application/store'
import { useCart } from '@/usecases/shop/useCart'
export default defineComponent({
	setup(){
		const { loading, logout } = useLogout()
		const { cartLength } = useCart()
		return {
			loading, logout, cartLength,
			isLoggedIn: computed(() => store.getters.isLoggedIn),
			isAdmin: computed(() => store.getters.isAdmin),
			setAuthModalRegisterStudent: () => store.dispatch('setAuthModalRegisterStudent'),
			setAuthModalLogin: () => store.dispatch('setAuthModalLogin'),
			setCartModalOverview: () => store.dispatch('setCartModalOverview'),
			toggleAccountDropDown: () => closeAdminDropdown(),
			toggleAdminDropDown: () => closeAccountDropdown(),
			showCartModal: () => {
				closeNavbar()
				store.dispatch('setCartModalOverview')
			},
		}
	}
})
</script>
