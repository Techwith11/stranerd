<template>
	<div class="modal-background">
		<div class="modal-inner">
			<create-overview v-if="isCreateModalOverview" />
			<create-course v-if="isCreateModalCourse" />
			<create-question v-if="isCreateModalQuestion" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import CreateOverview from '@/components/admin/modals/CreateOverview'
	import CreateCourse from '@/components/admin/modals/CreateCourse'
	import CreateQuestion from '@/components/admin/modals/CreateQuestion'
	export default {
		computed: mapGetters(['isCreateModalOverview','isCreateModalCourse','isCreateModalQuestion']),
		components: {
			'create-overview': CreateOverview,
			'create-course': CreateCourse,
			'create-question': CreateQuestion,
		}
	}
</script>