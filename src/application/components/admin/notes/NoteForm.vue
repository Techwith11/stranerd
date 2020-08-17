<template>
	<div>
		<slot name="title"><h4>Title</h4></slot>
		<form class="mx-2" @submit.prevent="submit">
			<div class="form-group my-3">
				<h6 class="font-weight-bold">Note Title</h6>
				<input class="form-control" placeholder="Title" v-model.trim="factory.title"
					:class="{'is-invalid': factory.errors.title, 'is-valid': factory.isValid('title')}">
				<small class="small text-danger d-block" v-if="factory.errors.title">{{ factory.errors.title }}</small>
			</div>
			<div class="form-group my-3">
				<h6 class="font-weight-bold">Note Description</h6>
				<textarea class="form-control" placeholder="Description..." v-model.trim="factory.description" rows="3"
					:class="{'is-invalid': factory.errors.description, 'is-valid': factory.isValid('description')}"
				></textarea>
				<span class="small text-danger d-block" v-if="factory.errors.description">{{ factory.errors.description }}</span>
			</div>
			<div class="form-group my-3">
				<h6 class="font-weight-bold">Note's Price</h6>
				<input class="form-control" placeholder="Price" v-model.trim="factory.price" type="number" min="0" step="0.01"
					:class="{'is-invalid': factory.errors.price, 'is-valid': factory.isValid('price')}">
				<span class="small text-danger d-block" v-if="factory.errors.price">{{ factory.errors.price }}</span>
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
			<div class="form-group my-3">
				<h6 class="font-weight-bold">Note's Document</h6>
				<input type="file" @change="catchDocument" class="d-none" ref="documentInput" accept="*/*">
				<a @click.prevent="() => { $refs.documentInput.value= ''; $refs.documentInput.click() }" class="d-block">
					<span v-if="factory.document">{{ factory.document.name }} </span>
					<span class="text-info">Upload document</span>
				</a>
				<span class="small text-danger" v-if="factory.errors.document">{{ factory.errors.document }}</span>
			</div>
			<hr>
			<div class="d-flex justify-content-end my-3">
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
import { useFileInputs } from '@/usecases/core/useForms'
import { NoteFactory } from '@root/modules/shop/domain/factories/note'
export default defineComponent({
	props: {
		factory: {
			type: NoteFactory,
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
			(file:File) => props.factory.image = file
		)
		const { catchFiles: catchDocument } = useFileInputs(
			(file:File) => props.factory.document = file
		)
		return { catchImage, catchDocument }
	}
})
</script>
