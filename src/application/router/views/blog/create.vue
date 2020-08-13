<template>
	<Default>
		<div class="m-md-5">
			<div class="d-flex align-items-baseline justify-content-between my-3">
				<h4>Create Blog Post</h4>
			</div>
			<form class="mx-2" @submit.prevent="createArticle">
				<div class="form-group my-3">
					<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
					<a @click.prevent="() => { $refs.imageInput.value= ''; $refs.imageInput.click() }">
						<span v-if="factory.image">{{ factory.image.name }} </span>
						<span class="text-info">Upload preview image</span>
					</a>
				</div>
				<div class="form-group my-3">
					<input class="form-control" placeholder="Title" v-model.trim="factory.title"
						:class="{'is-invalid': factory.errors.title, 'is-valid': factory.isValid('title')}">
					<span class="small" v-if="factory.errors.title">{{ factory.errors.title }}</span>
				</div>
				<div class="form-group my-3">
					<editor :model.sync="factory.body" path='posts/body'
						:valid="factory.isValid('body')" :error="factory.errors.body" placeholder="Full content"
					/>
				</div>
				<div class="form-group my-3">
					<input type="text" placeholder="eg differentiation calculus" v-model="tag" class="form-control">
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
					<button class="text-white my-2 py-2 px-4" type="submit" :class="!factory.valid || loading ? 'opacity-25' : 'primary-button'"
						:disabled="loading || !factory.valid">
						<i class="fas fa-spinner fa-spin" v-if="loading"></i>
						<span>Create Article</span>
					</button>
				</div>
			</form>
		</div>
	</Default>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import { useArticleForm } from '@/usescases/blog/useArticles'
	export default defineComponent({
		name: 'CreateArticle',
		setup(){
			const { loading, createArticle, factory, tag, splitTag, removeTag, } = useArticleForm()
			const catchImage = (e: Event) => {
				const file = (e.target as HTMLInputElement)?.files?.[0] ?? undefined
				if(file) factory.image = file
			}
			return {
				loading, createArticle, factory, tag, splitTag, removeTag, catchImage
			}
		}
	})
</script>
