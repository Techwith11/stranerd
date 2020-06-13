<template>
	<div class="text-center m-md-5">
		<div class="d-flex justify-content-end">
			<a @click.prevent="closeAuthModal"><i class="fas fa-times text-danger lead"></i></a>
		</div>
		<h4 class="my-3">Stranerd</h4>
		<p class="small my-4">Sign in to allow us serve you personalized content, course recommendations, track tutors you like, your sessions and your payments.</p>
		<div class="d-flex flex-column mx-2 align-items-center">
			<button @click="loginWithGoogle" :disabled="isLoadingG || isLoadingF">
				<i class="fas fa-spinner fa-spin" v-if="isLoadingG"></i>
				<i class="fab fa-google" v-else></i>
				Login with Google
			</button>
			<!--<button @click="loginWithFacebook" :disabled="isLoadingF || isLoadingG">
				<i class="fas fa-spinner fa-spin" v-if="isLoadingF"></i>
				<i class="fab fa-facebook-f" v-else></i>
				Login with Facebook
			</button>-->
			<button @click="setAuthModalLogin">
				<i class="fas fa-envelope"></i>
				Login with Email
			</button>
			<span class="my-2">
				No account?
				<a class="text-info" @click="setAuthModalRegisterStudent">Sign up with email</a>
			</span>
			<div v-if="isDev">
				<div class="d-flex">
				<span class="mr-2">
					<input type="radio" v-model="devUser" value="kevin11" class="mr-1">
					<label>Kevin11</label>
				</span>
					<span class="mr-2">
					<input type="radio" v-model="devUser" value="frank" class="mr-1">
					<label>Frank</label>
				</span>
					<span class="mr-2">
					<input type="radio" v-model="devUser" value="max" class="mr-1">
					<label>Max</label>
				</span>
					<span class="mr-2">
					<input type="radio" v-model="devUser" value="joe" class="mr-1">
					<label>Joe</label>
				</span>
				</div>
				<button @click="loginAsDevUser" :disabled="!devUser">
					<i class="fas fa-user-cog text-info"></i>
					Login as dev user
				</button>
			</div>
		</div>
		<p class="small text-muted my-4">To make Stranerd work, we might log user data and share it with service providers. Click "Sign In" above to accept Stranerd's Terms of Service & Privacy Policy.</p>
	</div>
</template>

<script>
	import firebase, { auth } from '@/config/firebase'
	import { mapGetters, mapActions } from 'vuex'
	export default {
        name: "Overview",
		data: () => ({
			isLoadingF: false,
			isLoadingG: false,
			devUser: null
		}),
		computed: {
			...mapGetters(['getIntendedRoute']),
			isDev(){ return process.env.NODE_ENV === 'development'}
		},
		methods: {
			...mapActions(['setId','setAuthModalLogin','setAuthModalRegisterStudent','closeAuthModal','clearIntendedRoute']),
			loginWithGoogle(){
				this.isLoadingG = true
				let googleProvider = new firebase.auth.GoogleAuthProvider()
				auth.signInWithPopup(googleProvider).then(async () => {
					this.isLoadingG = false
					this.closeAuthModal()
					this.getIntendedRoute ? await this.$router.push(this.getIntendedRoute) : null
					this.clearIntendedRoute()
				}).catch(error => {
					this.isLoadingG = false
					new window.Toast({ icon: 'error', title: error.message })
				})
			},
			loginWithFacebook(){
				this.isLoadingF = true
				let facebookProvider = new firebase.auth.FacebookAuthProvider()
				auth.signInWithPopup(facebookProvider).then(async () => {
					this.isLoadingF = false
					this.closeAuthModal()
					this.getIntendedRoute ? await this.$router.push(this.getIntendedRoute) : null
					this.clearIntendedRoute()
				}).catch(error => {
					this.isLoadingF = false
					new window.Toast({ icon: 'error', title: error.message })
				})
			},
			async loginAsDevUser(){
				this.setId(this.devUser)
				this.closeAuthModal()
				this.getIntendedRoute ? await this.$router.push(this.getIntendedRoute) : null
				this.clearIntendedRoute()
			}
		}
    }
</script>

<style lang="scss" scoped>
	@import '../../style/index';
	button{
		margin: 0.5rem 0;
		color: $text-black;
		border: 1px solid #333333;
		display: block;
		min-width: 300px;
		i{
			margin: 0 0.5rem 0 0;
			&.fa-google{
				color: #DD4B39;
			}
			&.fa-facebook-f{
				color: #3b5995;
			}
			&.fa-envelope{
				color: $accent;
			}
		}
	}
</style>