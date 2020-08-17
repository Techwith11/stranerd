<template>
	<div class="m-md-5 text-center" id="waiting">
		<i class="fas fa-spinner fa-spin text-info fa-3x"></i>
		<p class="my-3">Waiting for {{ getOtherPersonOnSession ? getOtherPersonOnSession.bio.name : 'student' }} to complete payment</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data: () => ({
		isLoading: false,
	}),
	computed: {
		...mapGetters(['getOtherPersonOnSession'])
	}
}
</script>