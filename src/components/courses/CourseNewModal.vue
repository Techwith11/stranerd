<template>
	<div class="modal-background">
		<div class="modal-outside" @click="closeModal"></div>
		<div class="modal-inner">
			<div class="d-flex justify-content-between align-items-center">
				<h4>Create New Course</h4>
				<span class="text-danger" @click="closeModal"><i class="fa fa-times"></i></span>
			</div>
			<form>
				<div class="form-group">
					<label for="title">Title</label>
					<input type="text" id="title" name="title" class="form-control" placeholder="Title" v-model="course.title">
				</div>
				<div>
					<input type="file" @change="catchVideo" class="d-none" ref="videoInput">
					<p @click="$refs.videoInput.click()">
						<span>{{file.name}} </span>
						<span class="text-info">Choose file</span>
					</p>
				</div>
				<div class="form-group">
					<label for="description">Description</label>
					<textarea id="description" class="form-control" placeholder="Course Description" rows="4"  v-model="course.description"></textarea>
				</div>
				<div class="custom-control custom-checkbox">
					<input type="checkbox" class="custom-control-input" id="isPremium"  v-model="course.premium">
					<label class="custom-control-label" for="isPremium">Is premium?</label>
				</div>
				<div  v-if="course.premium">
					<input type="file" @change="catchPreview" class="d-none" ref="previewInput">
					<p @click.prevent="$refs.previewInput.click()">
						<span>{{preview.name}}  </span>
						<span class="text-info">Upload preview</span>
					</p>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			course: {
				title: '',
				description: '',
				premium: false,
			},
			file: {},
			preview: {},
		}),
		methods: {
			closeModal(){
				window.Fire.$emit('closeCourseNewModal')
			},
			catchVideo(e){
				this.file = e.target.files[0]
			},
			catchPreview(e){
                this.preview = e.target.files[0]
			}
		}
	}
</script>