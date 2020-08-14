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

<script>
	import { mapGetters } from 'vuex'
	import EditQuestion from '@/components/admin/modals/EditQuestion'
	import EditNote from '@/components/admin/modals/EditNote'
	import EditArticle from '@/components/admin/modals/EditArticle'
	import EditCourse from '@/components/admin/modals/EditCourse'
	import EditModalSubject from '@/components/admin/modals/EditSubject'
	export default {
		computed: mapGetters(['isEditModalQuestion','isEditModalNote','isEditModalBlog','isEditModalCourse','isEditModalSubject']),
		components: {
			'edit-question': EditQuestion,
			'edit-note': EditNote,
			'edit-article': EditArticle,
			'edit-course': EditCourse,
			'edit-subject': EditModalSubject,
		}
	}
</script>
