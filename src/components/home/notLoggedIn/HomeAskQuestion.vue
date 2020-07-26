<template>
	<div id="background" class="p-2 p-md-5">
		<div class="container">
			<div class="row align-items-center justify-content-center flex-column flex-md-row">
				<div class="col-md-4 mb-3 mb-md-0">
					<h1 class="text-muted text-center">Ask Your Questions</h1>
				</div>
				<div class="col-md-8 border border-secondary p-3 p-md-5 rounded-lg">
					<div class="form-group my-3">
						<h6>Title</h6>
						<input type="text" class="form-control" placeholder="eg What is the result of integrating 2x" v-model.trim="$v.post.title.$model"
							:class="{'is-invalid': $v.post.title.$error,'is-valid': !$v.post.title.$invalid}">
						<small class="small text-danger d-block" v-if="$v.post.title.$error">Title must be at least 3 characters</small>
						<small class="small text-muted">One quick sentence summary of your question</small>
					</div>
					<div class="form-group my-3">
						<h6>Body</h6>
						<vue-editor class="rounded border" v-model.trim="$v.post.body.$model" useCustomImageHandler @image-added="handleImageAdded"
							:class="{'border-danger': $v.post.body.$error, 'border-success': !$v.post.body.$invalid}" placeholder=""
						/>
						<small class="small text-muted">Include all information necessary for someone to answer your question</small>
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
						<button id="bg-primary" :disabled="isLoading || $v.$invalid" @click="submitPost">
							<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
							<span>Post question</span>
						</button>
					</div>
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

<style lang="scss" scoped>
	#background{
		background: url('../../../assets/images/ask_questions_background.svg');
		background-size: cover;
	}
	#bg-primary{
		background: $primary-dark;
		color: $white;
	}
</style>
