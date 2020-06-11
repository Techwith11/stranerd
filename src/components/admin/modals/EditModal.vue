<template>
	<div class="modal-background">
		<div class="modal-inner">
			<edit-question v-if="isEditModalQuestion" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import EditQuestion from '@/components/admin/modals/EditQuestion'
	export default {
		computed: mapGetters(['isEditModalQuestion']),
		components: {
			'edit-question': EditQuestion,
		}
	}
</script>