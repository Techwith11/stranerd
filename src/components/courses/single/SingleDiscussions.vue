<template>
	<div class="container small p-2 p-lg-4">
		<div class="d-flex flex-column flex-lg-row align-items-lg-center">
			<textarea rows="3" class="form-control my-2 mr-lg-4" placeholder="Comment ..." v-model="$v.content.$model"
				:class="{'is-invalid': $v.content.$error, 'is-valid': !$v.content.$invalid}"
			></textarea>
			<button class="accent-button" :disabled="$v.$error || $v.$invalid">Submit</button>
		</div>
		<div class="alert border my-2" v-for="discussion in course.discussions" :key="discussion.id">
			{{ discussion.body }}
		</div>
	</div>
</template>

<script>
	import { required, minLength } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			content: ''
		}),
		validations:{
			content: { required, minLength: minLength(3) }
		},
		props: {
			course: {
				required: true,
				type: Object
			}
		}
	}
</script>