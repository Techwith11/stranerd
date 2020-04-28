<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i class="fas fa-arrow-left" @click="setCreateModalOverview"></i>
			<h4>Create Course</h4>
			<i></i>
		</div>
		<form>
			<div v-if="page === 1">
				<div class="form-group my-3">
					<input type="text" id="title" class="form-control" placeholder="Title" v-model.trim="$v.course.title.$model"
						:class="{'is-invalid': $v.course.title.$error, 'is-valid': !$v.course.title.$invalid}">
				</div>
				<div class="form-group my-3">
					<textarea id="description" class="form-control" placeholder="Course Description" rows="4" v-model.trim="$v.course.description.$model"
                        :class="{'is-invalid': $v.course.description.$error, 'is-valid': !$v.course.description.$invalid}"
					></textarea>
				</div>
				<div class="form-group my-3">
					<h6>Tags</h6>
					<div class="custom-control custom-checkbox d-inline-block mx-1"  v-for="tag in tags" :key="tag.name">
						<input type="checkbox" class="custom-control-input" :id="tag.name"  v-model="$v.course.tags.$model" :value="tag.name">
						<label class="custom-control-label" :for="tag.name">{{ tag.name }}</label>
					</div>
					<small id="tagsHelpBlock" class="form-text" :class="$v.course.tags.$error ? 'text-danger' : 'text-muted'">
						Please select at least one tag
					</small>
				</div>
				<div class="d-flex justify-content-end my-3">
					<button @click.prevent="goToNext" :class="cannotGoToNext ? 'opacity-25' : 'bg-info'" :disabled="cannotGoToNext">
						<span>Next</span>
						<i class="fas fa-angle-right ml-2"></i>
					</button>
				</div>
			</div>
			<div v-if="page === 2">
				<div class="form-group my-3">
					<input type="file" @change="catchVideo" class="d-none" ref="videoInput" accept="video/*">
					<span @click="$refs.videoInput.click()">
						<span>{{video.name}} </span>
						<span class="text-info">Upload video</span>
					</span>
				</div>
				<div class="form-group my-3">
					<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
					<span @click="$refs.imageInput.click()">
						<span>{{image.name}} </span>
						<span class="text-info">Upload image preview</span>
					</span>
				</div>
				<div class="custom-control custom-checkbox my-3">
					<input type="checkbox" class="custom-control-input" id="isPremium"  v-model="$v.course.premium.$model"
						:class="$v.course.premium.$error ? 'text-danger' : 'text-muted'">
					<label class="custom-control-label" for="isPremium">Is course premium?</label>
				</div>
				<div v-if="course.premium" class="form-group my-3">
					<input type="file" @change="catchPreview" class="d-none" ref="previewInput" accept="video/*">
					<span @click="$refs.previewInput.click()">
						<span>{{preview.name}}  </span>
						<span class="text-info">Upload video preview</span>
					</span>
				</div>
				<div class="form-group my-3">
					<input type="file" @change="catchDocuments" class="d-none" ref="documentInput" multiple>
					<span>
						<span class="small">{{ documents.map(doc => doc.name).join(', ') }} </span>
						<span class="text-info" @click.prevent="$refs.documentInput.click()">Upload attachment files</span>
					</span>
				</div>
				<div class="d-flex justify-content-between align-items-center my-3">
					<button class="bg-info" @click.prevent="goToPrevious">
						<i class="fas fa-angle-left mr-2"></i>
						<span>Previous</span>
					</button>
					<button @click.prevent="createCourse" :class="{'opacity-25':$v.$invalid, 'primary-button': !$v.$invalid}" :disabled="$v.$invalid || isLoading">
						<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
						<span v-else>Submit</span>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>


