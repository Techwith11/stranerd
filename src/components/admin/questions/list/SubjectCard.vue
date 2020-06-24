<template>
	<div class="mt-3 mb-5">
		<router-link class="text-muted h6 text-decoration-none mb-3 d-inline-block text-capitalize" :to="`/admins/questions/${subject.name}`">{{ subject.name }}</router-link>
		<div class="d-flex scrolling-nav">
			<router-link :to="`/admins/questions/${subject.name}/${module}`" v-for="module in subject.modules" :key="module"
				class="text-decoration-none bg-dark rounded d-flex align-items-center justify-content-center mr-3 p-3 module">
				<h5 class="card-title mb-0 text-wrap text-center text-light text-capitalize">{{ module }}</h5>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			subject: {
				required: true,
				type: Object
			}
		},
	}
</script>

<style lang="scss" scoped>
	.module{
		height: 150px;
		min-width: 150px;
	}
</style>