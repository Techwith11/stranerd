<template>
	<div class="bg-dark">
		<div class="container d-flex text-white py-3 align-items-center">
			<i class="fas fa-arrow-left mr-3" @click="$router.push('/chats')"></i>
			<img src="@/assets/images/icons/Cassette.svg" class="mr-3" width="50px" alt="" />
			<span>{{ $route.params.id /* TODO: Replace with user's name */ }}</span>
		</div>
	</div>
</template>