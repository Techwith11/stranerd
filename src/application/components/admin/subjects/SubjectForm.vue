<template>
	<div>
		<slot name="title"><h4>Title</h4></slot>
		<form class="mx-2" @submit.prevent="submit">
			<div class="form-group my-3">
				<h6>Name</h6>
				<input class="form-control" placeholder="Subject name" v-model.trim="factory.name"
					:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}">
				<small class="small text-danger d-block" v-if="factory.errors.name">{{ factory.errors.name }}</small>
			</div>
			<div class="form-group my-3">
				<h6>Modules</h6>
				<small class="small text-muted" v-if="factory.modules && factory.modules.length === 0">Add modules for the subject. At least one module is required.</small>
				<small class="small text-danger d-block" v-else-if="factory.errors.modules">{{ factory.errors.modules }}</small>
				<div>
					<div v-for="module in factory.modules" :key="module.name" class="d-flex justify-content-between align-items-center mb-2">
						<div class="mb-0">
							<span class="lead">{{ module.name }}</span>
							<span class="ml-2 text-info">{{ module.image && module.image.name }}</span>
						</div>
						<a class="cursor-pointer text-danger" @click.prevent="removeModule(module.name)"><i class="fas fa-trash"></i></a>
					</div>
				</div>
				<div class="mt-5">
					<div class="form-group">
						<h6>New module</h6>
						<input class="form-control" placeholder="Module name" v-model.trim="factory.moduleName"
							:class="{'is-invalid': factory.errors.moduleName, 'is-valid': factory.isValid('moduleName')}">
						<small class="small text-danger d-block" v-if="factory.errors.moduleName">{{ factory.errors.moduleName }}</small>
					</div>
					<div class="form-group">
						<input type="file" @change="catchImage" class="d-none" ref="imageInput" accept="image/*">
						<a @click.prevent="() => { $refs.imageInput.value= ''; $refs.imageInput.click() }">
							<span v-if="factory.moduleImage">{{ factory.moduleImage.name }} </span>
							<span class="text-info">Upload preview image</span>
						</a>
						<small class="small text-danger d-block" v-if="factory.errors.moduleImage">{{ factory.errors.moduleImage }}</small>
					</div>
				</div>
			</div>
			<div class="d-flex justify-content-end my-3">
				<button class="btn btn-outline-gold" @click.prevent="factory.addModule" :disabled="loading || !factory.moduleValid">
					<span>Add module</span>
				</button>
				<button class="btn btn-gold" type="submit" :disabled="loading || !factory.valid">
					<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
					<span><slot name="buttonText">Submit</slot></span>
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useFileInputs } from '@/usecases/core/forms'
import { SubjectFactory } from '@root/modules/courses/domain/factories/subject'
import { Alert } from '@/config/notifications'
export default defineComponent({
	props: {
		factory: {
			type: SubjectFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		}
	},
	setup(props){
		const { catchFiles: catchImage } = useFileInputs(
			(file:File) => props.factory.moduleImage = file
		)
		const removeModule = async (module: string) => {
			const res = await Alert({
				title: `Delete ${module}`,
				text: 'Are you sure you want to delete this module',
				icon: 'info',
				confirmButtonText: 'Delete'
			})
			if(res.value) props.factory.removeModule(module)
		}
		return { catchImage, removeModule }
	}
})
</script>
