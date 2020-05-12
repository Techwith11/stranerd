<template>
	<div class="modal-background">
		<div class="modal-inner">
			<create-new-post v-if="isPostModalCreate" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CreateNewPost from '@/components/posts/CreateNewPost'
	export default {
		components: {
			'create-new-post': CreateNewPost
		},
		computed: mapGetters(['isPostModalCreate'])
	}
</script>