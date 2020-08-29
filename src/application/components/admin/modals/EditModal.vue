<template>
	<div class="modal-background">
		<div class="modal-inner">
			<edit-question v-if="isEditModalQuestion" />
			<edit-note v-if="isEditModalNote" />
			<edit-article v-if="isEditModalBlog" />
			<edit-course v-if="isEditModalCourse" />
			<edit-subject v-if="isEditModalSubject" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import EditQuestion from '@/components/admin/modals/EditQuestion.vue'
import EditNote from '@/components/admin/modals/EditNote.vue'
import EditArticle from '@/components/admin/modals/EditArticle.vue'
import EditCourse from '@/components/admin/modals/EditCourse.vue'
import EditModalSubject from '@/components/admin/modals/EditSubject.vue'
import { useStore } from '@/usecases/store'
export default defineComponent({
	components: {
		'edit-question': EditQuestion,
		'edit-note': EditNote,
		'edit-article': EditArticle,
		'edit-course': EditCourse,
		'edit-subject': EditModalSubject,
	},
	setup(){
		return {
			isEditModalCourse: useStore().modals.isEditModalCourse,
			isEditModalQuestion: useStore().modals.isEditModalQuestion,
			isEditModalNote: useStore().modals.isEditModalNote,
			isEditModalBlog: useStore().modals.isEditModalBlog,
			isEditModalSubject: useStore().modals.isEditModalSubject,
		}
	}
})
</script>
