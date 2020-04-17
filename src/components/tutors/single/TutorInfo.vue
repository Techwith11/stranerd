<template>
	<div class="d-flex flex-column align-items-center py-3 py-md-5">
		<img src="@/assets/images/boy.png" id="profileImage" alt="">
		<p class="title font-weight-bold my-3">
			<span>Instructor</span>
			<i class="ml-2 rounded-pill fas fa-circle" :class="tutor.active ? 'text-success' : 'text-danger'"></i>
		</p>
		<p class="lead font-weight-bold">{{ tutor.name }}</p>
		<p class="w-75 text-center">{{ tutor.bio }}</p>
		<p>Course: {{ tutor.course }}</p>
		<p>Price: ${{ tutor.price }}.00</p>
		<p>Overall Rating: {{ tutor.ratings.reduce((a,b,c) => a+b) / tutor.ratings.length }}</p>
		<button class="accent-button" @click="$router.push(`/chats/${tutor['.key']}`)">Chat with {{ tutor.name }}</button>
	</div>
</template>

<script>
	export default {
		props: {
			tutor: {
				required: true,
				type: Object
			}
		}
	}
</script>

<style lang="scss" scoped>
	#profileImage{
		width: 40%;
		min-width: 50px;
		max-width: 150px;
	}
</style>