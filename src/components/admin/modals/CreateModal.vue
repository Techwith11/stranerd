<template>
	<div class="modal-background">
		<div class="modal-inner">
			<create-overview v-if="isCreateModalOverview" />
			<create-course v-if="isCreateModalCourse" />
			<create-question v-if="isCreateModalQuestion" />
			<create-note v-if="isCreateModalNote" />
			<create-blog-post v-if="isCreateModalBlog" />
			<create-subject-module v-if="isCreateModalSubjectModule" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CreateOverview from '@/components/admin/modals/CreateOverview'
	import CreateCourse from '@/components/admin/modals/CreateCourse'
	import CreateQuestion from '@/components/admin/modals/CreateQuestion'
	import CreateNote from '@/components/admin/modals/CreateNote'
	import CreateBlogPost from '@/components/admin/modals/CreateBlogPost'
	import CreateSubjectModule from '@/components/admin/modals/CreateSubjectModule'
	export default {
		computed: mapGetters(['isCreateModalOverview','isCreateModalCourse','isCreateModalQuestion','isCreateModalNote','isCreateModalBlog','isCreateModalSubjectModule']),
		components: {
			'create-overview': CreateOverview,
			'create-course': CreateCourse,
			'create-question': CreateQuestion,
			'create-note': CreateNote,
			'create-blog-post': CreateBlogPost,
			'create-subject-module': CreateSubjectModule,
		}
	}
</script>