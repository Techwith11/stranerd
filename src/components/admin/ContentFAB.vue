<template>
	<div>
		<button id="fab" @click="openCreateModal">+</button>
		<create-new-modal v-if="isCreateModalOpen" />
	</div>
</template>

<script>
	import CreateNewModal from '@/components/admin/ContentModal'
	import { mapGetters, mapActions } from 'vuex'
	export default {
		components: {
			'create-new-modal': CreateNewModal
		},
		methods: mapActions(['openCreateModal']),
		computed: mapGetters(['isCreateModalOpen'])
    }
</script>

<style lang="scss" scoped>
	@import '../../style/index';
	#fab{
		background: $accent;
		color: $white;
		border-radius: 10rem;
		position: fixed;
		right: 10%;
		bottom: 10%;
		padding: 0.5rem !important;
		margin: 0;
		width: 5rem;
		height: 5rem;
		box-sizing: border-box;
		z-index: 2;
		font-size: 2rem;
	}
	@media screen and (max-width: 767px){
		#fab{
			width: 4.5rem;
			height: 4.5rem;
		}
	}
	@media screen and (max-width: 575px){
		#fab{
			width: 4rem;
			height: 4rem;
		}
	}
</style>