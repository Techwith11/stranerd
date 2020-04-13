<template>
	<div class="modal-background">
		<div class="modal-outside"></div>
		<div class="modal-inner">
			<div class="d-flex justify-content-between align-items-center mb-4">
				<h4>Create New Course</h4>
				<span class="text-danger" @click="closeModal"><i class="fa fa-times"></i></span>
			</div>
			<form>
				<div class="form-group">
					<label for="title">Title</label>
					<input type="text" id="title" class="form-control" placeholder="Title" v-model.trim="$v.course.title.$model"
						:class="{'is-invalid': $v.course.title.$error, 'is-valid': !$v.course.title.$invalid}"
					>
				</div>
				<div class="my-3">
					<input type="file" @change="catchVideo" class="d-none" ref="videoInput" accept="video/*">
					<span @click="$refs.videoInput.click()">
						<span>{{video.name}} </span>
						<span class="text-info">Choose video</span>
					</span>
				</div>
				<div class="my-3">
					<input type="file" @change="catchImage" class="d-none" ref="imageInput"  accept="image/*">
					<span @click="$refs.imageInput.click()">
						<span>{{image.name}} </span>
						<span class="text-info">Choose image preview</span>
					</span>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea id="description" class="form-control" placeholder="Course Description" rows="4" v-model.trim="$v.course.description.$model"
						:class="{'is-invalid': $v.course.description.$error, 'is-valid': !$v.course.description.$invalid}"
					></textarea>
				</div>
				<div class="custom-control custom-checkbox">
					<input type="checkbox" class="custom-control-input" id="isPremium"  v-model="$v.course.premium.$model">
					<label class="custom-control-label" for="isPremium">Is premium?</label>
				</div>
				<div  v-if="course.premium" class="my-3">
					<input type="file" @change="catchPreview" class="d-none" ref="previewInput"  accept="video/*">
					<span @click.prevent="$refs.previewInput.click()">
						<span>{{preview.name}}  </span>
						<span class="text-info">Upload preview</span>
					</span>
				</div>
				<button type="submit" class="btn" id="submit" @click.prevent="createCourse" :disabled="$v.$invalid || $v.$error">Submit</button>
			</form>
		</div>
	</div>
</template>

<script>
	import { required, minLength } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			course: {
				title: '',
				description: '',
				premium: false,
			},
			video: {},
			image: {},
			preview: {},
		}),
		methods: {
			closeModal(){ window.Fire.$emit('closeCourseNewModal') },
			catchVideo(e){ e.target.files[0].type.startsWith('video/') ? this.video = e.target.files[0] : new window.toast({ icon:'error', title: 'File is not a video'}) },
			catchImage(e){ e.target.files[0].type.startsWith('image/') ? this.image = e.target.files[0] : new window.toast({ icon:'error', title: 'File is not an image'})},
			catchPreview(e){ e.target.files[0].type.startsWith('video/') ? this.preview = e.target.files[0] : new window.toast({ icon:'error', title: 'File is not a video'})},
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
                premium: { required }
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../style/index';
	#submit{
		border-radius: 0;
		background: $accent !important;
		color: $white;
		float: right;
	}
</style>