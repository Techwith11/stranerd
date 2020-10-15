<template>
	<div>
		<helper-spinner v-if="subjectLoading" />
		<template v-else>
			<slot name="title"><h4>Title</h4></slot>
			<form class="mx-2" @submit.prevent="submit">
				<div class="form-group my-3">
					<h6 class="font-weight-bold">Course Title</h6>
					<input class="form-control" placeholder="Title" v-model="factory.title"
						:class="{'is-invalid': factory.errors.title, 'is-valid': factory.isValid('title')}">
					<span class="small" v-if="factory.errors.title">{{ factory.errors.title }}</span>
				</div>
				<div class="form-group my-3">
					<h6 class="font-weight-bold">Course Description</h6>
					<editor :model.sync="factory.description" path='courses/description'
						:valid="factory.isValid('description')" :error="factory.errors.description" placeholder="Description"
					/>
				</div>
				<div class="form-group my-3">
					<h6 class="font-weight-bold">Course's Subject</h6>
					<select class="form-control text-capitalize" v-model="factory.subject" :class="{'is-invalid': factory.errors.subject, 'is-valid': factory.isValid('subject')}">
						<option value="" disabled>Please select a subject</option>
						<option :value="subject.name" v-for="subject in subjects" :key="subject.id">{{ subject.name }}</option>
					</select>
					<small class="small text-danger d-block" v-if="factory.errors.subject">{{ factory.errors.subject }}</small>
				</div>
				<div class="form-group my-3">
					<h6 class="font-weight-bold">Course's Module</h6>
					<select class="form-control text-capitalize" v-model="factory.module" :class="{'is-invalid': factory.errors.module, 'is-valid': factory.isValid('module')}">
						<option value="" disabled>Please select a {{ factory.subject ? 'module' : 'subject first' }}</option>
						<option :value="module.name" v-for="module in modules" :key="module.name">{{ module.name }}</option>
					</select>
					<small class="small text-danger d-block" v-if="factory.errors.module">{{ factory.errors.module }}</small>
				</div>
				<h5 class="mt-5 font-weight-bold">Media</h5>
				<hr>
				<div class="form-group my-3">
					<h6 class="font-weight-bold">Preview Image</h6>
					<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
					<a @click.prevent="() => { $refs.imageInput.value= ''; $refs.imageInput.click() }" class="d-block">
						<span v-if="factory.image">{{ factory.image.name }} </span>
						<span class="text-info">Upload image preview</span>
					</a>
					<span class="small text-danger" v-if="factory.errors.image">{{ factory.errors.image }}</span>
				</div>
				<hr>
				<div class="form-check">
					<input class="form-check-input" type="checkbox" v-model="factory.hasVideo" id="hasVideo">
					<label class="form-check-label" for="hasVideo">
						Course has video?
					</label>
					<span class="small text-danger" v-if="factory.errors.hasVideo">{{ factory.errors.hasVideo }}</span>
				</div>
				<div class="form-group my-3" v-if="factory.hasVideo">
					<h6 class="font-weight-bold">Course Video</h6>
					<input type="file" @change="catchVideo" class="d-none" ref="videoInput" accept="video/*">
					<a @click.prevent="() => { $refs.videoInput.value= ''; $refs.videoInput.click() }" class="d-block">
						<span v-if="factory.video">{{ factory.video.name }} </span>
						<span class="text-info">Upload video</span>
					</a>
					<span class="small text-danger" v-if="factory.errors.video">{{ factory.errors.video }}</span>
				</div>
				<hr>
				<div class="form-group my-3">
					<h6 class="font-weight-bold">Course Documents</h6>
					<input type="file" @change="catchDocuments" class="d-none" ref="documentInput" multiple>
					<span v-for="doc in factory.documents" :key="doc.name">{{ doc.name}}<i class="fas fa-times text-danger mr-2 mr-1" @click.prevent="factory.removeDocument(doc)"></i></span>
					<a class="text-info d-block" @click.prevent="() => { $refs.documentInput.value= ''; $refs.documentInput.click() }">Upload attachment files</a>
					<span class="small text-danger" v-if="factory.errors.documents">{{ factory.errors.documents }}</span>
				</div>
				<hr>
				<div class="d-flex flex-column my-3">
					<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
						<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
						<span>
						<slot name="buttonText">Submit</slot>
					</span>
					</button>
				</div>
			</form>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'
import { useFileInputs, useMultipleFileInputs } from '@/usecases/core/forms'
import { CourseFactory } from '@modules/courses/domain/factories/course'
import { useSubjects } from '@/usecases/courses/subjects'
export default defineComponent({
	name: 'ArticleForm',
	props: {
		factory: {
			type: CourseFactory,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		submit: {
			type: Function,
			required: true
		}
	},
	setup(props) {
		const { subjects, loading: subjectLoading } = useSubjects()
		const modules = computed(() => subjects.value.find((s) => s.name === props.factory.subject)?.modules ?? [])
		const { catchFiles: catchImage } = useFileInputs(
			(file:File) => props.factory.image = file
		)
		const { catchFiles: catchVideo } = useFileInputs(
			(file:File) => props.factory.video = file
		)
		const { catchMultipleFiles: catchDocuments } = useMultipleFileInputs(
			(files) => files.forEach(props.factory.addDocument)
		)
		return { catchImage, catchVideo, catchDocuments, subjects, modules, subjectLoading }
	}
})
</script>
