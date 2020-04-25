<template>
	<div class="container small p-2 p-lg-4">
		<div class="d-flex flex-column flex-lg-row align-items-lg-center">
			<textarea rows="3" class="form-control my-2 mr-lg-4" placeholder="Comment ..." v-model.trim="$v.content.$model"
				:class="{'is-invalid': $v.content.$error, 'is-valid': !$v.content.$invalid}"
			></textarea>
			<button class="accent-button" :disabled="$v.$error || $v.$invalid || isLoading" @click="sendDiscussion">
				<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
				<span v-else>Submit</span>
			</button>
		</div>
		<div class="alert alert-warning border my-2" v-for="discussion in discussions" :key="discussion['.key']">
			{{ discussion.body }}
		</div>
	</div>
</template>

<script>
	//TODO: Replace view if user doesnt have access to this course.
	import { firestore } from '@/config/firebase'
	import { required, minLength } from 'vuelidate/lib/validators'
	export default {
		data: () => ({
			content: '',
			isLoading: false
		}),
		validations:{
			content: { required, minLength: minLength(3) }
		},
		props: {
			course: {
				required: true,
				type: Object
			}
		},
		firestore(){
			return {
				discussions: firestore.collection('courses').doc(this.course['.key']).collection('discussions').orderBy('dates.createdAt','desc')
			}
		},
		methods:{
			async sendDiscussion(){
				this.isLoading = true
				await firestore.collection('courses').doc(this.course['.key']).collection('discussions').add({
					body: this.content
				})
				this.content = ''
				this.$v.$reset()
				this.isLoading = false
			}
		}
	}
</script>