<template>
	<div>
		<router-view />
		<content-fab />
	</div>
</template>

<script>
	import ContentFAB from '@/components/admin/ContentFAB'
	export default {
		name: "Admins",
		components: {
			'content-fab': ContentFAB,
		},
	}
</script>