<template>
	<div class="mb-3">
		<page-loading v-if="loading" />
		<form class="d-flex align-items-center mt-1" @submit.prevent="null">
			<textarea rows="1" class="form-control" placeholder="Enter message" v-model="factory.content"></textarea>
			<a @click.prevent="createTextChat" class="p-0 border-none" v-if="factory.valid">
				<i class="fas fa-paper-plane ml-3 text-success"></i>
			</a>
			<a v-else @click.prevent="() => { $refs.mediaInput.value= ''; $refs.mediaInput.click() }">
				<i class="fas fa-paperclip ml-3 text-success"></i>
			</a>
			<input type="file" multiple @change.prevent="catchMultipleFiles" class="d-none" ref="mediaInput">
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCreateChat } from '@application/usecases/sessions/chats'
import { useMultipleFileInputs } from '@/usecases/core/forms'
export default defineComponent({
	props: {
		session: {
			type: String,
			required: true
		}
	},
	setup(props){
		const { createMediaChat, createTextChat, loading, textFactory } = useCreateChat(props.session)
		const { catchMultipleFiles } = useMultipleFileInputs(createMediaChat)
		return {
			factory: textFactory, createTextChat, loading,
			catchMultipleFiles
		}
	}
})
</script>

<style lang="scss" scoped>
	i{ font-size: 1.5rem; }
	@media screen and (min-width: 768px){
		i{ font-size: 1.75rem; }
	}
	@media screen and (min-width: 992px){
		i{ font-size: 2.0rem; }
	}
</style>