<script>
	import { mapActions } from 'vuex'
	import { firestore, storage } from '@/config/firebase'
	import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
	export default {
		name: 'CreateCourse',
		data: () => ({
			course: {
				title: '',
				description: '',
				premium: false,
				tags: [],
				video: {},
				image: {},
				preview: {},
				documents: [],
			},
			video: {},
			image: {},
			preview: {},
			documents: [],
			tags: [],
			isLoading: false,
			page: 1
		}),
		async mounted(){
			let docs = await firestore.collection('subjects').get()
			docs.forEach(doc => this.tags.push({ '.key': doc.id, ...doc.data() }))
		},
		computed: {
			cannotGoToNext(){ return this.$v.course.title.$invalid || this.$v.course.description.$invalid || this.$v.course.tags.$invalid }
		},
		methods: {
			...mapActions(['setCreateModalOverview', 'closeCreateModal']),
			closeModal(){ window.Fire.$emit('closeCourseNewModal') },
			goToNext(){ this.page = 2},
			goToPrevious(){ this.page = 1},
			catchVideo(e){
				if (e.target.files[0]){
					e.target.files[0].type.startsWith('video/') ? this.video = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not a video'})
				}
			},
			catchImage(e){
				if(e.target.files[0]){
					e.target.files[0].type.startsWith('image/') ? this.image = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not an image'})
				}
			},
			catchPreview(e){
				if(e.target.files[0]){
					e.target.files[0].type.startsWith('video/') ? this.preview = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not a video'})
				}
			},
			catchDocuments(e){
				this.documents = []
				this.documents.push(...e.target.files)
			},
			async uploadVideo(){
				new window.Toast({ icon: 'success', title: 'Video uploading' })
				let name = `courses/videos/${Date.now()}_${this.video.name}}`
				await storage.ref(name).put(this.video)
				let link = await storage.ref(name).getDownloadURL()
				this.course.video = { name, link, type: this.video.type }
				return new window.Toast({ icon: 'success', title: 'Video uploaded' })
			},
			async uploadImage(){
				new window.Toast({ icon: 'success', title: 'Image uploading' })
				let name = `courses/images/${Date.now()}_${this.image.name}}`
				await storage.ref(name).put(this.image)
				let link = await storage.ref(name).getDownloadURL()
				this.course.image = { name, link, type: this.image.type }
				return new window.Toast({ icon: 'success', title: 'Image uploaded' })
			},
			async uploadPreview(){
				new window.Toast({ icon: 'success', title: 'Preview uploading' })
				let name = `courses/previews/${Date.now()}_${this.preview.name}}`
				await storage.ref(name).put(this.preview)
				let link = await storage.ref(name).getDownloadURL()
				this.course.preview = { name, link, type: this.preview.type }
				return new window.Toast({ icon: 'success', title: 'Preview uploaded' })
			},
			uploadDocuments(){
				new window.Toast({ icon: 'success', title: 'Documents uploading' })
				let promises = this.documents.map(async (document) => {
					let name = `courses/documents/${Date.now()}_${document.name}`
					await storage.ref(name).put(document)
					let link = await storage.ref(name).getDownloadURL()
					return this.course.documents.push({ name, link, type: document.type })
				})
				return Promise.all(promises).then(() => {
					new window.Toast({ icon: 'success', title: 'Documents uploaded' })
				})
			},
			async createCourse(){
				this.isLoading = true
				await this.uploadVideo()
				await this.uploadImage()
				if(this.course.premium){
					await this.uploadPreview()
				}
				await this.uploadDocuments()
				firestore.collection('courses').add(this.course).then(() => {
					this.isLoading = false
					this.closeCreateModal()
					new window.Toast({ icon: 'success', title: 'Course created successfully' })
				}).catch(error => {
					this.isLoading = false
					new window.Toast({ icon: 'error', title: error.message })
				})
			}
		},
		validations: {
			course: {
				title: { required, minLength: minLength(3) },
				description: { required, minLength: minLength(3) },
				premium: { required },
				tags: { required, minLength: minLength(1) },
			},
			video: { required },
			image: { required },
			preview: { requiredIf: requiredIf('premium') },
			documents: { required, minLength: minLength(1) }
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../../style/index';
	input{
		padding: 1rem;
		max-width: 700px;
	}
	.form-group{
		margin: 1rem 0;
	}
	button{
		margin: 0.5rem 0;
		padding: 0.5rem 1.5rem;
		color: $white;
		display: block;
		min-width: 256px;
		max-width: 700px;
		box-shadow: none;
	}
</style>