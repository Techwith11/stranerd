<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Buy More</h4>
			<a @click.prevent="closePostModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<div>
			Buy more questions
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default {
		methods: mapActions(['closePostModal']),
		computed: mapGetters([])
	}
</script>