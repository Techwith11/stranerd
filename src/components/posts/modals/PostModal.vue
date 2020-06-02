<template>
	<div class="modal-background">
		<div class="modal-inner">
			<create-new-post v-if="isPostModalCreate" />
			<questions-left-notify v-if="isPostModalNotify" />
			<buy-more-questions v-if="isPostModalBuyMore" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CreateNewPost from '@/components/posts/modals/CreateNewPost'
	import QuestionsLeftNotify from '@/components/posts/modals/QuestionsLeftNotify'
	import BuyMoreQuestions from '@/components/posts/modals/BuyMoreQuestions'
	export default {
		components: {
			'create-new-post': CreateNewPost,
			'questions-left-notify': QuestionsLeftNotify,
			'buy-more-questions': BuyMoreQuestions
		},
		computed: mapGetters(['isPostModalCreate','isPostModalNotify','isPostModalBuyMore'])
	}
</script>