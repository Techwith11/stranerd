<template>
	<div v-if="user.bio">
		<div class="bg-dark">
			<div class="container text-white py-3">
				<div class="d-flex align-items-center">
					<a @click.prevent="$router.push('/chats')"><i class="fas fa-arrow-left mr-3"></i></a>
					<img :src="getImageLink" class="mr-3" width="50px" alt="" @click="$router.push(`/users/${user['.key']}`)" />
					<router-link class="d-block text-truncate text-white text-decoration-none" :to="`/users/${user['.key']}`">{{ user.bio.name }}</router-link>
					<button class="ml-auto d-none d-md-inline white-button" v-if="canHaveSession" @click="bringUpSessionForm">Start session</button>
				</div>
			</div>
		</div>
		<div class="border-bottom" v-if="canHaveSession">
			<div class="d-md-none container d-flex justify-content-end">
				<button class="white-button" @click="bringUpSessionForm">Start session</button>
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
		getImageLink(){ return this.user.bio && this.user.bio.image && this.user.bio.image.link ? this.user.bio.image.link : this.getDefaultImage },
		canHaveSession(){ return this.user.roles.isTutor && this.user['.key'] !== this.getId },
		...mapGetters(['getId','getDefaultImage']),
	},
	methods:{
		...mapActions(['setSessionModalStudentDuration']),
		bringUpSessionForm(){
			this.setSessionModalStudentDuration({ student: this.getId, tutor: this.user['.key'] })
		}
	}
}
</script>