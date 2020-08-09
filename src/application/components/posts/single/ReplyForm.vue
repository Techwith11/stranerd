<template>
	<div class="mt-auto mb-3">
		<editor :model.sync="factory.body" :path='`editor/posts/${$route.params.id}/replies/body`'
			:valid="factory.isValid('body')" :error="factory.errors.body" placeholder="Leave a reply"
		/>
		<div class="d-flex justify-content-end">
			<button @click.prevent="createReply" class="mt-3" :class="factory.valid ? 'bg-success text-white' : 'btn-gray'" :disabled="loading || !factory.valid">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span>Submit</span>
			</button>
		</div>
	</div>
</template>

<script>
    import { useCreateReply } from '@/usescases/posts/replies'
    import router from '@/router/'
	export default {
		setup(){
			const { id } = router.currentRoute.params
			const { factory, loading, createReply } = useCreateReply(id)
			return { factory, loading, createReply }
		}
	}
</script>
