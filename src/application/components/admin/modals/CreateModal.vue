<template>
	<div class="modal-background">
		<div class="modal-inner">
			<create-overview v-if="isCreateModalOverview" />
			<create-course v-if="isCreateModalCourse" />
			<create-question v-if="isCreateModalQuestion" />
			<create-note v-if="isCreateModalNote" />
			<create-article v-if="isCreateModalBlog" />
			<create-subject v-if="isCreateModalSubject" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import CreateOverview from '@/components/admin/modals/CreateOverview.vue'
import CreateCourse from '@/components/admin/modals/CreateCourse.vue'
import CreateQuestion from '@/components/admin/modals/CreateQuestion.vue'
import CreateNote from '@/components/admin/modals/CreateNote.vue'
import CreateArticle from '@/components/admin/modals/CreateArticle.vue'
import CreateSubject from '@/components/admin/modals/CreateSubject.vue'
import { useStore } from '@/usecases/store'
export default defineComponent({
	components: {
		'create-overview': CreateOverview,
		'create-course': CreateCourse,
		'create-question': CreateQuestion,
		'create-note': CreateNote,
		'create-article': CreateArticle,
		'create-subject': CreateSubject,
	},
	setup(){
		return {
			isCreateModalOverview: useStore().modals.isCreateModalOverview,
			isCreateModalCourse: useStore().modals.isCreateModalCourse,
			isCreateModalQuestion: useStore().modals.isCreateModalQuestion,
			isCreateModalNote: useStore().modals.isCreateModalNote,
			isCreateModalBlog: useStore().modals.isCreateModalBlog,
			isCreateModalSubject: useStore().modals.isCreateModalSubject,
		}
	}
})
</script>
