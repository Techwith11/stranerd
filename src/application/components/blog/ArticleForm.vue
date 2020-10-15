<template>
	<div>
		<slot name="title"><h4>Title</h4></slot>
		<form class="mx-2" @submit.prevent="submit">
			<div class="form-group my-3">
				<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
				<a @click.prevent="() => { $refs.imageInput.value= ''; $refs.imageInput.click() }">
					<span v-if="factory.image">{{ factory.image.name }} </span>
					<span class="text-info">Upload preview image</span>
				</a>
			</div>
			<div class="form-group my-3">
				<input class="form-control" placeholder="Title" v-model="factory.title"
					:class="{'is-invalid': factory.errors.title, 'is-valid': factory.isValid('title')}">
				<span class="small" v-if="factory.errors.title">{{ factory.errors.title }}</span>
			</div>
			<div class="form-group my-3">
				<editor :model.sync="factory.body" path='posts/body'
					:valid="factory.isValid('body')" :error="factory.errors.body" placeholder="Full content"
				/>
			</div>
			<div class="form-group my-3">
				<input type="text" placeholder="Tags" v-model="tag" class="form-control">
				<p class="my-2">
					<span v-for="tag in factory.tags" @click="removeTag(tag)" class="bg-primary p-1 mr-1 cursor-pointer" :key="tag">
						<span class="text-white">{{ tag }} </span>
						<span class="text-danger ml-1">&times;</span>
					</span>
				</p>
				<small class="small text-muted">Use comma separated tags to attach keywords related to the article.</small>
				<small class="small text-danger" v-if="factory.errors.tags">{{ factory.errors.tags }}</small>
			</div>
			<div class="d-flex flex-column my-3">
				<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
					<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
					<span>
						<slot name="buttonText">Submit</slot>
					</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { ArticleFactory } from '@modules/blog/domain/factories/article'
import { useFileInputs, useTags } from '@/usecases/core/forms'
export default defineComponent({
	name: 'ArticleForm',
	props: {
		factory: {
			type: ArticleFactory,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		submit: {
			type: Function,
			required: true
		}
	},
	setup(props) {
		const { tag, splitTag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)
		const { catchFiles: catchImage } = useFileInputs(
			(file:File) => props.factory.image = file
		)
		return { catchImage, tag, removeTag, splitTag }
	}
})
</script>
