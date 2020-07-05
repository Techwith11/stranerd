<template>
	<div class="py-5 px-2">
		<div class="p-3 p-md-5 container border border-secondary rounded-lg">
			<div class="px-md-3">
				<h4 class="text-muted text-center">Ask Your Questions</h4>
				<div class="form-group my-3">
					<input type="text" class="form-control" placeholder="Question Topic" v-model.trim="$v.post.title.$model"
						:class="{'is-invalid': $v.post.title.$error,'is-valid': !$v.post.title.$invalid}">
					<small class="small text-danger d-block" v-if="$v.post.title.$error">Topic must be at least 3 characters</small>
					<small class="small text-muted" v-if="post.title.length === 0">One quick sentence summary of your question</small>
				</div>
				<div class="form-group my-3">
					<vue-editor class="rounded border bg-white" v-model.trim="$v.post.body.$model" useCustomImageHandler @image-added="handleImageAdded"
						:class="{'border-danger': $v.post.body.$error, 'border-success': !$v.post.body.$invalid}" placeholder="Question content"
					/>
					<small class="small text-muted" v-if="post.body.length === 0">Describe your question in full length to give us a clear picture of what it is about</small>
				</div>
				<div class="form-group my-3">
					<h6>Related Subject</h6>
					<select class="form-control text-capitalize" v-model="$v.post.subject.$model" :class="{'is-invalid': $v.post.subject.$error, 'is-valid': !$v.post.subject.$invalid}">
						<option :value="null" disabled>Please select a subject</option>
						<option :value="subject.name" v-for="subject in getAllSubjects" :key="subject['.key']">{{ subject.name }}</option>
					</select>
				</div>
				<div class="form-group my-3">
					<h6>Related Module</h6>
					<select class="form-control text-capitalize" v-model="$v.post.module.$model" :class="{'is-invalid': $v.post.module.$error, 'is-valid': !$v.post.module.$invalid}">
						<option :value="null" disabled>Please select a {{ post.subject ? 'module' : 'subject first' }}</option>
						<option :value="module.name" v-for="module in getModules" :key="module.name">{{ module.name }}</option>
					</select>
				</div>
				<div class="d-flex justify-content-end">
					<button class="btn-success" :disabled="isLoading || $v.$invalid" @click="submitPost">
						<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
						<span>Post question</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { required, minLength } from 'vuelidate/lib/validators'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		data: () => ({
			post: {
				title: '',
				body: '',
				subject: null,
				module: null
			},
			isLoading: false
		}),
		computed: {
			...mapGetters(['getAllSubjects']),
			getModules(){ return this.post.subject ? this.getAllSubjects.find(s => s.name === this.post.subject).modules : [] }
		},
		methods: {
			...mapActions(['setCreatePost','uploadFromEditor']),
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
		watch: {
			'post.subject'() {
				let subject = this.getAllSubjects.find(s => s.name === this.post.subject)
				if (subject && !subject.modules.find(m => m.name === this.post.module)) {
					this.post.module = null
				}
			}
		},
		validations:{
			post: {
				title: { required, minLength: minLength(3) },
				body: { required },
				subject: { required },
				module: { required }
			}
		}
	}
</script>