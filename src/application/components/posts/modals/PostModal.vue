<template>
	<div class="modal-background">
		<div class="modal-inner">
			<questions-left-notify v-if="isPostModalNotify" />
			<buy-more-questions v-if="isPostModalBuyMore" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import QuestionsLeftNotify from '@application/components/posts/modals/QuestionsLeftNotify.vue'
import BuyMoreQuestions from '@application/components/posts/modals/BuyMoreQuestions.vue'
import { useStore } from '@application/usecases/store'
export default defineComponent({
	components: {
		'questions-left-notify': QuestionsLeftNotify,
		'buy-more-questions': BuyMoreQuestions
	},
	setup(){
		return {
			isPostModalNotify: useStore().modals.isPostModalNotify,
			isPostModalBuyMore: useStore().modals.isPostModalBuyMore,
		}
	}
})
</script>
