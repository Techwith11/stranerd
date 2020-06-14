<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i></i>
			<h4>Edit Course</h4>
			<a @click.prevent="closeEditModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<form>
			<div v-if="page === 1">
				<div class="form-group my-3">
					<input type="text" id="title" class="form-control" placeholder="Title" v-model.trim="$v.course.title.$model"
						:class="{'is-invalid': $v.course.title.$error, 'is-valid': !$v.course.title.$invalid}">
				</div>
				<div class="form-group my-3">
					<vue-editor class="rounded border" v-model.trim="$v.course.description.$model" :editor-toolbar="customToolBar"
						:class="{'border-danger': $v.course.description.$error, 'border-success': !$v.course.description.$invalid}" placeholder="Course description..."
					/>
				</div>
				<div class="form-group my-3">
					<h6>Subject</h6>
					<select class="form-control" v-model="$v.course.subject.$model" :class="{'is-invalid': $v.course.subject.$error, 'is-valid': !$v.course.subject.$invalid}">
						<option :value="null" disabled>Please select a subject</option>
						<option :value="subject.name" v-for="subject in subjects" :key="subject['.key']">{{ subject.name }}</option>
					</select>
				</div>
				<div class="d-flex justify-content-end my-3">
					<button class="text-white my-2 py-2 px-4" @click.prevent="goToNext" :class="cannotGoToNext ? 'opacity-25' : 'bg-info'" :disabled="cannotGoToNext">
						<span>Next</span>
						<i class="fas fa-angle-right ml-2"></i>
					</button>
				</div>
			</div>
			<div v-if="page === 2">
				<div class="form-group my-3">
					<input type="file" @change="catchVideo" class="d-none" ref="videoInput" accept="video/*">
					<a @click.prevent="() => { $refs.videoInput.value= ''; $refs.videoInput.click() }">
						<span v-if="video">{{video.name}} </span>
						<span class="text-info">Change video</span>
					</a>
				</div>
				<div class="form-group my-3">
					<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
					<a @click.prevent="() => { $refs.imageInput.value= ''; $refs.imageInput.click() }">
						<span v-if="image">{{image.name}} </span>
						<span class="text-info">Change image preview</span>
					</a>
				</div>
				<div class="custom-control custom-checkbox my-3">
					<input type="checkbox" class="custom-control-input" id="isPremium"  v-model="$v.course.premium.$model"
						:class="$v.course.premium.$error ? 'text-danger' : 'text-muted'">
					<label class="custom-control-label" for="isPremium">Is course premium?</label>
				</div>
				<div v-if="course.premium" class="form-group my-3">
					<input type="file" @change="catchPreview" class="d-none" ref="previewInput" accept="video/*">
					<a @click.prevent="() => { $refs.previewInput.value= ''; $refs.previewInput.click() }">
						<span v-if="preview">{{preview.name}}  </span>
						<span class="text-info">Change video preview</span>
					</a>
				</div>
				<div class="form-group my-3">
					<input type="file" @change="catchDocuments" class="d-none" ref="documentInput" multiple>
					<span v-for="doc in documents" :key="doc.name">{{ doc.name}}<i class="fas fa-times text-danger mr-2" @click.prevent="removeDocument(doc)"></i></span>
					<a class="text-info" @click.prevent="() => { $refs.documentInput.value= ''; $refs.documentInput.click() }">Upload attachment files</a>
				</div>
				<div class="d-flex justify-content-between align-items-center my-3">
					<button class="bg-info text-white my-2 py-2 px-4" @click.prevent="goToPrevious">
						<i class="fas fa-angle-left mr-2"></i>
						<span>Previous</span>
					</button>
					<button class="text-white my-2 py-2 px-4" @click.prevent="submitCourse" :class="{'opacity-25':$v.$invalid || needsPreview, 'primary-button': !$v.$invalid && !needsPreview}" :disabled="cannotSubmit">
						<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
						<span v-else>Save course</span>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>


<script>
	import { mapActions, mapGetters } from 'vuex'
	import { firestore } from '@/config/firebase'
	import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
	export default {
		name: 'EditCourse',
		data: () => ({
			course: {
				title: '',
				description: '',
				premium: false,
				subject: null
			},
			video: null,
			image: null,
			preview: null,
			documents: [],
			subjects: [],
			isLoading: false,
			page: 1,
			customToolBar: [
				[{header: [false,1,2,3,4,5,6]}], ['bold','italic','underline','strikethrough'],
				[{align:''},{align:'center'},{align:'right'},{align:'justify'}],
				['blockquote','code-block'], [{list:'ordered'},{list:'bullet'},{list:'check'}],
				[{color:[]},{background:[]}], ['link'/*,'image','video'*/],['clean']
			]
		}),
		async mounted(){
			this.course = this.getEditMeta
			this.video = this.course.video
			this.image = this.course.image
			this.course.premium ? this.preview = this.course.preview : null
			this.documents = this.course.documents
			this.clearEditMeta()
			let docs = await firestore.collection('subjects').get()
			docs.forEach(doc => this.subjects.push({ '.key': doc.id, ...doc.data() }))
		},
		computed: {
			...mapGetters(['getEditMeta']),
			cannotGoToNext(){ return this.$v.course.title.$invalid || this.$v.course.description.$invalid || this.$v.course.subject.$invalid },
			needsPreview(){ return this.course.premium === true && !this.preview },
			cannotSubmit(){ return this.$v.$invalid || this.isLoading || this.needsPreview }
		},
		methods: {
			...mapActions(['closeEditModal','editCourse','clearEditMeta']),
			goToNext(){ this.page = 2},
			goToPrevious(){ this.page = 1},
			catchVideo(e){ e.target.files[0] && e.target.files[0].type.startsWith('video/') ? this.video = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not a video'})},
			catchImage(e){ e.target.files[0] &&e.target.files[0].type.startsWith('image/') ? this.image = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not an image'})},
			catchPreview(e){ e.target.files[0] && e.target.files[0].type.startsWith('video/') ? this.preview = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not a video'})},
			catchDocuments(e){
				e.target.files.forEach(file => {
					if(this.documents.find(doc => doc.name === file.name)){ return }
					this.documents.push(file)
				})
			},
			removeDocument(document){ this.documents = this.documents.filter(doc => doc.name !== document.name) },
			async submitCourse(){
				this.isLoading = true
				try{
					await this.editCourse({
						video: this.video,
						image: this.image,
						documents: this.documents,
						course: this.course,
						preview: this.preview
					})
					window.Fire.$emit('CourseEdited',this.course)
					this.closeEditModal()
					new window.Toast({ icon: 'success', title: 'Course updated successfully' })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		validations: {
			course: {
				title: { required, minLength: minLength(3) },
				description: { required },
				premium: { required },
				subject: { required },
			},
			video: { required },
			image: { required },
			preview: { requiredIf: requiredIf('course.premium') },
			documents: { required, minLength: minLength(1) }
		}
	}
</script>

<style lang="scss" scoped>
	button{
		min-width: 150px;
	}
</style>