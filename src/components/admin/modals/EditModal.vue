<template>
	<div class="modal-background">
		<div class="modal-inner">
			<edit-question v-if="isEditModalQuestion" />
			<edit-note v-if="isEditModalNote" />
			<edit-blog-post v-if="isEditModalBlog" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import EditQuestion from '@/components/admin/modals/EditQuestion'
	import EditNote from '@/components/admin/modals/EditNote'
	import EditBlogPost from '@/components/admin/modals/EditBlogPost'
	export default {
		computed: mapGetters(['isEditModalQuestion','isEditModalNote','isEditModalBlog']),
		components: {
			'edit-question': EditQuestion,
			'edit-note': EditNote,
			'edit-blog-post': EditBlogPost,
		}
	}
</script>