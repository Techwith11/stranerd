<template>
	<form class="mt-auto mb-3" @submit.prevent="createReply()">
		<editor :model.sync="factory.body" :path='`editor/posts/${$route.params.id}/replies/body`'
			:valid="factory.isValid('body')" :error="factory.errors.body" placeholder="Leave a reply"
		/>
		<div class="d-flex justify-content-end">
			<button @click.prevent="createReply" class="mt-3" v-if="isLoggedIn" type="submit"
				:class="factory.valid ? 'bg-success text-white' : 'btn-gray'" :disabled="loading || !factory.valid">
				<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
				<span>Submit</span>
			</button>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateReply } from '@/usecases/posts/replies'
import router from '@/router/'
export default defineComponent({
	setup(){
		const { id } = router.currentRoute.params
		const { factory, loading, createReply, isLoggedIn } = useCreateReply(id)
		return { factory, loading, createReply, isLoggedIn }
	}
})
</script>
