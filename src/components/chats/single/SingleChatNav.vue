<template>
	<div class="bg-dark" v-if="user.bio">
		<div class="container d-flex text-white py-3 justify-content-between align-items-center">
			<div>
				<i class="fas fa-arrow-left mr-3" @click="$router.push('/chats')"></i>
				<img src="@/assets/images/icons/Cassette.svg" class="mr-3" width="50px" alt="" />
				<span>{{ user.bio.name }}</span>
			</div>
			<button class="btn shadow-none white-button" v-if="user.roles.isTutor" @click="startSession">Start session</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			user: {
				required: true
			}
		},
		methods:{
			startSession(){
				alert('Session started')
			}
		}
	}
</script>