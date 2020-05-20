<template>
	<div class="alert alert-warning" role="alert">
		<div v-html="question.title"></div>
		<p>
			<span class="mr-3">A. {{ question.a }}</span>
			<span class="mr-3">B. {{ question.b }}</span>
			<span class="mr-3">C. {{ question.c }}</span>
			<span class="mr-3">D. {{ question.d }}</span>
		</p>
		<span class="d-block">Answer: {{ question.answer }}</span>
		<span class="d-block">Level {{ question.level }} {{ question.subject }}</span>
	</div>
</template>

<script>
	export default {
		props: {
			question: {
				required: true,
				type: Object
			}
		}
	}
</script>

