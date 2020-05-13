<template>
	<div class="m-md-5">
		<div class="d-flex align-items-center justify-content-between my-3">
			<i></i>
			<h4 class="mb-0">Post New Question</h4>
			<i class="fas fa-times text-danger" @click="this.closePostModal"></i>
		</div>
		<div class="form-group my-3">
			<input type="text" class="form-control" placeholder="Question Topic" v-model.trim="$v.post.title.$model"
				:class="{'is-invalid': $v.post.title.$error,'is-valid': !$v.post.title.$invalid}">
			<small class="small text-danger d-block" v-if="$v.post.title.$error">Topic must be at least 3 characters</small>
			<small class="small text-muted" v-if="post.title.length === 0">One quick sentence summary of your question</small>
		</div>
		<div class="form-group my-3">
			<textarea rows="4" class="form-control" placeholder="Question content" v-model.trim="$v.post.body.$model"
				:class="{'is-invalid': $v.post.body.$error,'is-valid': !$v.post.body.$invalid}"></textarea>
			<small class="small text-danger d-block" v-if="$v.post.body.$error">Question body must be at least 3 characters</small>
			<small class="small text-muted" v-if="post.body.length === 0">Describe your question in full length to give us a clear picture of what it is about</small>
		</div>
		<div class="form-group my-3">
			<input type="text" class="form-control" placeholder="Tags" v-model.trim="tag" @keyup.188="splitTag"
				:class="{'is-invalid': $v.post.tags.$error,'is-valid': !$v.post.tags.$invalid}">
			<div class="small mt-1" v-if="post.tags.length > 0">
				<span v-for="tag in post.tags" :key="tag">
					{{ tag }}
					<i class="fas fa-times text-danger mr-1" @click="removeTag(tag)"></i>
				</span>
			</div>
			<small class="small text-muted" v-else>Use comma separated tags to attach keywords related to your questions. This can include related subjects, topics, formulas etc. At least one tag is required</small>
		</div>
		<div class="form-group my-3">
			<input type="file" class="d-none" ref="attachments" accept="image/*" @change="catchImages" multiple>
			<a class="text-info d-block" @click.prevent="$refs.attachments.click()">Upload file attachments</a>
			<div class="small mt-1" v-if="media.length > 0">
				<span v-for="file in media" :key="file.name">
					{{ file.name }}
					<i class="fas fa-times text-danger mr-1" @click="removeFile(file)"></i>
				</span>
			</div>
			<small class="small text-muted" v-else>Upload any relevant images such as diagrams associated with the question</small>
		</div>
		<div class="d-flex justify-content-end">
			<button class="accent-button" :disabled="isLoading || $v.$invalid" @click="createPost">
				<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
				<span>Post question</span>
			</button>
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
			media: [],
			isLoading: false
		}),
		methods: {
			...mapActions(['closePostModal']),
			splitTag(){
				let tag = this.tag.trim().split(',')[0].toLowerCase()
				this.tag = ''
				tag && !this.post.tags.includes(tag) ? this.post.tags.push(tag) : null
			},
			removeTag(tag){ this.post.tags = this.post.tags.filter(item => tag !== item) },
			removeFile(file){ this.media = this.media.filter(item => file.name !== item.name) },
			catchImages(e){
				e.target.files.forEach(file => {
					if(this.media.length > 2){
						return new window.Toast({ icon: 'warning', title: 'You can only add a maximum of 3 images' })
					}
					if(file.type.startsWith('image/')){
						let isThere = this.media.find(item => file.name === item.name)
						!isThere ? this.media.push(file) : null
					}
				})
			},
			async createPost(){
				this.isLoading = true
				//TODO: Upload media
				//TODO: Create new post
				//TODO: Redirect to new post page
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