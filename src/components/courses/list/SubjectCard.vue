<template>
	<div class="mt-3 mb-5">
		<router-link class="text-muted h6 text-decoration-none mb-3 d-inline-block" :to="`/courses/${subject.name.toLowerCase()}`">{{ subject.name}}</router-link>
		<div class="d-flex flex-wrap">
			<router-link :to="`/courses/${subject}/${module}`" v-for="module in subject.modules" :key="module"  :subject="subject.name"
				class="text-decoration-none bg-dark rounded d-flex align-items-center justify-content-center mb-3 mr-3 p-3 module">
				<h5 class="card-title mb-0 text-wrap text-center text-light">{{ module }}</h5>
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

<style>
	.module{
		width: 25%;
		box-sizing: border-box;
		min-height: 125px;
		min-width: 125px;
		max-height: 200px;
		max-width: 200px;
	}
</style>