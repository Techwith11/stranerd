<template>
	<div v-if="user.bio">
		<div class="bg-dark">
			<div class="container text-white py-3">
				<div class="d-flex align-items-center">
					<i class="fas fa-arrow-left mr-3" @click="$router.push('/chats')"></i>
					<img src="@/assets/images/icons/Cassette.svg" class="mr-3" width="50px" alt="" />
					<span class="d-block text-truncate">{{ user.bio.name }}</span>
					<button class="ml-auto d-none d-md-inline shadow-none white-button" v-if="user.roles.isTutor" @click="startSession">Start session</button>
				</div>
			</div>
		</div>
		<div class="border-bottom">
			<div class="d-md-none container d-flex justify-content-end">
				<button class="shadow-none white-button" v-if="user.roles.isTutor" @click="startSession">Start session</button>
			</div>
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