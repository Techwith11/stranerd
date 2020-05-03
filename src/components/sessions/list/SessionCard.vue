<template>
	<div>
		{{ session }}
	</div>
</template>

<script>
	export default {
		props: {
			session: {
				required: true,
				type: Object
			}
		}
	}
</script>