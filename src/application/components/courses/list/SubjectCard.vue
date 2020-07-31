<template>
	<div class="mt-3 mb-5">
		<router-link class="text-muted h6 text-decoration-none mb-3 d-inline-block text-capitalize" :to="`/courses/${subject.name.toLowerCase()}`">{{ subject.name}}</router-link>
		<div class="d-flex scrolling-nav">
			<router-link :to="`/courses/${subject.name}/${module.name}`" v-for="module in subject.modules" :key="module.name"
				class="text-decoration-none bg-dark rounded d-flex flex-column justify-content-center mr-3 p-3 module border border-dark"
				:style="module.image ? `background: url('${module.image.link}')` : ''">
				<span class="h5 mb-0 text-wrap text-truncate text-center text-light text-capitalize font-weight-bold" :class="{'overlay': module.image}">{{ module.name }}</span>
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
		min-height: 150px;
		background-size: cover !important;
	}
	.overlay{
		background: #000000AA;
		padding: 0.5rem;
	}
	span{
		min-width: 150px;
	}
</style>