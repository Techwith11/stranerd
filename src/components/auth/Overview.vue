<template>
	<div class="text-center m-md-5">
		<div class="d-flex justify-content-end">
			<i class="fas fa-times text-danger lead" @click="closeModal"></i>
		</div>
		<h4 class="my-3">Stranerd</h4>
		<p class="small my-4">Sign in to allow us serve you personalized content, course recommendations, track tutors you like, your sessions and your payments.</p>
		<div class="d-flex flex-column mx-2 align-items-center">
			<button>
				<i class="fab fa-google"></i>
				Login with Google
			</button>
			<button>
				<i class="fab fa-facebook-f"></i>
				Login with Facebook
			</button>
			<button @click="setModalLogin">
				<i class="fas fa-envelope"></i>
				Login with Email
			</button>
			<span class="my-2">
				No account?
				<span class="text-info" @click="setModalRegisterStudent">Sign up as a student</span>
			</span>
			<span class="my-2">
				Or
				<span class="text-info" @click="setModalRegisterTutor">sign up as a tutor</span>
			</span>
		</div>
		<p class="small text-muted my-4">To make Stranerd work, we log user data and share it with service providers. Click "Sign In" above to accept Stranerd's Terms of Service & Privacy Policy.</p>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
        name: "Overview",
		methods: {
			...mapActions(['setModalLogin','setModalRegisterStudent','closeModal','setModalRegisterTutor'])
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