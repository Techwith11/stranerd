<template>
	<header class="bg-white shadow">
		<nav class="navbar container bg-white navbar-light d-flex flex-row align-items-center" :class="isLoggedIn ? 'navbar-expand-lg flex-lg-row' : 'navbar-expand-md flex-md-row'">
			<router-link class="navbar-brand" to="/"><img src="@application/assets/images/stranerd_logo.png" alt="STRANERD" height="50px"></router-link>
			<NotificationBell class="nav-brand mr-5 mr-lg-4 ml-auto" />
			<button class="navbar-toggler rounded-0" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse flex-grow-0" id="navbar">
				<ul class="navbar-nav" v-if="isLoggedIn">
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
						<a class="nav-link dropdown-toggle" id="accountDropdownToggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							My account
						</a>
						<div class="dropdown-menu bg-white lg-shadow py-0 py-lg-2" aria-labelledby="accountDropdownToggle`" id="accountDropdownMenu">
							<router-link class="dropdown-item nav-link py-1 py-lg-2" to="/account">My Account</router-link>
							<a class="dropdown-item nav-link py-1 py-lg-2" @click="showCartModal">My Cart
								<span class="badge badge-pill badge-primary" v-if="cartLength">{{ cartLength }}</span>
							</a>
							<div class="dropdown-divider"></div>
							<a class="dropdown-item nav-link py-1 py-lg-2"  @click.prevent="logout">Logout</a>
						</div>
					</li>
					<li class="nav-item dropdown" v-if="isAdmin" id="adminDropdown">
						<a class="nav-link dropdown-toggle" id="adminDropdownToggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
					<!-- <li class="nav-item">
                        <router-link class="nav-link" to="/pricing-plans">Pricing Plans</router-link>
                    </li>-->
					<li class="nav-item">
						<router-link class="nav-link" to="/ask-a-question">Ask a Question</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link" to="/blog">Blog</router-link>
					</li>
					<li class="nav-item d-inline">
						<router-link class="nav-link" to="/auth/signup">Sign Up</router-link>
					</li>
					<li class="nav-item d-inline">
						<router-link class="nav-link" to="/auth/signin">Sign In</router-link>
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
    @media (max-width: $lg){
        .container{
            margin: 0;
            max-width: 100vw;
        }
        .navbar{
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
    }
    @media (min-width: $lg){
        .lg-shadow{
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
	    .navbar .nav-item .dropdown-menu{ display: none; }
	    .navbar .nav-item:hover .dropdown-menu{ display: block; }
    }
	/deep/ .nav-link{
        color: $text-black !important;
        font-weight: 500;
        text-transform: capitalize;
		&:hover{ color: $link-blue !important; }
    }
    /deep/ .dropdown{
	    cursor: pointer;
	    .dropdown-menu{
		    border: none;
		    padding: 0 0.75rem;
		    .nav-link{ display: inline-block; }
	    }
    }

</style>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useLogout } from '@application/usecases/users/auth'
import { useCart } from '@application/usecases/shop/cart'
import { useStore } from '@application/usecases/store'
import NotificationBell from '@/components/helpers/NotificationBell.vue'
export default defineComponent({
	components: {
		NotificationBell
	},
	setup(){
		const { loading, logout } = useLogout()
		const { cartLength } = useCart()
		const {
		    auth: { isLoggedIn, isAdmin },
			modals: { setCartModalOverview  }
		} = useStore()
		return {
			loading, logout, cartLength,
			isLoggedIn, isAdmin, setCartModalOverview,
			showCartModal: () => {
				const collapse = document.getElementById('navbar')
				collapse ? collapse.classList.remove('show') : null
				setCartModalOverview()
			}
		}
	}
})
</script>
