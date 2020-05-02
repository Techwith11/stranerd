<template>
	<div class="container small p-2 p-lg-4">
		<div class="d-flex flex-column flex-lg-row align-items-lg-center">
			<textarea rows="3" class="form-control my-2 mr-lg-4" placeholder="Comment ..." v-model.trim="$v.content.$model"
				:class="{'is-invalid': $v.content.$error, 'is-valid': !$v.content.$invalid}"
			></textarea>
			<button class="accent-button" :disabled="$v.$error || $v.$invalid || isLoading" @click="submit">
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
	//TODO: Implement pagination here
	//TODO: Replace view if user doesnt have access to this course.
	import { firestore } from '@/config/firebase'
	import { required, minLength } from 'vuelidate/lib/validators'
    import { mapActions } from 'vuex'
	export default {
		data: () => ({
			content: '',
			isLoading: false,
			discussions: [],
			listener: false
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
		mounted(){
			this.listener = firestore.collection('courses').doc(this.course['.key']).collection('discussions')
				.orderBy('dates.createdAt','desc').onSnapshot(snapshot => {
					this.discussions = []
					snapshot.docs.forEach(doc => this.discussions.push({ '.key': doc.id, ...doc.data()}))
				})
		},
		methods:{
			...mapActions(['sendDiscussion']),
			async submit(){
				this.isLoading = true
                await this.sendDiscussion({ id: this.course['.key'], body: this.content })
                this.content = ''
                this.$v.$reset()
                this.isLoading = false
			}
		},
		beforeDestroy(){
			this.listener()
		}
	}
</script>