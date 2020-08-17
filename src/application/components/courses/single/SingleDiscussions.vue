<template>
	<div class="container small p-2 p-lg-4">
		<div v-if="isSubscribed">
			<ul class="list-group list-unstyled" id="scroller" v-chat-scroll="{smooth: true, notSmoothOnInit: true, always: false}">
				<li class="d-block text-center small text-muted mb-2" v-if="hasMore">
					<i class="fas text-info fa-spinner fa-spin mr-1" v-if="isOlderDiscussionsLoading"></i>
					<span @click="fetchOlderDiscussions">Fetch Older</span>
				</li>
				<li class="alert alert-warning py-1 border my-1" v-for="discussion in discussions" :key="discussion['.key']"
					:class="discussion.userId === getId ? 'ml-auto' : 'mr-auto'">
					<span class="d-block">{{ discussion.body }}</span>
					<small class="small text-black">{{ discussion.dates.createdAt.seconds || Date.now() / 1000 | getDateOrTime }}</small>
				</li>
			</ul>
			<div class="d-flex flex-column flex-lg-row align-items-lg-center">
				<textarea rows="3" class="form-control my-2 mr-lg-4" placeholder="Comment ..." v-model.trim="$v.content.$model"></textarea>
				<button class="btn-success" :disabled="$v.$invalid || isLoading" @click="submit">
					<i class="fas fa-spinner fa-spin" v-if="isLoading"></i>
					<span v-else>Submit</span>
				</button>
			</div>
		</div>
		<p v-else>
			<span>You need an active subscription to gain access to this course's documents. </span>
			<router-link to="/pricing-plans">Subscribe Now</router-link>
		</p>
	</div>
</template>

<script>
import { firestore } from '@/config/firebase'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
export default {
	data: () => ({
		content: '',
		isLoading: false,
		isOlderDiscussionsLoading: false,
		discussions: [],
		listener: false,
		paginationLimit: 24,
		hasMore: true
	}),
	validations:{ content: { required, minLength: minLength(1) } },
	props: {
		course: {
			required: true,
			type: Object
		}
	},
	computed: mapGetters(['getId','isSubscribed']),
	methods:{
		...mapActions(['sendDiscussion']),
		async fetchDiscussions(){
			let docs = firestore.collection(`courses/${this.$route.params.id}/discussions`).orderBy('dates.createdAt','desc')
				.limit(this.paginationLimit)
			if(this.discussions.length > 0){
				let lastItem = this.discussions[0]
				docs = docs.where('dates.createdAt','<', lastItem.dates.createdAt)
			}
			docs = await docs.get()
			this.hasMore = docs.size >= this.paginationLimit
			docs.forEach((doc) => this.discussions.unshift({ '.key': doc.id, ...doc.data() }))
		},
		setListener(){
			let lastItem = this.discussions[this.discussions.length - 1]
			let query = firestore.collection(`courses/${this.$route.params.id}/discussions`).orderBy('dates.createdAt')
			if(lastItem){
				query = query.where('dates.createdAt','>',lastItem.dates.createdAt)
			}
			this.listener = query.onSnapshot((snapshot) => {
				this.newDiscussions = []
				snapshot.docs.forEach((doc) => {
					let index = this.discussions.findIndex((r) => r['.key'] === doc.id)
					if(index === -1){
						this.discussions.push({ '.key': doc.id, ...doc.data() })
					}else{
						this.discussions[index] = { '.key': doc.id, ...doc.data() }
					}
				})

			})
		},
		async fetchOlderDiscussions(){
			this.isOlderDiscussionsLoading = true
			await this.fetchDiscussions()
			this.isOlderDiscussionsLoading = false
		},
		async submit(){
			this.isLoading = true
			try{
				await this.sendDiscussion({ id: this.course['.key'], body: this.content })
			}catch(error){ new window.Toast({ icon: 'error', title: error.message }) }
			this.content = ''
			this.$v.$reset()
			this.isLoading = false
		}
	},
	async mounted(){
		await this.fetchDiscussions()
		this.setListener()
	},
	activated(){
		this.setListener()
	},
	deactivated(){
		this.listener()
	},
	filters: {
		getDateOrTime(date){
			if(typeof(date) !== 'number') { return date }
			date = new Date(date * 1000)
			let now = new Date()
			let today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			let yesterday = new Date(now.getFullYear(),now.getMonth(), now.getDate() - 1)
			if(date > today){
				return date.toTimeString().slice(0,5)
			}else if(date > yesterday){
				return 'Yesterday'
			}else{
				return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().slice(2)}`
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.alert{
		max-width: 75%;
		min-width: 20%;
	}
	#scroller{
		height: 40vh;
		overflow: auto;
		-ms-overflow-style: none;
		&::-webkit-scrollbar{
			display: none;
		}
	}
	.container{
		max-height: 100vh;
	}
</style>
