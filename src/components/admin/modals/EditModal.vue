<template>
	<div class="modal-background">
		<div class="modal-inner">
			<edit-question v-if="isEditModalQuestion" />
			<edit-note v-if="isEditModalNote" />
			<edit-blog-post v-if="isEditModalBlog" />
			<edit-course v-if="isEditModalCourse" />
			<edit-subject-module v-if="isEditModalSubjectModule" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import EditQuestion from '@/components/admin/modals/EditQuestion'
	import EditNote from '@/components/admin/modals/EditNote'
	import EditBlogPost from '@/components/admin/modals/EditBlogPost'
	import EditCourse from '@/components/admin/modals/EditCourse'
	import EditModalSubjectModule from '@/components/admin/modals/EditSubjectModule'
	export default {
		computed: mapGetters(['isEditModalQuestion','isEditModalNote','isEditModalBlog','isEditModalCourse','isEditModalSubjectModule']),
		components: {
			'edit-question': EditQuestion,
			'edit-note': EditNote,
			'edit-blog-post': EditBlogPost,
			'edit-course': EditCourse,
			'edit-subject-module': EditModalSubjectModule,
		}
	}
</script>