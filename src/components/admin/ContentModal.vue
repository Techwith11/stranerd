<template>
	<div class="modal-background">
		<div class="modal-inner">
			<create-overview v-if="isCreateModalOverview" />
			<create-course v-if="isCreateModalCourse" />
			<create-question v-if="isCreateModalQuestion" />
			<create-note v-if="isCreateModalNote" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CreateOverview from '@/components/admin/modals/CreateOverview'
	import CreateCourse from '@/components/admin/modals/CreateCourse'
	import CreateQuestion from '@/components/admin/modals/CreateQuestion'
	import CreateNote from '@/components/admin/modals/CreateNote'
	export default {
		computed: mapGetters(['isCreateModalOverview','isCreateModalCourse','isCreateModalQuestion','isCreateModalNote']),
		components: {
			'create-overview': CreateOverview,
			'create-course': CreateCourse,
			'create-question': CreateQuestion,
			'create-note': CreateNote,
		}
	}
</script>