<template>
	<div class="bg-dark">
		<div class="container d-flex text-white py-3 justify-content-between align-items-center">
			<div>
				<i class="fas fa-arrow-left mr-3" @click="$router.push('/chats')"></i>
				<img src="@/assets/images/icons/Cassette.svg" class="mr-3" width="50px" alt="" />
				<span>{{ $route.params.id /* TODO: Replace with user's name */ }}</span>
			</div>
			<button class="btn shadow-none white-button" v-if="$route.params.id" @click="startSession">Start session</button>
			<!-- TODO: Replace with if user is a tutor -->
		</div>
	</div>
</template>

<script>
	export default {
		methods:{
			startSession(){
				alert('Session started')
			}
		}
	}
</script>