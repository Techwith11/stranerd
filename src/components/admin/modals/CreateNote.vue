<template>
	<div class="m-md-5">
		<div class="d-flex align-items-baseline justify-content-between my-3">
			<a @click.prevent="setCreateModalOverview"><i class="fas fa-arrow-left"></i></a>
			<h4>Upload Note</h4>
			<i></i>
		</div>
		<form class="mx-2">
			<div class="form-group my-3">
				<input class="form-control" placeholder="Title" v-model.trim="$v.note.title.$model"
					:class="{'is-invalid': $v.note.title.$error, 'is-valid': !$v.note.title.$invalid}">
				<span class="small" v-if="$v.note.title.$error">Must be at least 3 characters long</span>
			</div>
			<div class="form-group my-3">
				<textarea class="form-control" placeholder="Description..." v-model.trim="$v.note.description.$model" rows="3"
					:class="{'is-invalid': $v.note.description.$error, 'is-valid': !$v.note.description.$invalid}"
				></textarea>
				<span class="small" v-if="$v.note.description.$error">Must be at least 3 characters long</span>
			</div>
			<div class="form-group my-3">
				<input type="file" @change="catchDocument" class="d-none" ref="documentInput" accept="*/*">
				<a @click.prevent="() => { $refs.documentInput.value= ''; $refs.documentInput.click() }">
					<span v-if="document">{{document.name}} </span>
					<span class="text-info">Upload image preview</span>
				</a>
			</div>
			<div class="form-group my-3">
				<input class="form-control" placeholder="Price" v-model.trim="$v.note.price.$model" type="number"
					:class="{'is-invalid': $v.note.price.$error, 'is-valid': !$v.note.price.$invalid}">
				<span class="small" v-if="$v.note.price.$error">Must be at greater than 0</span>
			</div>
			<div class="d-flex flex-column my-3">
				<button class="text-white my-2 py-2 px-4" @click.prevent="submitNote" :class="{'opacity-25':$v.$invalid, 'primary-button': !$v.$invalid}" :disabled="isLoading || $v.$invalid">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Upload</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import { required, minLength } from 'vuelidate/lib/validators'
	export default {
		name: 'CreateNote',
		data: () => ({
			note: {
				title: '',
				description: '',
				price: null
			},
			document: null,
			isLoading: false
		}),
		methods:{
			...mapActions(['setCreateModalOverview', 'closeCreateModal', 'createNote']),
			catchDocument(e){ this.document = e.target.files[0] },
			async submitNote() {
				this.isLoading = true
				try {
					await this.createNote(this.note, this.document)
					this.closeCreateModal()
					new window.Toast({icon: 'success', title: 'Note uploaded successfully'})
				} catch (error) {
					new window.Toast({icon: 'error', title: error.message})
				}
				this.isLoading = false
			}
		},
		validations:{
			note: {
				title: { required, minLength: minLength(3)},
				description: { required },
				price: { required }
			},
			document: { required },
		}
	}
</script>