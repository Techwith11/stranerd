<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Post New Question</h4>
			<i class="fas fa-times text-danger" @click="closePostModal"></i>
		</div>
		<div class="form-group my-3">
			<input type="text" class="form-control" placeholder="Question Topic">
			<small class="small text-muted">One quick sentence summary of your question</small>
		</div>
		<div class="form-group my-3">
			<textarea rows="4" class="form-control" placeholder="Question content"></textarea>
			<small class="small text-muted">Describe your question in full length to give us a clear picture of what it is about</small>
		</div>
		<div class="form-group my-3">
			<input type="text" class="form-control" placeholder="Tags">
			<small class="small text-muted">Use comma separated tags to attach keywords related to your questions. This can include related subjects, topics, formulas etc</small>
		</div>
		<div class="form-group my-3">
			<input type="file" class="d-none" ref="attachments">
			<a class="text-info d-block" @click.prevent="$refs.attachments.click()">Upload file attachments</a>
			<small class="small text-muted">Upload any relevant files such as diagrams associated with the question</small>
		</div>
		<div class="d-flex justify-content-end">
			<button class="accent-button">Post question</button>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		methods: {
			...mapActions(['closePostModal'])
		}
	}
</script>