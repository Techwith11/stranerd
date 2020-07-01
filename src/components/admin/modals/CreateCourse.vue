<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<a @click.prevent="setCreateModalOverview"><i class="fas fa-arrow-left"></i></a>
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
					<vue-editor class="rounded border" v-model.trim="$v.course.description.$model" :editor-toolbar="customToolBar"
						:class="{'border-danger': $v.course.description.$error, 'border-success': !$v.course.description.$invalid}" placeholder="Course description..."
					/>
				</div>
				<div class="form-group my-3">
					<h6>Subject</h6>
					<select class="form-control text-capitalize" v-model="$v.course.subject.$model" :class="{'is-invalid': $v.course.subject.$error, 'is-valid': !$v.course.subject.$invalid}">
						<option :value="null" disabled>Please select a subject</option>
						<option :value="subject.name" v-for="subject in getAllSubjects" :key="subject['.key']">{{ subject.name }}</option>
					</select>
				</div>
				<div class="form-group my-3">
					<h6>Module</h6>
					<select class="form-control text-capitalize" v-model="$v.course.module.$model" :class="{'is-invalid': $v.course.module.$error, 'is-valid': !$v.course.module.$invalid}">
						<option :value="null" disabled>Please select a {{ course.subject ? 'module' : 'subject first' }}</option>
						<option :value="module" v-for="module in getModules" :key="module">{{ module }}</option>
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
				<div class="form-check">
					<input class="form-check-input" type="checkbox" v-model="course.hasVideo" id="hasVideo">
					<label class="form-check-label" for="hasVideo">
						Course has video?
					</label>
				</div>
				<div class="form-group my-3" v-if="course.hasVideo">
					<input type="file" @change="catchVideo" class="d-none" ref="videoInput" accept="video/*">
					<a @click.prevent="() => { $refs.videoInput.value= ''; $refs.videoInput.click() }">
						<span v-if="video">{{video.name}} </span>
						<span class="text-info">Upload video</span>
					</a>
				</div>
				<div class="form-group my-3">
					<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
					<a @click.prevent="() => { $refs.imageInput.value= ''; $refs.imageInput.click() }">
						<span v-if="image">{{image.name}} </span>
						<span class="text-info">Upload image preview</span>
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
					<button class="text-white my-2 py-2 px-4" @click.prevent="submitCourse" :class="{'opacity-25':$v.$invalid, 'primary-button': !$v.$invalid}" :disabled="cannotSubmit">
						<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
						<span v-else>Submit</span>
					</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
	export default {
		name: 'CreateCourse',
		data: () => ({
			course: {
				title: '',
				description: '',
				hasVideo: false,
				module: null,
				subject: null
			},
			video: null,
			image: null,
			documents: [],
			isLoading: false,
			page: 1,
			customToolBar: [
				[{header: [false,1,2,3,4,5,6]}], ['bold','italic','underline','strikethrough'],
				[{align:''},{align:'center'},{align:'right'},{align:'justify'}],
				['blockquote','code-block'], [{list:'ordered'},{list:'bullet'},{list:'check'}],
				[{color:[]},{background:[]}], ['link'/*,'image','video'*/],['clean']
			]
		}),
		computed: {
			...mapGetters(['getAllSubjects']),
			cannotGoToNext(){ return this.$v.course.$invalid },
			cannotSubmit(){ return this.$v.$invalid || this.isLoading },
			getModules(){ return this.course.subject ? this.getAllSubjects.find(s => s.name === this.course.subject).modules : [] }
		},
		methods: {
			...mapActions(['setCreateModalOverview','closeCreateModal','createCourse']),
			goToNext(){ this.page = 2},
			goToPrevious(){ this.page = 1},
			catchVideo(e){ e.target.files[0] && e.target.files[0].type.startsWith('video/') ? this.video = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not a video'})},
			catchImage(e){ e.target.files[0] &&e.target.files[0].type.startsWith('image/') ? this.image = e.target.files[0] : new window.Toast({ icon:'error', title: 'File is not an image'})},
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
					let res = await this.createCourse({
						video: this.video,
						image: this.image,
						documents: this.documents,
						course: this.course
					})
					await this.$router.push(`/courses/${res.id}`)
					this.closeCreateModal()
					new window.Toast({ icon: 'success', title: 'Course created successfully' })
				}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
				this.isLoading = false
			}
		},
		validations: {
			course: {
				title: { required, minLength: minLength(3) },
				description: { required },
				hasVideo: { required },
				subject: { required },
				module: { required }
			},
			video: { requiredIf: requiredIf(function(){ return this.course.hasVideo }) },
			image: { required },
			documents: { required, minLength: minLength(1) }
		},
		watch: {
			'course.subject'() {
				let subject = this.getAllSubjects.find(s => s.name === this.course.subject)
				if (subject && !subject.modules.includes(this.course.module)) {
					this.course.module = null
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	button{
		min-width: 150px;
	}
</style>