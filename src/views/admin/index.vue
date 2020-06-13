<template>
	<div>
		<keep-alive v-if="isLoggedIn">
			<router-view :key="$route.fullPath" />
		</keep-alive>
		<router-view v-else />
		<button class="floating-button" @click="setCreateModalOverview"><i class="fas fa-plus"></i></button>
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
		methods: mapActions(['setCreateModalOverview']),
		computed: mapGetters(['isCreateModalOpen','isLoggedIn'])
	}
</script>