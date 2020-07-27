<template>
	<div class="container p-2 p-lg-4">
		<div v-if="isSubscribed">
			<div class="alert border d-flex justify-content-between align-items-center" role="alert" v-for="document in course.documents" :key="document.name">
				<span class="font-weight-bold">{{ document.name }}</span>
				<a :href="document.link" download>
					<i class="fas fa-download text-info"></i>
				</a>
			</div>
		</div>
		<p v-else>
			<span>You need an active subscription to gain access to this course's documents. </span>
			<router-link to="/pricing-plans">Subscribe Now</router-link>
		</p>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	export default {
		props: {
			course: {
				required: true,
				type: Object
			}
		},
		computed: mapGetters(['isSubscribed'])
	}
</script>
