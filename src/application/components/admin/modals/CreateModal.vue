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

<script>
import CreateOverview from '@/components/admin/modals/CreateOverview'
import CreateCourse from '@/components/admin/modals/CreateCourse'
import CreateQuestion from '@/components/admin/modals/CreateQuestion'
import CreateNote from '@/components/admin/modals/CreateNote'
import CreateArticle from '@/components/admin/modals/CreateArticle'
import CreateSubject from '@/components/admin/modals/CreateSubject'
import { useStore } from '@/usecases/store'
export default {
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
}
</script>
