<template>
	<div v-if="user.bio">
		<div class="bg-dark">
			<div class="container text-white py-3">
				<div class="d-flex align-items-center">
					<i class="fas fa-arrow-left mr-3" @click="$router.push('/chats')"></i>
					<img :src="getImageLink" class="mr-3" width="50px" alt="" @click="$router.push(`/users/${user['.key']}`)" />
					<router-link class="d-block text-truncate text-white text-decoration-none" :to="`/users/${user['.key']}`">{{ user.bio.name }}</router-link>
					<button class="ml-auto d-none d-md-inline shadow-none white-button" v-if="canHaveSession" @click="bringUpSessionForm">Start session</button>
				</div>
			</div>
		</div>
		<div class="border-bottom" v-if="canHaveSession">
			<div class="d-md-none container d-flex justify-content-end">
				<button class="shadow-none white-button" @click="bringUpSessionForm">Start session</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		props: {
			user: {
				required: true
			}
		},
		computed: {
			getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : '/users/images/Cassette.svg' },
			canHaveSession(){ return this.user.roles.isTutor && this.user['.key'] !== this.getId },
			...mapGetters(['getId']),
		},
		methods:{
			...mapActions(['setSessionModalStateStudentDuration']),
			bringUpSessionForm(){
				this.setSessionModalStateStudentDuration({ student: this.getId, tutor: this.user['.key'] })
			}
		}
	}
</script>