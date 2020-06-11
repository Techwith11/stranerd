<template>
	<div class="modal-background">
		<div class="modal-inner">
			<edit-question v-if="isEditModalQuestion" />
			<edit-note v-if="isEditModalNote" />
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import EditQuestion from '@/components/admin/modals/EditQuestion'
	import EditNote from '@/components/admin/modals/EditNote'
	export default {
		computed: mapGetters(['isEditModalQuestion','isEditModalNote']),
		components: {
			'edit-question': EditQuestion,
			'edit-note': EditNote,
		}
	}
</script>