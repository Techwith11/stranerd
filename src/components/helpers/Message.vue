<template>
	<div class="center container">
		<p>{{ message }}</p>
		<p class="mt-3 small">{{ optional ? optional : '' }}</p>
	</div>
</template>

<script>
	export default {
		props: {
			message: {
				type: String,
				required: true
			},
			optional: {
				type: String
			}
		}
	}
</script>