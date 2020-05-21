<template>
	<div>
		<router-view />
		<button class="floating-button" @click="openCreateModal"><i class="fas fa-plus"></i></button>
		<create-new-modal v-if="isCreateModalOpen" />
	</div>
</template>

<script>
	import CreateNewModal from '@/components/admin/modals/ContentModal'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		name: "Admins",
		components: {
			'create-new-modal': CreateNewModal
		},
		methods: mapActions(['openCreateModal']),
		computed: mapGetters(['isCreateModalOpen'])
	}
</script>