<template>
	<form class="my-3" @submit.prevent>
		<div class="form-group my-3">
			<h6>Title</h6>
			<input type="text" class="form-control" placeholder="eg What is the result of integrating 2x" v-model.trim="$v.post.title.$model"
				:class="{'is-invalid': $v.post.title.$error,'is-valid': !$v.post.title.$invalid}">
			<small class="small text-danger d-block" v-if="$v.post.title.$error">Title must be at least 3 characters</small>
			<small class="small text-muted">One quick sentence summary of your question</small>
		</div>
		<div class="form-group my-3">
			<h6>Body</h6>
			<editor :model="$v.post.body.$model" path='posts/body' :onChange="(content) => {this.$v.post.body.$model = content}"
				:valid="!$v.post.body.$invalid" :error="$v.post.body.$error" placeholder=""
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
		<div class="form-group my-3">
			<h6>Tags</h6>
			<input type="text" placeholder="eg differentiation calculus" v-model.trim="tag" @keyup="splitTag" class="form-control">
			<p class="my-2">
				<span v-for="tag in post.tags" @click="removeTag(tag)" class="bg-primary p-1 mr-1 cursor-pointer" :key="tag">
					<span class="text-white">{{ tag }} </span>
					<span class="text-danger ml-1">&times;</span>
				</span>
			</p>
			<small class="small text-muted" v-if="post.tags.length === 0">Add at least 3 relevant tags to your question, separated by spaces</small>
			<small class="small text-danger" v-else-if="$v.post.tags.$invalid">You must add at least 3 tags</small>
		</div>
		<div class="d-flex justify-content-end">
			<button class="btn-success" @click="login" v-if="!isLoggedIn">
				Login to continue
			</button>
			<button class="btn-success" :disabled="isLoading || $v.$invalid" @click="submitPost" v-else>
				<i class="fas fa-spinner fa-spin mr-2" v-if="isLoading"></i>
				<span>Post question</span>
			</button>
		</div>
	</form>
</template>

<script>
	import { required, minLength, maxLength } from 'vuelidate/lib/validators'
	import { mapActions, mapGetters } from 'vuex'
	export default {
		name: 'CreatePost',
		data: () => ({
			tag: '',
			post: {
				title: '',
				body: '',
				tags: [],
				subject: null,
				module: null
			},
			isLoading: false
		}),
		computed: {
			...mapGetters(['getCreatePost','getAllSubjects','isLoggedIn','questionsLeft']),
			getModules(){ return this.post.subject ? this.getAllSubjects.find(s => s.name === this.post.subject).modules : [] }
		},
		methods: {
			...mapActions(['setCreatePost','createPost','clearCreatePost','setAuthModalLogin','setPostModalNotify']),
			login(){
				this.setCreatePost(this.post)
				this.setAuthModalLogin()
				this.$router.push('/ask-a-question').catch(error => error)
			},
			splitTag(){
				this.tag.split(' ').map(tag => {
					tag = tag.toLowerCase()
					if(tag && !this.post.tags.includes(tag)){
						if(this.post.tags.length < 6){
							this.post.tags.push(tag)
						}else{
							new window.Toast({ icon: 'warning', title: 'You can only add up to 6 tags' })
						}
					}
				})
				this.tag = ''
			},
			removeTag(tag){
				this.post.tags = this.post.tags.filter(t => t !== tag)
			},
			setModule(){
				let subject = this.getAllSubjects.find(s => s.name === this.post.subject)
				if (subject && !subject.modules.find(m => m.name === this.post.module)) {
					this.post.module = null
				}
			},
			async submitPost(){
				this.isLoading = true
				if(this.questionsLeft){
					try{
						let id = await this.createPost(this.post)
						this.clearCreatePost()
						await this.$router.push(`/posts/${id}`)
					}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				}else{
					this.setCreatePost(this.post)
					this.setPostModalNotify()
				}
				this.isLoading = false
			}
		},
		mounted(){
			if(this.getCreatePost){
				this.post = this.getCreatePost
			}
		},
		activated(){
			if(this.getCreatePost){
				this.post = this.getCreatePost
			}
		},
		watch: {
			'post.subject':{
				handler: 'setModule',
				immediate: true
			},
			tag: {
				handler: 'splitTag',
				immediate: true
			}
		},
		validations:{
			post: {
				title: { required, minLength: minLength(3) },
				body: { required },
				tags: { required, minLength: minLength(3), maxLength: maxLength(6) },
				subject: { required },
				module: { required }
			}
		}
	}
</script>
