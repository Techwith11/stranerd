<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<a @click.prevent="setCreateModalOverview"><i class="fas fa-arrow-left"></i></a>
			<h4>Create Blog Post</h4>
			<i></i>
		</div>
		<form class="mx-2">
			<div class="form-group my-3">
				<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
				<a @click.prevent="() => { $refs.imageInput.value= ''; $refs.imageInput.click() }">
					<span v-if="image">{{image.name}} </span>
					<span class="text-info">Upload preview image</span>
				</a>
			</div>
			<div class="form-group my-3">
				<input class="form-control" placeholder="Title" v-model.trim="$v.post.title.$model"
					:class="{'is-invalid': $v.post.title.$error, 'is-valid': !$v.post.title.$invalid}">
				<span class="small" v-if="$v.post.title.$error">Must be at least 3 characters long</span>
			</div>
			<div class="form-group my-3">
				<textarea class="form-control" placeholder="Description..." v-model.trim="$v.post.description.$model" rows="3"
					:class="{'is-invalid': $v.post.description.$error, 'is-valid': !$v.post.description.$invalid}"
				></textarea>
				<span class="small" v-if="$v.post.description.$error">Must be at least 3 characters long</span>
			</div>
			<div class="form-group my-3">
				<editor :model.sync="$v.post.body.$model" path='posts/body'
					:valid="!$v.post.body.$invalid" :error="$v.post.body.$error" placeholder="Full content"
				/>
				<small class="small text-danger d-block" v-if="$v.post.body.$error">Post body is required</small>
			</div>
			<div class="form-group my-3">
				<input type="text" class="form-control" placeholder="Tags" v-model.trim="tag" @keyup.188="splitTag"
					:class="{'is-invalid': $v.post.tags.$error,'is-valid': !$v.post.tags.$invalid}">
				<div class="small mt-1" v-if="post.tags.length > 0">
				<span v-for="tag in post.tags" :key="tag">
					{{ tag }}
					<a @click.prevent="removeTag(tag)"><i class="fas fa-times text-danger mr-1"></i></a>
				</span>
				</div>
				<small class="small text-muted" v-else>Use comma separated tags to attach keywords related to the post. At least one tag is required</small>
			</div>
			<div class="d-flex flex-column my-3">
				<button class="text-white my-2 py-2 px-4" @click.prevent="submitPost" :class="{'opacity-25':$v.$invalid, 'primary-button': !$v.$invalid}" :disabled="isLoading || $v.$invalid">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Upload</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { required, minLength } from 'vuelidate/lib/validators'
	export default {
		name: 'CreateBlogPost',
		data: () => ({
			post: {
				title: '',
				description: '',
				body: '',
				tags: []
			},
			tag: '',
			image: null,
			isLoading: false
		}),
		methods:{
			...mapActions(['setCreateModalOverview', 'closeCreateModal','createBlogPost','closePostModal']),
			catchImage(e){ e.target.files[0] && e.target.files[0].type.startsWith('image/') ? this.image = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not an image'})},
			splitTag(){
				let tag = this.tag.trim().split(',')[0].toLowerCase()
				this.tag = ''
				tag && !this.post.tags.includes(tag) ? this.post.tags.push(tag) : null
			},
			removeTag(tag){ this.post.tags = this.post.tags.filter(item => tag !== item) },
			async submitPost() {
				this.isLoading = true
				try {
					let res = await this.createBlogPost({ post: this.post, image: this.image })
					this.closeCreateModal()
					await this.$router.push(`/blog/${res.id}`)
				} catch (error) {
					new window.Toast({icon: 'error', title: error.message})
				}
				this.isLoading = false
			}
		},
		validations:{
			post: {
				title: { required, minLength: minLength(3)},
				description: { required, minLength: minLength(3) },
				body: { required },
				tags: { required, minLength: minLength(1) }
			},
			image: { required },
		}
	}
</script>
