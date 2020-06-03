<template>
	<div>
		<h4 class="text-muted text-center">Ask Your Questions</h4>
		<div class="d-flex flex-md-row flex-column-reverse">
			<div class="m-md-5 p-3">
				<div class="form-group my-3">
					<input type="text" class="form-control" placeholder="Question Topic" v-model.trim="$v.post.title.$model"
						:class="{'is-invalid': $v.post.title.$error,'is-valid': !$v.post.title.$invalid}">
					<small class="small text-danger d-block" v-if="$v.post.title.$error">Topic must be at least 3 characters</small>
					<small class="small text-muted" v-if="post.title.length === 0">One quick sentence summary of your question</small>
				</div>
				<div class="form-group my-3">
					<vue-editor class="rounded border" v-model.trim="$v.post.body.$model" useCustomImageHandler @image-added="handleImageAdded"
								:class="{'border-danger': $v.post.body.$error, 'border-success': !$v.post.body.$invalid}" placeholder="Question content"
					/>
					<small class="small text-danger d-block" v-if="$v.post.body.$error">Question body must be at least 3 characters</small>
					<small class="small text-muted" v-if="post.body.length === 0">Describe your question in full length to give us a clear picture of what it is about</small>
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
					<small class="small text-muted" v-else>Use comma separated tags to attach keywords related to your questions. This can include related subjects, topics, formulas etc. At least one tag is required</small>
				</div>
				<div class="d-flex justify-content-end">
					<button class="btn-success" :disabled="isLoading || $v.$invalid" @click="submitPost">
						<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
						<span>Post question</span>
					</button>
				</div>
			</div>
			<div>
				<h2>Ask your questions Today</h2>
			</div>
		</div>
	</div>
</template>

<script>
	import { required, minLength } from 'vuelidate/lib/validators'
	import { mapActions } from 'vuex'
	export default {
		data: () => ({
			post: {
				title: '',
				body: '',
				tags: []
			},
			tag: '',
			isLoading: false
		}),
		methods: {
			...mapActions(['setCreatePost','uploadFromEditor']),
			splitTag(){
				let tag = this.tag.trim().split(',')[0].toLowerCase()
				this.tag = ''
				tag && !this.post.tags.includes(tag) ? this.post.tags.push(tag) : null
			},
			removeTag(tag){ this.post.tags = this.post.tags.filter(item => tag !== item) },
			async handleImageAdded(file, editor, cursorLocation, resetUploader) {
				try{
					await this.uploadFromEditor({
						file, editor, cursorLocation, resetUploader,
						path: 'editor/posts/body'
					})
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			},
			async submitPost(){
				this.isLoading = true
				this.setCreatePost(this.post)
				this.isLoading = false
				this.$router.push('/posts/create').catch(error => error)
			}
		},
		validations:{
			post: {
				title: { required, minLength: minLength(3) },
				body: { required, minLength: minLength(3) },
				tags: { required, minLength: minLength(1) }
			}
		}
	}
</script>