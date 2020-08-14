<template>
	<div>
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<i></i>
			<h4><slot name="title">Title</slot></h4>
			<a @click.prevent="closeCreateModal"><i class="fas fa-times text-danger"></i></a>
		</div>
		<form class="mx-2" @submit.prevent="submit">
			<div class="form-group my-3">
				<h6>Name</h6>
				<input class="form-control" placeholder="Subject name" v-model.trim="factory.name"
					:class="{'is-invalid': factory.errors.name, 'is-valid': factory.isValid('name')}">
				<small class="small text-danger d-block" v-if="factory.errors.name">{{ factory.errors.name }}</small>
			</div>
			<div class="form-group my-3">
				<h6>Modules</h6>
				<small class="small text-muted" v-if="factory.modules.length === 0">Add modules for the subject. At least one module is required.</small>
				<small class="small text-danger d-block" v-else-if="factory.errors.modules">{{ factory.errors.modules }}</small>
				<div>
					<div v-for="module in factory.modules" :key="module.name" class="d-flex justify-content-between align-items-center mb-2">
						<div class="mb-0">
							<span class="text-capitalize lead">{{ module.name }}</span>
							<span class="ml-2 text-info">{{ module.image.name }}</span>
						</div>
						<a class="cursor-pointer text-danger" @click.prevent="factory.removeModule(module.name)"><i class="fas fa-trash"></i></a>
					</div>
				</div>
				<div class="my-3">
					<div class="form-group">
						<h6>Module Name</h6>
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
				<button class="btn btn-secondary" @click.prevent="factory.addModule" :disabled="loading || !factory.moduleValid">
					<span>Add module</span>
				</button>
				<button class="btn btn-success" type="submit" :disabled="loading || !factory.valid">
					<i class="fas fa-spinner fa-spin mr-2" v-if="loading"></i>
					<span>
						<slot name="buttonText">Submit</slot>
					</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from '@vue/composition-api'
	import store from '@/store'
	import { useFileInputs } from '@/usecases/core/useForms'
	import { SubjectFactory } from '@root/modules/courses/domain/factories/subject'
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
			return {
				catchImage,
				closeCreateModal: () => store.dispatch('closeCreateModal')
			}
		}
	})
</script>
