<template>
	<div class="modal-background">
		<div class="modal-inner">
			<div class="d-flex justify-content-between align-items-baseline mb-3">
				<h4>Create New Course</h4>
				<span class="text-danger" @click="closeModal"><i class="fa fa-times"></i></span>
			</div>
			<form>
				<div v-if="page === 1">
					<div class="form-group my-3">
						<input type="text" id="title" class="form-control" placeholder="Title" v-model.trim="$v.course.title.$model"
							:class="{'is-invalid': $v.course.title.$error, 'is-valid': !$v.course.title.$invalid}"
						>
					</div>
					<div class="form-group my-3">
						<textarea id="description" class="form-control" placeholder="Course Description" rows="4" v-model.trim="$v.course.description.$model"
                            :class="{'is-invalid': $v.course.description.$error, 'is-valid': !$v.course.description.$invalid}"
						></textarea>
					</div>
					<div class="form-group my-3">
						<h6>Tags</h6>
						<div class="custom-control custom-checkbox d-inline-block mx-1"  v-for="tag in tags" :key="tag">
							<input type="checkbox" class="custom-control-input" :id="tag"  v-model="$v.course.tags.$model" :value="tag">
							<label class="custom-control-label" :for="tag">{{ tag }}</label>
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
							<span>{{course.video.name}} </span>
							<span class="text-info">Upload video</span>
						</span>
					</div>
					<div class="form-group my-3">
						<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
						<span @click="$refs.imageInput.click()">
							<span>{{course.image.name}} </span>
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
							<span>{{course.preview.name}}  </span>
							<span class="text-info">Upload video preview</span>
						</span>
					</div>
					<div class="form-group my-3">
						<input type="file" @change="catchDocuments" class="d-none" ref="documentInput" multiple>
						<span>
							<span class="small">{{ course.documents.map(doc => doc.name).join(', ') }} </span>
							<span class="text-info" @click.prevent="$refs.documentInput.click()">Upload attachment files</span>
						</span>
					</div>
					<div class="d-flex justify-content-between align-items-center my-3">
						<button class="bg-info" @click.prevent="goToPrevious">
							<i class="fas fa-angle-left mr-2"></i>
							<span>Previous</span>
						</button>
						<button @click.prevent="createCourse" :class="{'opacity-25':$v.$invalid, 'primary-button': !$v.$invalid}" :disabled="$v.$invalid">Submit</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			course: {
				title: '',
				description: '',
				premium: false,
				tags: [],
				user_id: 1,
				video: {},
				image: {},
				preview: {},
				documents: []
			},
            tags: ['Mathematics', 'Physics','Chemistry'],
			page: 1
		}),
		computed: {
			cannotGoToNext(){ return this.$v.course.title.$invalid || this.$v.course.description.$invalid || this.$v.course.tags.$invalid }
		},
		methods: {
			closeModal(){ window.Fire.$emit('closeCourseNewModal') },
			goToNext(){ this.page = 2},
			goToPrevious(){ this.page = 1},
			catchVideo(e){
				if (e.target.files[0]){
					e.target.files[0].type.startsWith('video/') ? this.course.video = e.target.files[0] : new window.toast({ icon:'error', title: 'File is not a video'})
				}
			},
			catchImage(e){
				if(e.target.files[0]){
					e.target.files[0].type.startsWith('image/') ? this.course.image = e.target.files[0] : new window.toast({ icon:'error', title: 'File is not an image'})
				}
			},
			catchPreview(e){
				if(e.target.files[0]){
					e.target.files[0].type.startsWith('video/') ? this.course.preview = e.target.files[0] : new window.toast({ icon:'error', title: 'File is not a video'})
				}
			},
			catchDocuments(e){
				this.course.documents = []
				this.course.documents.push(...e.target.files)
			},
			createCourse(){
				if(!this.$v.$error && !this.$v.invalid){
					// TODO: Upload video and append storage url to course object
					// TODO: Upload image and append storage url to course object
					// TODO: Upload preview and append storage url to course object
					// TODO: Create course in firebase
					// TODO: Close modal and redirect to course page
				}
			}
		},
		validations:{
			course: {
                title: { required, minLength: minLength(3) },
                description: { required, minLength: minLength(3) },
                premium: { required },
				tags: { required, minLength: minLength(1) },
				video: { required },
				image: { required },
				preview: { requiredIf: requiredIf('premium') },
				documents: { required, minLength: minLength(1) }
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../style/index';
	button{
		margin: 0.5rem 0;
		padding: 0.5rem 1.5rem;
		color: $white;
		max-width: 700px;
		box-shadow: none;
	}
</style>