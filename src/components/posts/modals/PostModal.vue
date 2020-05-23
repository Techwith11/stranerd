<template>
	<div class="modal-background">
		<div class="modal-inner">
			<create-new-post v-if="isPostModalCreate" />
			<questions-left-notify v-if="isPostModalNotify" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CreateNewPost from '@/components/posts/modals/CreateNewPost'
	import QuestionsLeftNotify from '@/components/posts/modals/QuestionsLeftNotify'
	export default {
		components: {
			'create-new-post': CreateNewPost,
			'questions-left-notify': QuestionsLeftNotify
		},
		computed: mapGetters(['isPostModalCreate','isPostModalNotify'])
	}
</script>